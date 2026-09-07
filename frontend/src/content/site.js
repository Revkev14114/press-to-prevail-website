// ─────────────────────────────────────────────────────────────
// SITE CONTENT — everything editable lives in this one file.
// Brand assets live in /app/frontend/public/assets/.
// Swap book covers, Amazon links and YouTube IDs below.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Press To Prevail",
  monogram: "PP",
  tagline: "Faith · Foundation · Focus · Finish",
  email: "connect@presstoprevail.com",
  logoUrl: "/assets/logo-mark.jpg",
  logoFull: "/assets/logo-press-to-prevail.jpg",
  bannerLines: ["Building Faith,", "Building Purpose,", "Building Lives That Last."],
  stats: [
    { value: "500+", label: "Keynotes & Talks" },
    { value: "03", label: "Books Published" },
    { value: "1M+", label: "Lives Reached" },
  ],
};

export const PRESS = [
  { quote: "A voice that rebuilds what life tried to break.", source: "Faith & Leadership Journal" },
  { quote: "Part sermon, part blueprint — wholly unforgettable.", source: "The Purpose Report" },
  { quote: "The rare speaker who leaves a room stronger than he found it.", source: "Conference Weekly" },
  { quote: "Foundational reading for anyone building a life that lasts.", source: "BookLife Reviews" },
];

export const BOOKS = [
  {
    id: "press-to-prevail",
    title: "Press To Prevail",
    subtitle: "Faith Under Pressure, Purpose Beyond It",
    year: "2024",
    coverUrl: null, // e.g. "/assets/cover-press-to-prevail.jpg"
    description:
      "The flagship book — a field guide for holding your ground when life pushes hardest, and pressing through to what you were built for.",
    quote: "Pressure doesn't break purpose. It reveals it.",
    awards: ["National Bestseller", "Readers' Choice — Faith & Leadership"],
    amazonUrl: "https://www.amazon.com/dp/B0DREPLACE1",
    kindleUrl: "https://www.amazon.com/dp/B0DREPLACE1",
    audibleUrl: "https://www.audible.com/pd/REPLACE1",
  },
  {
    id: "foundation-first",
    title: "Foundation First",
    subtitle: "What You Build On Decides What Survives",
    year: "2021",
    coverUrl: null, // e.g. "/assets/cover-foundation-first.jpg"
    description:
      "Before the platform, the podium, the plan — the foundation. A book about the unseen work that everything lasting is built on.",
    quote: "You cannot finish strong what you founded weak.",
    awards: ["Christian Book Award Finalist", "50,000+ copies sold"],
    amazonUrl: "https://www.amazon.com/dp/B0DREPLACE2",
    kindleUrl: "https://www.amazon.com/dp/B0DREPLACE2",
    audibleUrl: "https://www.audible.com/pd/REPLACE2",
  },
  {
    id: "the-finish-line",
    title: "The Finish Line Faith",
    subtitle: "Starting Is Loud. Finishing Is Legendary.",
    year: "2018",
    coverUrl: null, // e.g. "/assets/cover-finish-line.jpg"
    description:
      "The debut that started the movement — why most people stall at the middle mile, and how faith carries you through it.",
    quote: "Anybody can start. Prevailing is a decision you make daily.",
    awards: ["Indie Excellence Award", "Nine-language translation"],
    amazonUrl: "https://www.amazon.com/dp/B0DREPLACE3",
    kindleUrl: "https://www.amazon.com/dp/B0DREPLACE3",
    audibleUrl: "https://www.audible.com/pd/REPLACE3",
  },
];

export const MANIFESTO = [
  {
    number: "01",
    title: "Faith",
    body: "Everything starts here — the conviction that pressure has a purpose and that what you're carrying was given to you on purpose.",
  },
  {
    number: "02",
    title: "Foundation",
    body: "Character before platform. Roots before reach. We build on what cannot be shaken, or we build nothing at all.",
  },
  {
    number: "03",
    title: "Focus",
    body: "Distraction is the quiet thief of destiny. Focus is faith with its sleeves rolled up — one thing, done with your whole heart.",
  },
  {
    number: "04",
    title: "Finish",
    body: "Starting is loud. Finishing is legendary. The press is not the punishment — it's the path. Prevail anyway.",
  },
];

