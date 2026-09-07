import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Press To Prevail")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        email_id = resp.json().get("id")
        logger.info("Email sent to %s (id=%s)", to, email_id)
        return email_id
    except Exception as e:
        logger.error("Email send failed (non-blocking): %s", e)
        return None


def _row(label: str, value: str | None) -> str:
    if not value:
        return ""
    return (
        f'<tr><td style="padding:8px 16px 8px 0;font-size:11px;letter-spacing:2px;'
        f'text-transform:uppercase;color:#8a8577;vertical-align:top;white-space:nowrap">{escape(label)}</td>'
        f'<td style="padding:8px 0;font-size:14px;color:#f4f1ea">{escape(value)}</td></tr>'
    )


async def notify_owner_of_enquiry(enquiry: dict, admin_url: str) -> None:
    if not OWNER_EMAIL:
        logger.warning("OWNER_EMAIL not set — enquiry notification skipped")
        return
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY not set — enquiry notification skipped")
        return
    subject = f"New {enquiry.get('enquiry_type', 'general')} enquiry — {enquiry.get('name', 'Visitor')}"
    rows = "".join([
        _row("Name", enquiry.get("name")),
        _row("Email", enquiry.get("email")),
        _row("Organization", enquiry.get("organization")),
        _row("Type", (enquiry.get("enquiry_type") or "").capitalize()),
        _row("Event date", enquiry.get("event_date")),
        _row("Location", enquiry.get("event_location")),
        _row("Audience", enquiry.get("audience_size")),
        _row("Topic", enquiry.get("topic")),
        _row("Budget", enquiry.get("budget")),
        _row("Message", enquiry.get("message")),
    ])
    html = (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#0c0c0e;padding:32px 16px"><tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="background:#12161a;border:1px solid #2a2c30;border-radius:12px;overflow:hidden">'
        '<tr><td style="padding:24px 28px;border-bottom:1px solid #2a2c30">'
        '<p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#f4f1ea">Press To Prevail</p>'
        '<p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;'
        'text-transform:uppercase;color:#c9a227">New Website Enquiry</p></td></tr>'
        f'<tr><td style="padding:24px 28px"><table role="presentation" width="100%" '
        f'cellpadding="0" cellspacing="0">{rows}</table></td></tr>'
        f'<tr><td style="padding:20px 28px;border-top:1px solid #2a2c30">'
        f'<a href="{admin_url}" style="display:inline-block;background:#c9a227;color:#0c0c0e;'
        f'font-family:Arial,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;'
        f'padding:12px 22px;border-radius:999px">Open Enquiry Inbox</a>'
        f'<p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:11px;color:#8a8577">'
        f'Sent by the Press To Prevail website. Faith. Foundation. Focus. Finish.</p>'
        '</td></tr></table></td></tr></table>'
    )
    await send_email(to=OWNER_EMAIL, subject=subject, html=html)


async def send_visitor_confirmation(enquiry: dict, site_url: str) -> None:
    visitor_email = enquiry.get("email")
    if not visitor_email or not EMAIL_KEY:
        return
    first_name = escape((enquiry.get("name") or "there").split()[0])
    subject = "We received your enquiry — Press To Prevail"
    html = (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#0c0c0e;padding:32px 16px"><tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="background:#12161a;border:1px solid #2a2c30;border-radius:12px;overflow:hidden">'
        '<tr><td style="padding:24px 28px;border-bottom:1px solid #2a2c30">'
        '<p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#f4f1ea">Press To Prevail</p>'
        '<p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;'
        'text-transform:uppercase;color:#c9a227">Faith · Foundation · Focus · Finish</p></td></tr>'
        f'<tr><td style="padding:28px;font-family:Arial,sans-serif">'
        f'<p style="margin:0;font-size:15px;line-height:1.6;color:#f4f1ea">Hi {first_name},</p>'
        f'<p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#c9c4b8">'
        f'Thank you for reaching out. Your enquiry has been received, and Kevin reads every '
        f'message personally — expect a reply within two business days.</p>'
        f'<p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#c9c4b8">'
        f'In the meantime: pressure doesn\'t have to defeat us. It can develop us.</p>'
        f'<p style="margin:24px 0 0"><a href="{site_url}" style="display:inline-block;background:#c9a227;'
        f'color:#0c0c0e;font-size:13px;font-weight:bold;text-decoration:none;padding:12px 22px;'
        f'border-radius:999px">Visit Press To Prevail</a></p></td></tr>'
        '<tr><td style="padding:20px 28px;border-top:1px solid #2a2c30">'
        '<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#8a8577">'
        'Sent by the Press To Prevail website. We never ask for your password or card details by email.</p>'
        '</td></tr></table></td></tr></table>'
    )
    await send_email(to=visitor_email, subject=subject, html=html)
