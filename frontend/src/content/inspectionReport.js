import { INSPECTION_QUESTIONS, INSPECTION_SECTIONS, getChoice, getQuestionById } from "./inspectionQuestions";
import { INSPECTION_SCORING } from "./inspectionScoring";
import { colorSummary } from "./inspectionColorRules";

export const REPORT_LIMITATIONS =
  "This inspection is a conversation tool, not a scientific test. A few questions have working internal rules that have not been validated. Most questions are discovery-only. Findings describe patterns in your answers; they do not grade your worth or measure your faith.";

export const REPORT_INVITATION =
  "If this walkthrough named something you want to examine more closely, start with Building the Perfect Home, its workbook, or a group workshop. The inspection shows where to look. The work of building happens in the actual construction.";

const MEANING = {
  1: {
    A: "You already carry a picture of the life you want to build.",
    B: "You have goals, but they have not yet formed one clear picture.",
    C: "Your direction has been shaped as circumstances changed.",
    D: "You are still discovering what the next part of your life should look like.",
    E: "Your attention is more on what is immediately in front of you than on a long-term picture.",
  },
  2: {
    A: "Significant decisions are most often guided by principles and beliefs developed over time.",
    B: "Your own goals and priorities are the usual guide.",
    C: "Advice and expectations from people you trust often guide the work.",
    D: "Circumstances and opportunities in front of you most often set the course.",
    E: "Several influences together usually guide significant decisions.",
  },
  3: {
    A: "You have made most of the major decisions about direction.",
    B: "Several people have had a significant influence on the direction taken.",
    C: "Circumstances have played a major role in determining where you are.",
    D: "Direction has changed as your understanding of yourself has changed.",
    E: "Current direction reflects both intentional decisions and circumstances.",
  },
  4: {
    A: "Most areas of life appear to be moving in a similar direction.",
    B: "Different areas are pulling in different directions.",
    C: "Some areas receive considerably more attention than others.",
    D: "Priorities have changed, and other parts of life are still adjusting.",
    E: "Responsibilities largely determine how time and attention are divided.",
  },
  5: {
    A: "The life being lived resembles much of what was once envisioned.",
    B: "Some parts look like the earlier vision; other parts have taken a different direction.",
    C: "Life has developed in ways that could not have been anticipated.",
    D: "The vision itself has changed as you have changed.",
    E: "More time is spent responding to the present than comparing it with an earlier vision.",
  },
  6: {
    A: "Surroundings have remained relatively consistent as life developed.",
    B: "People and influences around you have changed significantly over the years.",
    C: "The environment is shaped by several different relationships, responsibilities, and influences.",
    D: "Parts of the environment have been changed intentionally as priorities changed.",
    E: "The current environment is largely the result of circumstances and decisions along the way.",
  },
  7: {
    A: "Some experiences prepared you for what you later faced.",
    B: "Much of the preparation came through people who influenced you.",
    C: "Difficult experiences became important parts of the preparation.",
    D: "Some things were prepared for intentionally; other areas developed along the way.",
    E: "Much of what shaped you was unexpected.",
  },
  8: {
    A: "Experiences have most influenced the principles used in important decisions.",
    B: "People who influenced you have most shaped those principles.",
    C: "Beliefs developed over time most influence important decisions.",
    D: "Successes and failures have been the main school for those principles.",
    E: "Several influences together shape the principles used to decide.",
  },
  9: {
    A: "When demands increase, additional responsibility is often taken on as it comes.",
    B: "Increased demands often lead to reconsidering priorities.",
    C: "You usually find ways to adjust when the weight increases.",
    D: "Some areas handle increased demands better than others.",
    E: "What matters most often becomes clearer when circumstances become demanding.",
  },
  10: {
    A: "Difficult seasons changed the way you see certain things.",
    B: "They strengthened some convictions and challenged others.",
    C: "They changed some relationships and priorities.",
    D: "They revealed things about yourself that had not been considered before.",
    E: "They became experiences you continue to draw from.",
  },
  11: {
    A: "Responsibilities and commitments currently give the life its shape.",
    B: "Important relationships give the life its shape and direction.",
    C: "Established goals and priorities give the frame its shape.",
    D: "Routines and habits developed over time establish the current shape.",
    E: "Circumstances, choices, and influences together give the current shape.",
  },
  12: {
    A: "You describe using what the plan calls for.",
    B: "Materials are sometimes substituted as circumstances change — which is not automatically a defect.",
    C: "Different materials than originally planned have been used — context matters more than the change itself.",
    D: "Some of what has been used does not fit the plan as well as expected.",
    E: "Work has sometimes proceeded without knowing whether the materials fit the plan.",
  },
  13: {
    A: "Important work tends to be completed according to the plan.",
    B: "Attention is paid to how the work is done, not only whether it is finished.",
    C: "The closest attention goes to the parts of the work that matter most.",
    D: "Adjustments are made when the work is not producing the expected result.",
    E: "The approach to the work varies depending on the situation.",
  },
  14: {
    A: "Commitments are what hold the different parts together under pressure.",
    B: "Relationships you depend on are the connections that hold the work together.",
    C: "Routines and systems are the connections under pressure.",
    D: "Guiding principles are what hold the parts together.",
    E: "Each situation tends to be met as it develops rather than from a single connecting system.",
  },
  15: {
    A: "When demands increase, you reorganize to make room for them.",
    B: "You rely on routines and systems already in place.",
    C: "Some areas show less capacity than others when weight increases.",
    D: "Priorities are adjusted as the demands change.",
    E: "What needs to change is often unclear until pressure exposes it.",
  },
  16: {
    A: "You typically prepare for outside pressures you know are likely to come.",
    B: "You adjust when you see conditions beginning to change.",
    C: "Problems are more often dealt with when they actually arrive.",
    D: "Past experience has taught you to anticipate certain pressures.",
    E: "Outside pressures are not always considered until they begin affecting you.",
  },
  17: {
    A: "Some surrounding influences have remained a consistent part of life.",
    B: "Influences have changed as seasons of life developed.",
    C: "Different parts of life are affected by different influences.",
    D: "Some influences have become more or less significant over time.",
    E: "Awareness of certain influences has grown through different circumstances.",
  },
  18: {
    A: "Some of what is allowed into the life has been chosen intentionally.",
    B: "Most of what entered came through relationships and circumstances.",
    C: "Some influences entered gradually and became significant over time.",
    D: "What is allowed in has changed as seasons developed.",
    E: "The impact of an influence is sometimes recognized only after it is already inside.",
  },
  19: {
    A: "Small issues tend to be addressed when they are noticed.",
    B: "Some small issues receive attention while others remain unresolved.",
    C: "The significance of a small issue is sometimes recognized only after it has grown.",
    D: "Experience has increased awareness of things that can become larger problems.",
    E: "Attention tends to go to larger issues rather than smaller ones.",
  },
  20: {
    A: "External pressure changes some of what has been built.",
    B: "Pressure exposes areas that were already under strain.",
    C: "Pressure strengthens some areas while affecting others.",
    D: "Pressure changes how different parts of life work together.",
    E: "Pressure changes the understanding of what has been built.",
  },
  21: {
    A: "“Finished” means the work has reached the point originally intended. That is a definition, not a ranking.",
    B: "“Finished” means the major work is done, even if details remain. That is a definition, not a ranking.",
    C: "“Finished” means a particular season or chapter has concluded. That is a definition, not a ranking.",
    D: "“Finished” means satisfaction with what was accomplished. That is a definition, not a ranking.",
    E: "“Finished” is not treated as a final destination; another phase is always ahead. Human life is never completely finished until the last day.",
  },
  22: {
    A: "Details are seen as part of what makes the finished work what it is.",
    B: "Some details matter more than others.",
    C: "Certain details are noticed because of what they affect.",
    D: "Some details become important only after the larger work is finished.",
    E: "The details in focus have changed as life has changed.",
  },
  23: {
    A: "You look back at what has been built when an important point is reached.",
    B: "Specific areas are examined when something causes you to question them.",
    C: "You regularly compare where you are with what was originally intended.",
    D: "Examination usually follows an experience that gives a reason to look.",
    E: "Different parts of life are examined in different ways.",
  },
  24: {
    A: "You know there are areas that still need attention. Unfinished work is not automatically a failure.",
    B: "Some things remain unfinished because other things have taken priority. That may be a matter of sequence, not neglect.",
    C: "Unfinished areas have been discovered through experience and reflection.",
    D: "Some unfinished things are intentional because their time has not come. Intentional deferral can be appropriate.",
    E: "Some areas have not yet been determined as needing to be finished. Uncertainty here invites reflection, not a negative judgment.",
  },
  25: {
    A: "Purpose is described in the people who share the life being built. Different sources of purpose are not levels of quality.",
    B: "Purpose is described as the contribution made through the life that has been built. Different sources of purpose are not levels of quality.",
    C: "Purpose is found in experiences and the meaning drawn from them. Different sources of purpose are not levels of quality.",
    D: "Purpose is described in principles and beliefs that give direction. Different sources of purpose are not levels of quality.",
    E: "Purpose is described as the difference hoped for beyond yourself. Different sources of purpose are not levels of quality.",
  },
};