export const VIDEOS = [
  {
    id: "tedx-purpose",
    title: "Pressing Through the Middle Mile",
    event: "Leadership & Faith Summit",
    duration: "18:24",
    youtubeId: "UF8uR6Z6KLc", // replace with your talk's YouTube ID
  },
  {
    id: "summit-keynote",
    title: "Foundation First — Keynote",
    event: "Global Leadership Summit",
    duration: "42:10",
    youtubeId: "qp0HIF3SfI4",
  },
  {
    id: "written-mind",
    title: "Faith That Finishes — Interview",
    event: "National Book Festival",
    duration: "27:45",
    youtubeId: "iCvmsMzlF7o",
  },
  {
    id: "digital-quiet",
    title: "Built to Last — Commencement Address",
    event: "Northfield University",
    duration: "21:03",
    youtubeId: "iG9CE55wbtY",
  },
];

export const KEYNOTES = [
  {
    title: "Built to Last: Faith Under Pressure",
    length: "45–60 min",
    body: "The flagship keynote — how to stand when everything pushes, and why the press is the path to prevailing.",
  },
  {
    title: "Foundation First",
    length: "40 min + Q&A",
    body: "For teams and congregations building something that must outlast them: character, conviction, and the unseen work.",
  },
  {
    title: "Finishing What You Started",
    length: "30–45 min",
    body: "A practical charge for the middle mile — rituals, accountability and faith that carry you across the finish line.",
  },
];

export const TIMELINE = [
  { year: "2015", title: "The First Manuscript", body: "Years of early-morning pages become The Finish Line Faith — rejected eleven times, then impossible to ignore." },
  { year: "2019", title: "The Movement Begins", body: "A single talk crosses ten million views. Stages across the country open within the year." },
  { year: "2022", title: "Foundation First", body: "The second book debuts as a bestseller and is translated into nine languages." },
  { year: "2024", title: "Press To Prevail", body: "The flagship book launches with a 40-city tour — and the first steps toward a coaching practice begin." },
];

export const ARTICLES = [
  { title: "Pressure Doesn't Break Purpose — It Reveals It", outlet: "Faith & Leadership Journal", readTime: "8 min", year: "2025" },
  { title: "The Middle Mile Is Where Faith Is Made", outlet: "The Purpose Report", readTime: "6 min", year: "2024" },
  { title: "Roots Before Reach", outlet: "Conference Weekly", readTime: "5 min", year: "2024" },
  { title: "Notes on Finishing What You Started", outlet: "Personal Essay", readTime: "11 min", year: "2023" },
];

export const REVIEWS = [
  { quote: "I handed this book to every leader I mentor. Then I read it a third time.", source: "Executive Pastor, Chicago", bookId: "press-to-prevail" },
  { quote: "The rare book that meets you in the hardest season and refuses to leave you there.", source: "Amazon Verified Review", bookId: "press-to-prevail" },
  { quote: "He names the unseen work nobody applauds — and makes you proud to do it.", source: "Conference Director", bookId: "foundation-first" },
  { quote: "I re-read the foundation chapters every January. Non-negotiable.", source: "Goodreads Review", bookId: "foundation-first" },
  { quote: "A finishing manual disguised as a love letter to perseverance.", source: "Writer's Digest", bookId: "the-finish-line" },
  { quote: "The book that got me through the year I almost quit everything.", source: "Amazon Verified Review", bookId: "the-finish-line" },
];

export const ENQUIRY_TYPES = [
  { value: "speaking", label: "Keynote / Speaking" },
  { value: "workshop", label: "Workshop" },
  { value: "books", label: "Books / Bulk Order" },
  { value: "media", label: "Media / Interview" },
  { value: "coaching", label: "Coaching (waitlist)" },
];
