export const INSPECTION_SECTIONS = [
  { id: "architect", number: "01", title: "Architect", questions: [1, 2, 3, 4, 5] },
  { id: "foundation", number: "02", title: "Foundation", questions: [6, 7, 8, 9, 10] },
  { id: "structure", number: "03", title: "Structure", questions: [11, 12, 13, 14, 15] },
  { id: "protection", number: "04", title: "Protection", questions: [16, 17, 18, 19, 20] },
  { id: "finish", number: "05", title: "Finish", questions: [21, 22, 23, 24, 25] },
];

export const INSPECTION_QUESTIONS = [
  {
    id: 1,
    sectionId: "architect",
    title: "Vision",
    role: "discovery",
    prompt:
      "An architect sees the vision of a design before construction begins. When you think about the life you are building, which description best fits where you are today?",
    choices: [
      { id: "A", text: "I have a picture of what I want my life to look like." },
      { id: "B", text: "I have several goals, but they don't necessarily form one clear picture." },
      { id: "C", text: "My direction has developed as my circumstances have changed." },
      { id: "D", text: "I am still discovering what I want the next part of my life to look like." },
      { id: "E", text: "I tend to focus more on what is immediately in front of me than on a long-term picture." },
    ],
  },
  {
    id: 2,
    sectionId: "architect",
    title: "Blueprint",
    role: "discovery",
    prompt:
      "An architect works from a blueprint that guides the construction. When you make significant decisions, what most often serves as your guide?",
    choices: [
      { id: "A", text: "Principles and beliefs I have developed over time." },
      { id: "B", text: "The goals and priorities I have established for myself." },
      { id: "C", text: "Advice and expectations from people I trust." },
      { id: "D", text: "The circumstances and opportunities in front of me." },
      { id: "E", text: "A combination of several influences." },
    ],
  },
  {
    id: 3,
    sectionId: "architect",
    title: "The Architect",
    role: "discovery",
    prompt:
      "The architect determines the design before the builder begins construction. When you consider the direction of your life, which statement best describes your experience?",
    choices: [
      { id: "A", text: "I have made most of the major decisions about the direction of my life." },
      { id: "B", text: "Several people have had a significant influence on the direction I've taken." },
      { id: "C", text: "Circumstances have played a major role in determining where I am today." },
      { id: "D", text: "My direction has changed as my understanding of myself has changed." },
      { id: "E", text: "My current direction reflects a combination of intentional decisions and circumstances." },
    ],
  },
  {
    id: 4,
    sectionId: "architect",
    title: "Alignment",
    role: "condition",
    review: "provisional-scoring",
    prompt:
      "An architect considers how every part of a design works together. When you look at your time, relationships, work, priorities, and responsibilities, which description best fits your life?",
    choices: [
      { id: "A", text: "Most areas of my life are moving in a similar direction." },
      { id: "B", text: "Different areas of my life are pulling me in different directions." },
      { id: "C", text: "Some areas receive considerably more attention than others." },
      { id: "D", text: "My priorities have changed, and other parts of my life are still adjusting." },
      { id: "E", text: "My responsibilities largely determine how I divide my time and attention." },
    ],
  },
  {
    id: 5,
    sectionId: "architect",
    title: "Blueprint vs. Building",
    role: "discovery",
    prompt:
      "An architect can have a detailed blueprint, but the finished home is ultimately shaped by what is actually built. When you compare the life you imagined with the life you are living, which description fits best?",
    choices: [
      { id: "A", text: "The life I am living resembles much of what I once envisioned." },
      { id: "B", text: "Some parts look like what I envisioned, while other parts have taken a different direction." },
      { id: "C", text: "My life has developed in ways I could not have anticipated." },
      { id: "D", text: "My vision for my life has changed as I have changed." },
      { id: "E", text: "I spend more time responding to the present than comparing it with an earlier vision." },
    ],
  },
  {
    id: 6,
    sectionId: "foundation",
    title: "Location",
    role: "discovery",
    prompt:
      "A builder carefully considers the location before he ever lays a foundation. When you look at the environment in which you are building your life, which statement best describes it?",
    choices: [
      { id: "A", text: "My surroundings have remained relatively consistent as my life has developed." },
      { id: "B", text: "The people and influences around me have changed significantly over the years." },
      { id: "C", text: "My environment is shaped by several different relationships, responsibilities, and influences." },
      { id: "D", text: "I have intentionally changed parts of my environment as my priorities have changed." },
      { id: "E", text: "My current environment is largely the result of circumstances and decisions made along the way." },
    ],
  },
  {
    id: 7,
    sectionId: "foundation",
    title: "Lot Preparation",
    role: "discovery",
    prompt:
      "Before construction begins, a builder prepares the lot for what will eventually be built. When you think about the things that have shaped your life, which best describes the preparation you've experienced?",
    choices: [
      { id: "A", text: "Some experiences prepared me for what I eventually faced." },
      { id: "B", text: "Much of my preparation came through people who influenced me." },
      { id: "C", text: "Difficult experiences became important parts of my preparation." },
      { id: "D", text: "I intentionally prepared for some things while other areas developed along the way." },
      { id: "E", text: "Much of what shaped me was unexpected." },
    ],
  },
  {
    id: 8,
    sectionId: "foundation",
    title: "Foundation Material",
    role: "discovery",
    prompt:
      "A builder chooses materials based on what the home is expected to carry and how long it is expected to last. What has most influenced the principles you use to make important decisions?",
    choices: [
      { id: "A", text: "Experiences I've had." },
      { id: "B", text: "People who have influenced me." },
      { id: "C", text: "Beliefs I've developed over time." },
      { id: "D", text: "What I've learned through successes and failures." },
      { id: "E", text: "A combination of several influences." },
    ],
  },
  {
    id: 9,
    sectionId: "foundation",
    title: "Load-Bearing",
    role: "discovery",
    review: "scoring-not-approved",
    prompt:
      "A foundation is designed to carry the weight of the structure above it. When the demands of life increase, which description most closely matches your experience?",
    choices: [
      { id: "A", text: "I tend to take on additional responsibility as it comes." },
      { id: "B", text: "Increased demands often cause me to reconsider my priorities." },
      { id: "C", text: "I usually find ways to adjust when the weight increases." },
      { id: "D", text: "Some areas of my life handle increased demands better than others." },
      { id: "E", text: "I often discover what matters most when circumstances become demanding." },
    ],
  },
  {
    id: 10,
    sectionId: "foundation",
    title: "Testing",
    role: "discovery",
    prompt:
      "A foundation isn't fully understood until it has experienced wind, rain, and time. Looking back at the difficult seasons you've experienced, what best describes what they have done in your life?",
    choices: [
      { id: "A", text: "They changed the way I see certain things." },
      { id: "B", text: "They strengthened some convictions and challenged others." },
      { id: "C", text: "They changed some of the relationships and priorities in my life." },
      { id: "D", text: "They revealed things about myself I hadn't previously considered." },
      { id: "E", text: "They became experiences I continue to draw from." },
    ],
  },
  {
    id: 11,
    sectionId: "structure",
    title: "Framing",
    role: "discovery",
    prompt:
      "A home's framing establishes its shape and defines the spaces within it. What gives your life its current shape and direction?",
    choices: [
      { id: "A", text: "The responsibilities and commitments I have taken on." },
      { id: "B", text: "The relationships that are important to me." },
      { id: "C", text: "The goals and priorities I have established." },
      { id: "D", text: "The routines and habits that have developed over time." },
      { id: "E", text: "A combination of circumstances, choices, and influences." },
    ],
  },
  {
    id: 12,
    sectionId: "structure",
    title: "Blueprint and Materials",
    role: "condition",
    review: "provisional-scoring",
    prompt:
      "A builder selects materials according to the blueprint. When you look at what you are using to build your life, which description best fits?",
    choices: [
      { id: "A", text: "I use what the plan calls for." },
      { id: "B", text: "I sometimes substitute materials as circumstances change." },
      { id: "C", text: "I have used different materials than originally planned." },
      { id: "D", text: "I have discovered that some of what I've used doesn't fit the plan as well as I expected." },
      { id: "E", text: "I have built with materials without always knowing whether they fit the plan." },
    ],
  },
  {
    id: 13,
    sectionId: "structure",
    title: "Craftsmanship",
    role: "discovery",
    review: "scoring-not-approved",
    prompt:
      "Two builders can use the same blueprint and materials and produce different results because of how the work is performed. When you consider how you handle the important work of your life, which description best fits?",
    choices: [
      { id: "A", text: "I tend to complete the work according to the plan." },
      { id: "B", text: "I pay close attention to how the work is done, not just whether it gets finished." },
      { id: "C", text: "I focus most carefully on the parts of the work that matter most." },
      { id: "D", text: "I make adjustments when I see that the work isn't producing the result I expected." },
      { id: "E", text: "The way I approach the work varies depending on the situation." },
    ],
  },
  {
    id: 14,
    sectionId: "structure",
    title: "Connections",
    role: "discovery",
    prompt:
      "A structure depends on connections that hold its individual parts together when pressure is applied. When you think about the things that hold the different parts of your life together, which description best fits?",
    choices: [
      { id: "A", text: "The commitments I've made." },
      { id: "B", text: "The relationships I depend on." },
      { id: "C", text: "The routines and systems I've established." },
      { id: "D", text: "The principles that guide my decisions." },
      { id: "E", text: "I tend to respond to each situation as it develops." },
    ],
  },
  {
    id: 15,
    sectionId: "structure",
    title: "Strength",
    role: "discovery",
    review: "scoring-not-approved",
    prompt:
      "A structure is designed to carry the weight placed upon it. When the demands on your life increase, what typically happens?",
    choices: [
      { id: "A", text: "I reorganize what I'm doing to make room for the additional demands." },
      { id: "B", text: "I rely on routines and systems I've already established." },
      { id: "C", text: "I discover that some areas of my life have less capacity than others." },
      { id: "D", text: "I adjust my priorities as the demands change." },
      { id: "E", text: "I often don't know what needs to change until the pressure exposes it." },
    ],
  },
  {
    id: 16,
    sectionId: "protection",
    title: "Weatherproofing",
    role: "condition",
    review: "provisional-scoring",
    prompt:
      "A builder protects a home from the weather it will face. When you consider the things that can affect your life from the outside, how do you typically respond?",
    choices: [
      { id: "A", text: "I prepare for things I know are likely to come." },
      { id: "B", text: "I make adjustments when I see conditions beginning to change." },
      { id: "C", text: "I tend to deal with problems when they actually arrive." },
      { id: "D", text: "I have learned to anticipate certain things because of past experience." },
      { id: "E", text: "I don't always think about outside pressures until they begin affecting me." },
    ],
  },
  {
    id: 17,
    sectionId: "protection",
    title: "Envelope",
    role: "discovery",
    prompt:
      "A home's envelope separates what is inside from the outside environment. When you think about the influences surrounding your life, which description best fits your experience?",
    choices: [
      { id: "A", text: "Some influences have remained a consistent part of my life." },
      { id: "B", text: "The influences around me have changed as different seasons of life have developed." },
      { id: "C", text: "Different parts of my life are affected by different influences." },
      { id: "D", text: "Some influences have become more or less significant over time." },
      { id: "E", text: "I have become more aware of certain influences as I've experienced different circumstances." },
    ],
  },
  {
    id: 18,
    sectionId: "protection",
    title: "Openings",
    role: "discovery",
    prompt:
      "A home's doors and windows create openings in the exterior envelope. When you think about the things you allow into the life you are building, which description best fits?",
    choices: [
      { id: "A", text: "I have been intentional about some of the things I allow into my life." },
      { id: "B", text: "Most of what has entered my life has come through relationships and circumstances." },
      { id: "C", text: "Some influences entered gradually and became significant over time." },
      { id: "D", text: "What I allow into my life has changed as different seasons have developed." },
      { id: "E", text: "I have sometimes recognized the impact of an influence only after it became part of my life." },
    ],
  },
  {
    id: 19,
    sectionId: "protection",
    title: "Sealing",
    role: "attention",
    review: "provisional-scoring",
    prompt:
      "Sealant is used at small joints, seams, and penetrations to keep the elements from getting into the structure. Over time, small openings can create significant damage. When you think about the small issues in your life, which description best fits?",
    choices: [
      { id: "A", text: "I tend to address small issues when I notice them." },
      { id: "B", text: "Some small issues receive attention while others remain unresolved." },
      { id: "C", text: "I sometimes don't recognize the significance of a small issue until it has grown." },
      { id: "D", text: "Experience has made me more aware of things that can become larger problems." },
      { id: "E", text: "I tend to focus my attention on the larger issues rather than the smaller ones." },
    ],
  },
  {
    id: 20,
    sectionId: "protection",
    title: "External Forces",
    role: "discovery",
    prompt:
      "Every home is exposed to forces from outside. When external forces place pressure on your life, which description best reflects what happens?",
    choices: [
      { id: "A", text: "The pressure changes some of the things I have built." },
      { id: "B", text: "The pressure exposes areas that were already under strain." },
      { id: "C", text: "The pressure strengthens some areas while affecting others." },
      { id: "D", text: "The pressure changes the way different parts of my life work together." },
      { id: "E", text: "The pressure changes my understanding of what I have built." },
    ],
  },
  {
    id: 21,
    sectionId: "finish",
    title: "Finish",
    role: "discovery",
    prompt:
      "A home reaches a point where the builder considers the work finished. When you think about your own life, what does \u201cfinished\u201d mean to you?",
    choices: [
      { id: "A", text: "Finished means the work has reached the point I originally intended." },
      { id: "B", text: "Finished means the major work is done, even if some details remain." },
      { id: "C", text: "Finished means a particular season or chapter has reached its conclusion." },
      { id: "D", text: "Finished means I have reached the point where I am satisfied with what was accomplished." },
      { id: "E", text: "Finished is not a final destination for me; there is always another phase to build." },
    ],
  },
  {
    id: 22,
    sectionId: "finish",
    title: "Final Details",
    role: "discovery",
    prompt:
      "The final details may be small, but they complete the work and affect how the finished home functions. When you think about the details of your life, which statement best describes how you see them?",
    choices: [
      { id: "A", text: "The details are part of what makes the finished work what it is." },
      { id: "B", text: "Some details matter more to me than others." },
      { id: "C", text: "I notice certain details because of what they affect." },
      { id: "D", text: "Some details become important only after the larger work is finished." },
      { id: "E", text: "The details I focus on have changed as my life has changed." },
    ],
  },
  {
    id: 23,
    sectionId: "finish",
    title: "Final Inspection",
    role: "discovery",
    review: "scoring-not-approved",
    prompt:
      "Before a home is turned over, it goes through a final inspection. When you look at the life you have built, which statement best describes how you approach examining it?",
    choices: [
      { id: "A", text: "I look back at what I have built when I reach an important point in my life." },
      { id: "B", text: "I examine specific areas of my life when something causes me to question them." },
      { id: "C", text: "I regularly compare where I am with what I originally intended to build." },
      { id: "D", text: "I usually examine my life after an experience gives me a reason to do so." },
      { id: "E", text: "I have different ways of examining different parts of my life." },
    ],
  },
  {
    id: 24,
    sectionId: "finish",
    title: "Punch List",
    role: "attention",
    review: "attention-no-numerical-score",
    prompt:
      "Before a home is turned over, the final inspection identifies items that still need attention. When you look at your own life, which statement best describes how you view the things that remain unfinished?",
    choices: [
      { id: "A", text: "I have areas I know still need attention." },
      { id: "B", text: "Some things remain unfinished because other things have taken priority." },
      { id: "C", text: "I have discovered unfinished areas through experiences and reflection." },
      { id: "D", text: "Some unfinished things are intentional because their time has not come." },
      { id: "E", text: "I have areas I haven't yet determined whether they need to be finished." },
    ],
  },
  {
    id: 25,
    sectionId: "finish",
    title: "Purpose",
    role: "discovery",
    prompt:
      "A home is built for a purpose beyond the construction itself. When you think about the life you are building, which statement best describes what gives that life its purpose?",
    choices: [
      { id: "A", text: "The people who share the life I am building." },
      { id: "B", text: "The contribution I am able to make through the life I have built." },
      { id: "C", text: "The experiences I have had and the meaning I have found in them." },
      { id: "D", text: "The principles and beliefs that give my life direction." },
      { id: "E", text: "The difference I hope the life I build will make beyond myself." },
    ],
  },
];

export function getQuestionById(id) {
  return INSPECTION_QUESTIONS.find((question) => question.id === id);
}

export function getChoice(question, choiceId) {
  return question?.choices.find((choice) => choice.id === choiceId);
}