const SECTION_OPENERS = {
  architect:
    "An inspector starts with the plans: who is designing, what the blueprint is, and whether the parts are working together.",
  foundation:
    "No house is stronger than what it sits on. This finding describes the ground, the preparation, and what carries weight — without grading the footing.",
  structure:
    "This is the frame: shape, materials, workmanship, connections, and how the structure handles added weight.",
  protection:
    "This is the weatherproofing: what is allowed in, how small openings are treated, and what outside pressure does.",
  finish:
    "This is the later work: what “finished” means, how details and remaining items are seen, and what the building is for.",
};

function choiceText(questionId, choiceId) {
  const question = getQuestionById(questionId);
  return getChoice(question, choiceId)?.text ?? "";
}

function meaning(questionId, choiceId) {
  return MEANING[questionId]?.[choiceId] ?? "";
}

function responsesForSection(section, answers) {
  return section.questions.map((questionId) => {
    const question = getQuestionById(questionId);
    const choiceId = answers[questionId];
    return {
      id: questionId,
      title: question.title,
      prompt: question.prompt,
      answer: choiceText(questionId, choiceId),
      choiceId,
      role: question.role,
    };
  });
}

function interpretationForSection(section, answers, colorTag) {
  return `${SECTION_OPENERS[section.id]} ${colorTag.finding}`;
}

