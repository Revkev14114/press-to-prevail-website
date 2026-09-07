from dotenv import load_dotenv
load_dotenv()

import os
import logging
import asyncio
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated

import bcrypt
import jwt
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator
from starlette.middleware.cors import CORSMiddleware

from emailer import notify_owner_of_enquiry, send_visitor_confirmation

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc and "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return cls(**doc)

    def to_mongo(self) -> dict:
        return self.model_dump(exclude={"id"})


# ---------- Auth ----------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return {"id": str(user["_id"]), "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


class LoginInput(BaseModel):
    email: EmailStr
    password: str


@api_router.post("/auth/login")
async def login(input: LoginInput, response: Response):
    email = input.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(str(user["_id"]), email)
    response.set_cookie(
        key="access_token", value=token, httponly=True, secure=True,
        samesite="none", max_age=43200, path="/",
    )
    return {"id": str(user["_id"]), "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.get("/auth/me")
async def auth_me(user: dict = Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}


# ---------- Enquiries ----------

ENQUIRY_STATUSES = {"new", "contacted", "confirmed", "archived"}


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    organization: Optional[str] = None
    enquiry_type: str = "speaking"
    event_date: Optional[str] = None
    event_location: Optional[str] = None
    audience_size: Optional[str] = None
    topic: Optional[str] = None
    budget: Optional[str] = None
    message: str = Field(min_length=1, max_length=4000)


class Enquiry(BaseDocument):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    enquiry_type: str = "speaking"
    event_date: Optional[str] = None
    event_location: Optional[str] = None
    audience_size: Optional[str] = None
    topic: Optional[str] = None
    budget: Optional[str] = None
    message: str
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class StatusUpdate(BaseModel):
    status: str


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump())
    result = await db.enquiries.insert_one(enquiry.to_mongo())
    enquiry.id = str(result.inserted_id)
    admin_url = f"{os.environ.get('FRONTEND_URL', '')}/admin"
    site_url = os.environ.get('FRONTEND_URL', '')
    asyncio.create_task(notify_owner_of_enquiry(enquiry.model_dump(), admin_url))
    asyncio.create_task(send_visitor_confirmation(enquiry.model_dump(), site_url))
    return enquiry.model_dump()


@api_router.get("/enquiries")
async def list_enquiries(user: dict = Depends(get_current_user)):
    docs = await db.enquiries.find().sort("created_at", -1).to_list(500)
    return [Enquiry.from_mongo(d).model_dump() for d in docs]


@api_router.patch("/enquiries/{enquiry_id}/status")
async def update_enquiry_status(enquiry_id: str, update: StatusUpdate, user: dict = Depends(get_current_user)):
    if update.status not in ENQUIRY_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.enquiries.update_one(
        {"_id": ObjectId(enquiry_id)}, {"$set": {"status": update.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"ok": True}


# ---------- Health ----------

@api_router.get("/")
async def root():
    return {"message": "Arthur Vance platform API", "status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        os.environ.get("FRONTEND_URL", "http://localhost:3000"),
        "http://localhost:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Site Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin user seeded: %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info("Admin password updated from env: %s", admin_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
