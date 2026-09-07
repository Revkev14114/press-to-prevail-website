// ─────────────────────────────────────────────────────────────
// SITE CONTENT — everything editable lives in this one file.
// To personalize: replace name, portraits, book covers, Amazon
// links and YouTube IDs below. Drop image files into
// /app/frontend/public/assets/ and reference them as "/assets/…".
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Arthur Vance",
  monogram: "AV",
  tagline: "Author · Keynote Speaker · Writer",
  email: "hello@arthurvance.com",
  logoUrl: null, // e.g. "/assets/logo.png" once you add your logo
  portraitHero:
    "https://images.unsplash.com/photo-1715412507413-c7416b47cacb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  portraitAbout:
    "https://images.pexels.com/photos/27471477/pexels-photo-27471477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
  stageImage:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=85&w=1600&auto=format&fit=crop",
  deskImage:
    "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  stats: [
    { value: "500+", label: "Keynotes Delivered" },
    { value: "03", label: "Bestselling Books" },
    { value: "1M+", label: "Readers Worldwide" },
  ],
};

export const PRESS = [
  { quote: "A transformative voice for modern leadership.", source: "Wall Street Journal" },
  { quote: "Vance writes the way great speakers talk — you cannot look away.", source: "Forbes" },
  { quote: "Required reading for anyone who leads people.", source: "Harvard Business Review" },
  { quote: "A rare mind: rigorous on the page, magnetic on the stage.", source: "The New York Times" },
];

export const BOOKS = [
  {
    id: "architecture-of-intent",
    title: "The Architecture of Intent",
    subtitle: "Designing a Life That Speaks Before You Do",
    year: "2024",
    coverUrl: null, // e.g. "/assets/cover-architecture.jpg"
    description:
      "The national bestseller on deliberate living — how the quiet decisions behind the scenes build the person the world eventually hears.",
    quote: "Intent is the only architecture that never collapses.",
    awards: ["National Bestseller", "Axiom Business Book Award — Gold"],
    amazonUrl: "https://www.amazon.com/dp/B0DREPLACE1",
    kindleUrl: "https://www.amazon.com/dp/B0DREPLACE1",
    audibleUrl: "https://www.audible.com/pd/REPLACE1",
  },
  {
    id: "silent-resonance",
    title: "Silent Resonance",
    subtitle: "What Audiences Remember When the Applause Fades",
    year: "2021",
    coverUrl: null, // e.g. "/assets/cover-silent.jpg"
    description:
      "A meditation on presence — drawn from a decade on stages across four continents, and the silences in between that taught the most.",
    quote: "People forget your slides. They never forget how you made the room feel.",
    awards: ["Nautilus Book Award — Silver", "Reader's Favorite Finalist"],
    amazonUrl: "https://www.amazon.com/dp/B0DREPLACE2",
    kindleUrl: "https://www.amazon.com/dp/B0DREPLACE2",
    audibleUrl: "https://www.audible.com/pd/REPLACE2",
  },
  {
    id: "mastering-the-unspoken",
    title: "Mastering the Unspoken",
    subtitle: "The Writer's Discipline in a Distracted Era",
    year: "2018",
    coverUrl: null, // e.g. "/assets/cover-mastering.jpg"
    description:
      "The debut that started it all — a working manual for deep work, long thoughts, and the craft of saying one true thing well.",
    quote: "Distraction is cheap. Attention is the last luxury.",
    awards: ["Indie Excellence Award", "45,000+ copies sold"],
    amazonUrl: "https://www.amazon.com/dp/B0DREPLACE3",
    kindleUrl: "https://www.amazon.com/dp/B0DREPLACE3",
    audibleUrl: "https://www.audible.com/pd/REPLACE3",
  },
];

export const MANIFESTO = [
  {
    number: "01",
    title: "Purpose Over Velocity",
    body: "Speed impresses. Direction endures. Every talk and every chapter begins with the same question: what should still be true in ten years?",
  },
  {
    number: "02",
    title: "The Courage to Speak",
    body: "A room changes the moment one person says the honest thing plainly. My work is to be that person — and to teach others to be it too.",
  },
  {
    number: "03",
    title: "Deep Work in a Distracted Era",
    body: "Attention is the raw material of every meaningful life. Guard it like capital, spend it like love.",
  },
  {
    number: "04",
    title: "Words Are Instruments",
    body: "On the page or on the stage, language is the oldest technology for moving a human heart. Treat it with craft.",
  },
];