export function recommendationsBySection(answers) {
  const bySection = {
    architect: [],
    foundation: [],
    structure: [],
    protection: [],
    finish: [],
  };
  const q4 = answers[4];
  if (q4 === "B" || q4 === "C" || q4 === "E") {
    bySection.architect.push(
      "Look at how time, relationships, work, and responsibilities sit on the same drawing. An architect checks whether the parts work together, not whether one room is impressive on its own.",
    );
  }
  if (q4 === "D") {
    bySection.architect.push(
      "If priorities have changed, give the rest of the house time to be redrawn. Adjustment is part of construction, not proof that the design failed.",
    );
  }
  if (answers[9] === "A" || answers[9] === "D") {
    bySection.foundation.push(
      "Name what is actually load-bearing before taking on more weight. A footing is designed for a load, not for whatever arrives next.",
    );
  }
  if (answers[12] === "D" || answers[12] === "E") {
    bySection.structure.push(
      "Compare what you are actually using with what the plan calls for. A substitution is not automatically a defect; name the reason and whether it still carries the load.",
    );
  }
  if (answers[16] === "C" || answers[16] === "E") {
    bySection.protection.push(
      "A builder does not wait for the storm to invent flashing. Name the outside pressures you already know are likely, and decide what covering belongs on the house before they arrive.",
    );
  }
  if (answers[19] === "C" || answers[19] === "E" || answers[19] === "B") {
    bySection.protection.push(
      "Small joints and seams are where weather gets in. Choose one small opening you already notice and give it attention before it becomes a larger leak. This is a closer look, not a verdict.",
    );
  }
  if (answers[24] === "A" || answers[24] === "C") {
    bySection.finish.push(
      "Write down the unfinished items you already know. An inspector lists remaining work so it can be completed in order — not so the house is condemned.",
    );
  }
  if (answers[24] === "B") {
    bySection.finish.push(
      "If other work has taken priority, name the sequence. Deferred work can be orderly. Unnamed work is what gets left in the weather.",
    );
  }
  if (answers[24] === "E") {
    bySection.finish.push(
      "You do not have to finish everything at once. First decide which remaining items actually belong on the list, and which are still waiting for their season.",
    );
  }
  Object.keys(bySection).forEach((id) => {
    if (bySection[id].length === 0) {
      bySection[id].push(
        "Walk this area the way an inspector would: look at what is actually there, name one true thing, and decide the next board — not a verdict on the whole house.",
      );
    }
  });
  return bySection;
}

function recommendationsFor(answers) {
  const bySection = recommendationsBySection(answers);
  return ["architect", "foundation", "structure", "protection", "finish"].flatMap((id) =>
    bySection[id].map((text) => {
      const title = INSPECTION_SECTIONS.find((section) => section.id === id).title;
      return `${title}: ${text}`;
    }),
  );
}

const COLOR_PRIORITY = { red: 0, yellow: 1, blue: 2, green: 3 };

export function prioritizedNextSteps(answers) {
  const tags = colorSummary(answers);
  const recs = recommendationsBySection(answers);
  const ordered = [...tags].sort((a, b) => COLOR_PRIORITY[a.color] - COLOR_PRIORITY[b.color]);
  const steps = [];
  ordered.forEach((tag) => {
    recs[tag.sectionId].forEach((text) => {
      if (steps.length < 3) {
        steps.push({
          sectionId: tag.sectionId,
          title: INSPECTION_SECTIONS.find((section) => section.id === tag.sectionId).title,
          color: tag.color,
          text,
        });
      }
    });
  });
  return steps.slice(0, 3);
}

