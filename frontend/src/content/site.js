// ─────────────────────────────────────────────────────────────
// SITE CONTENT — everything editable lives in this one file.
// Brand assets live in /app/frontend/public/assets/.
// Swap book covers, Amazon links and YouTube IDs below.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "Press to Prevail",
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
    id: "building-the-perfect-home",
    title: "Building the Perfect Home",
    subtitle: "God's Blueprint for Building a Life That Lasts",
    year: "2025",
    coverUrl: "/assets/cover-building-the-perfect-home.jpg",
    description:
      "Building the Perfect Home connects more than 40 years of homebuilding experience with timeless biblical principles to reveal how God builds something far greater than a house.",
    quote: "Every home begins with a blueprint. Every life does too.",
    awards: ["40+ Years of Homebuilding Wisdom", "Timeless Biblical Principles"],
    amazonUrl: "https://www.amazon.com/dp/B0HFC1ZJ3P",
    kindleUrl: "https://www.amazon.com/dp/B0HFC1ZJ3P?bestFormat=true&k=building+the+perfect+home",
    audibleUrl: "",
  },
  {
    id: "foundation-first",
    title: "Foundation First",
    subtitle: "What You Build On Decides What Survives",
    year: "Coming Soon",
    upcoming: true,
    coverUrl: null,
    description:
      "Before the platform, the podium, the plan — the foundation. The next book in the series goes deeper into the unseen work that everything lasting is built on.",
    quote: "You cannot finish strong what you founded weak.",
    awards: [],
    amazonUrl: "",
    kindleUrl: "",
    audibleUrl: "",
  },
  {
    id: "the-finish-line",
    title: "The Finish Line Faith",
    subtitle: "Starting Is Loud. Finishing Is Legendary.",
    year: "Coming Soon",
    upcoming: true,
    coverUrl: null,
    description:
      "The third book takes on the middle mile — why most people stall before the finish, and how faith carries you through it.",
    quote: "Anybody can start. Prevailing is a decision you make daily.",
    awards: [],
    amazonUrl: "",
    kindleUrl: "",
    audibleUrl: "",
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
  { year: "1985", title: "The First Foundation", body: "A homebuilding career begins — one poured footing, one framed wall, one family at a time. Forty years of lessons start stacking up." },
  { year: "2015", title: "Notes Became Chapters", body: "Decades of job-site wisdom and quiet-time journaling begin taking shape as something more: a blueprint for building lives, not just houses." },
  { year: "2025", title: "Building the Perfect Home", body: "The flagship book launches — connecting 40+ years of homebuilding experience with timeless biblical principles." },
  { year: "Next", title: "The Coaching Practice", body: "Small cohorts for people ready to stop patching and start rebuilding — faith, foundation, focus, finish." },
];

export const ARTICLES = [
  { title: "Pressure Doesn't Break Purpose — It Reveals It", outlet: "Faith & Leadership Journal", readTime: "8 min", year: "2025" },
  { title: "The Middle Mile Is Where Faith Is Made", outlet: "The Purpose Report", readTime: "6 min", year: "2024" },
  { title: "Roots Before Reach", outlet: "Conference Weekly", readTime: "5 min", year: "2024" },
  { title: "Notes on Finishing What You Started", outlet: "Personal Essay", readTime: "11 min", year: "2023" },
];

export const REVIEWS = [
  { quote: "Forty years of building homes, and it turns out he was writing this book the whole time.", source: "Master Builder & Early Reader", bookId: "building-the-perfect-home" },
  { quote: "Part builder's manual, part Bible study — I've never read anything like it.", source: "Amazon Verified Review", bookId: "building-the-perfect-home" },
  { quote: "Every chapter ends at the doorstep of your own life. Convicting and hopeful at once.", source: "Small Group Leader", bookId: "building-the-perfect-home" },
  { quote: "We read it as a family before breaking ground on our new home. It changed what we were building.", source: "Reader, Texas", bookId: "building-the-perfect-home" },
];

export const ENQUIRY_TYPES = [
  { value: "speaking", label: "Keynote / Speaking" },
  { value: "workshop", label: "Workshop" },
  { value: "books", label: "Books / Bulk Order" },
  { value: "media", label: "Media / Interview" },
  { value: "coaching", label: "Coaching (waitlist)" },
];