export const VIDEOS = [
  {
    id: "tedx-purpose",
    title: "Purpose Over Velocity — TEDx",
    event: "TEDx Beacon Street",
    duration: "18:24",
    youtubeId: "UF8uR6Z6KLc", // replace with your talk's YouTube ID
  },
  {
    id: "summit-keynote",
    title: "Leading in Uncertainty — Global Leadership Summit",
    event: "Global Leadership Summit",
    duration: "42:10",
    youtubeId: "qp0HIF3SfI4",
  },
  {
    id: "written-mind",
    title: "The Written Mind — Author Q&A",
    event: "National Book Festival",
    duration: "27:45",
    youtubeId: "iCvmsMzlF7o",
  },
  {
    id: "digital-quiet",
    title: "Digital Quiet — Commencement Address",
    event: "Northfield University",
    duration: "21:03",
    youtubeId: "iG9CE55wbtY",
  },
];

export const KEYNOTES = [
  {
    title: "Leading in Uncertainty",
    length: "45–60 min",
    body: "A flagship keynote on steadiness — how leaders create clarity for others when none exists for themselves.",
  },
  {
    title: "The Written Mind",
    length: "40 min + Q&A",
    body: "Why thinking on paper still beats thinking in feeds — and how writing rewires judgment, memory and nerve.",
  },
  {
    title: "Digital Quiet",
    length: "30–45 min",
    body: "A practical manifesto for attention: rituals, environments and boundaries that give teams their minds back.",
  },
];

export const TIMELINE = [
  { year: "2015", title: "The First Manuscript", body: "Three years of 5 a.m. pages become Mastering the Unspoken — rejected eleven times, then impossible to ignore." },
  { year: "2019", title: "International Keynotes", body: "A TEDx talk crosses ten million views. Stages in London, Singapore and Sydney follow within the year." },
  { year: "2022", title: "Silent Resonance", body: "The second book debuts as a national bestseller and is translated into nine languages." },
  { year: "2024", title: "The Architecture of Intent", body: "The third book launches with a 40-city tour — and the first steps toward a coaching practice begin." },
];

export const ARTICLES = [
  { title: "The Room Remembers How You Made It Feel", outlet: "Harvard Business Review", readTime: "8 min", year: "2025" },
  { title: "Why I Write the Ending First", outlet: "The Atlantic", readTime: "6 min", year: "2024" },
  { title: "Attention Is the Last Luxury", outlet: "Forbes", readTime: "5 min", year: "2024" },
  { title: "Notes on Saying One True Thing", outlet: "Personal Essay", readTime: "11 min", year: "2023" },
];

export const REVIEWS = [
  { quote: "I bought twenty copies for my leadership team. Then I bought twenty more.", source: "Chief People Officer, Fortune 100", bookId: "architecture-of-intent" },
  { quote: "The rare business book you read with a pencil — and finish a different person.", source: "Amazon Verified Review", bookId: "architecture-of-intent" },
  { quote: "Vance names something we've all felt on stage but never articulated.", source: "Conference Director, SXSW", bookId: "silent-resonance" },
  { quote: "Quietly devastating. I re-read the last chapter every January.", source: "Goodreads Review", bookId: "silent-resonance" },
  { quote: "A discipline manual disguised as a love letter to craft.", source: "Writer's Digest", bookId: "mastering-the-unspoken" },
  { quote: "The book that made me delete three apps and finish my novel.", source: "Amazon Verified Review", bookId: "mastering-the-unspoken" },
];

export const ENQUIRY_TYPES = [
  { value: "speaking", label: "Keynote / Speaking" },
  { value: "workshop", label: "Workshop" },
  { value: "books", label: "Books / Bulk Order" },
  { value: "media", label: "Media / Interview" },
  { value: "coaching", label: "Coaching (waitlist)" },
];
