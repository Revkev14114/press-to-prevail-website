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
- Full rebrand to "Press To Prevail": user-supplied metallic emblem (logo + hero background), dark charcoal/stone/gold palette, Bebas Neue display type, gold buttons throughout
- Home: parallax logo hero with banner "Building Faith, Building Purpose, Building Lives That Last", press marquee, featured-book spotlight (real cover), Four Pillars (Faith/Foundation/Focus/Finish), speaking preview, press quotes, enquiry form
- Books: rebuilt around real book "Building the Perfect Home" (user cover + copy), blueprint-grid hero, "Inside the Blueprint" themes, early-reader reviews, two upcoming titles with Notify-Me, articles list
- About: rebuilt dark/gold — "Built by Hand. Led by Faith." hero, 1983→Next timeline, pillars, media-kit CTA, Speaking & Videos section (4 YouTube embeds w/ lightbox)
- Enquiry form → POST /api/enquiries → MongoDB; Admin /admin (JWT cookie auth) with enquiry inbox + status management
- Lenis smooth scroll, grain overlay, framer-motion reveals throughout
- Amazon link LIVE (2026-09-07): buy buttons → https://www.amazon.com/dp/B0HFC1ZJ3P (Kindle uses bestFormat variant). Audible button hidden until audiobook exists. Signed copies stay on the enquiry form.
- Sample chapter (2026-09-07): in-page reader on The Book page (drop cap, section headings, progress bar, Continue-on-Amazon CTA). REAL text — Chapter One "The Calling" pulled verbatim from the final manuscript (src/content/sampleChapter.js). Voice noted: reflective, conversational "kitchen-table" first person; construction metaphors carrying spiritual truth; honest about failure; Scripture woven naturally; "God builds people the way a builder builds a home."
- Still MOCKED: YouTube video IDs, press/review quotes, articles links, social links
- Email alerts (2026-09-07): Resend via Emergent managed email — owner notification to kevin@presstoprevail.com + branded visitor confirmation on every enquiry (non-blocking, fire-and-forget). Reply-To set to kevin@presstoprevail.com.
- Five-page growth (2026-09-07): Speaking page (video reel, flagship talks, logistics accordions, booking form), Consulting page (coaching waitlist, workshops, church consulting, 4-step process), Contact page (info, full enquiry form, FAQ accordion). Nav now: Home · Speaking · The Book · About · Consulting · Contact + gold "Let's Connect" CTA. About keeps a teaser linking to Speaking.

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
