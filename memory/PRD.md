# PRD — Author & Speaker Platform

## Original Problem Statement
"I want to build a website for promoting a company and services. It will need to have the capability of handling transactions through Amazon and eventually through the website. It will need to handle videos and youtube links. It will start at three pages and eventually grow to five pages. It needs to look very professional and inviting. It is a speaker, writer website that may also grow to coaching."

## User Choices (confirmed)
- Pages at launch: Home, About, Books/Writing (Speaking & Videos lives as a section on About; ready to split into its own page later)
- Transactions: buy buttons linking out to Amazon product pages (on-site checkout deferred)
- Videos: dedicated area with YouTube embeds (Speaking section)
- Contact: booking enquiry form storing messages, viewable by admin
- Branding: user will supply logo, page backgrounds, book covers — placeholder persona "Arthur Vance" used; ALL content swappable in one file: `/app/frontend/src/content/site.js`

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) — pages: Home, About, Books, Admin (/admin)
- Backend: FastAPI + MongoDB (motor) — all routes under /api
- Auth: JWT (httpOnly cookie, HS256, 12h), bcrypt, single admin seeded from env on startup
- Design system: /app/design_guidelines.json — warm editorial (ivory/terracotta/coal), Cormorant Garamond + Outfit + JetBrains Mono

## User Personas
- Event organizer: wants to watch talks, check topics, send a booking enquiry
- Reader: wants to browse books and buy on Amazon
- Site owner (admin): reviews enquiries, changes their status

## Core Requirements (static)
1. Three-page professional marketing site (Home, About, Books/Writing)
2. Amazon buy buttons per book (Amazon, Kindle, Audible)
3. YouTube video gallery with lightbox playback
4. Booking/contact enquiry form persisted to MongoDB
5. Admin inbox to view and manage enquiries

## Implemented (2026-09-07)
- Kinetic hero with masked line-by-line reveal + 3D parallax portrait + rotating badge
- Editorial press marquee (pauses on hover), numbered manifesto chapters, press quote grid
- Featured book spotlight + Books page catalog (3 titles, awards, buy buttons, review filter, articles list)
- About page: bio, timeline, pillars, media-kit CTA, full Speaking & Videos section (4 YouTube embeds w/ lightbox)
- Enquiry form (name/email/org/type/date/location/audience/topic/budget/message) → POST /api/enquiries → success state + toast
- Admin: /admin login (JWT cookie), enquiry table, status updates (new/contacted/confirmed/archived), 401 guard verified
- Lenis momentum scrolling, grain overlay, page title/meta updated

## Backlog (prioritized)
- P0: Swap in user's real brand — logo, name, colors, book covers, real Amazon product links, real YouTube IDs (all via src/content/site.js + image files in /public/assets/)
- P1: Fifth/sixth pages — dedicated Speaking page, Coaching page (structure already supports growth)
- P1: Email notification to owner on new enquiry (Resend integration)
- P2: On-site checkout (Stripe) for signed copies/bulk orders
- P2: CMS-style admin editing of books/videos instead of file-based content
- P2: Sample chapter PDF preview modal, downloadable media kit files

## Next Tasks
1. Collect logo/backgrounds/covers from user and wire into site.js
2. Replace placeholder YouTube IDs and Amazon links with real ones
3. Add Coaching waitlist page when user confirms direction