function reflectionsFor(answers) {
  const questions = [
    "If an inspector walked the life you are building this week, which room would you ask him to enter first?",
    "What on your current punch list is unfinished because its time has not come — and what is unfinished because it has no date?",
  ];
  if (answers[1] === "B" || answers[1] === "D" || answers[1] === "E") {
    questions.push("If you had to sketch one picture of the next season — not ten goals — what would be on that drawing?");
  }
  if (answers[19] === "C" || answers[19] === "E") {
    questions.push("Which small opening have you already noticed, and what would it take to seal it before the next storm?");
  }
  return questions.slice(0, 4);
}

export function getAttentionFlags(answers) {
  const flags = [];
  const sealing = INSPECTION_SCORING.attentionIndicators[19];
  const sealingChoice = answers[19];
  if (sealing.closerExamination.includes(sealingChoice)) {
    flags.push({
      id: "sealing-closer",
      questionId: 19,
      title: "Sealing",
      level: "closer-examination",
      yourAnswer: choiceText(19, sealingChoice),
      interpretation:
        "Small openings can let weather into a structure over time. This answer suggests a closer look at small issues — not a diagnosis, and not a judgment of your character.",
    });
  } else if (sealing.mayWarrantReview.includes(sealingChoice)) {
    flags.push({
      id: "sealing-review",
      questionId: 19,
      title: "Sealing",
      level: "may-warrant-review",
      yourAnswer: choiceText(19, sealingChoice),
      interpretation:
        "Some small issues are receiving attention while others remain unresolved. That may simply need review in context. It is not automatic evidence of failure.",
    });
  }

  const punchChoice = answers[24];
  if (punchChoice === "D") {
    flags.push({
      id: "punch-list",
      questionId: 24,
      title: "Punch List",
      level: "context",
      yourAnswer: choiceText(24, punchChoice),
      interpretation: meaning(24, punchChoice),
    });
  } else {
    flags.push({
      id: "punch-list",
      questionId: 24,
      title: "Punch List",
      level: punchChoice === "E" ? "reflection" : "note",
      yourAnswer: choiceText(24, punchChoice),
      interpretation: meaning(24, punchChoice),
    });
  }

  return flags;
}

export function getMissingQuestionIds(answers) {
  return INSPECTION_QUESTIONS.filter((question) => !answers[question.id]).map((question) => question.id);
}

/** Internal only. Never pass this object into participant-facing UI. */
export function computeInternalConditionScores(answers) {
  const byQuestion = {};
  Object.entries(INSPECTION_SCORING.conditionQuestions).forEach(([id, rule]) => {
    const questionId = Number(id);
    const choiceId = answers[questionId];
    byQuestion[questionId] = choiceId ? rule.points[choiceId] ?? null : null;
  });
  return { byQuestion, validated: false };
}

export function generateInspectionReport(answers) {
  const missing = getMissingQuestionIds(answers);
  if (missing.length > 0) {
    return { status: "incomplete", missing };
  }

  const colors = colorSummary(answers);
  const recsBySection = recommendationsBySection(answers);

  const sections = INSPECTION_SECTIONS.map((section) => {
    const colorTag = colors.find((tag) => tag.sectionId === section.id);
    return {
      id: section.id,
      number: section.number,
      title: section.title,
      color: colorTag.color,
      colorLabel: colorTag.label,
      swatch: colorTag.swatch,
      textColor: colorTag.text,
      shortFinding: colorTag.finding,
      yourResponses: responsesForSection(section, answers),
      interpretation: interpretationForSection(section, answers, colorTag),
      recommendations: recsBySection[section.id],
    };
  });

  const attentionIndicators = getAttentionFlags(answers);
  const redCount = colors.filter((tag) => tag.color === "red").length;
  const greenCount = colors.filter((tag) => tag.color === "green").length;

  const summary = [
    "This Life Inspection walked five areas the way a house is walked: Architect, Foundation, Structure, Protection, and Finish.",
    redCount
      ? "At least one area is tagged for prompt attention because several answers together showed a concern — not because a single hard season or unfinished item appeared."
      : "Nothing here is treated as an emergency solely because life is unfinished, under pressure, or being adjusted.",
    greenCount
      ? "Where a strength showed up, it is named so you can keep building on it."
      : "Where the answers did not establish a clear strength, the tag is development or a closer look — not a failing grade.",
    "This is not a scientific test and not a score of your worth or faith. No numerical grade is shown.",
  ].join(" ");

  return {
    status: "complete",
    summary,
    colors,
    sections,
    attentionIndicators,
    recommendations: recommendationsFor(answers),
    nextSteps: prioritizedNextSteps(answers),
    reflections: reflectionsFor(answers),
    invitation: REPORT_INVITATION,
    limitations: REPORT_LIMITATIONS,
  };
}
