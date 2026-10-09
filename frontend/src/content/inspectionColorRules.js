/**
 * Color tags for the Life Inspection.
 *
 * These rules are a documented working model, not a scientifically validated instrument.
 * Colors are assigned from the meaning of answer combinations — never from a global
 * A–E point scale and never as a grade of character, worth, or faith.
 *
 * Labels (exact):
 *   red    — NEEDS IMMEDIATE ATTENTION
 *   green  — A STRENGTH TO BUILD UPON
 *   blue   — AN AREA FOR DEVELOPMENT
 *   yellow — WORTH A CLOSER LOOK
 *
 * Order of decision for each section: Red, then Green, then Yellow, else Blue.
 *
 * Red requires several supporting answers and evidence that prompt action is warranted.
 * It is never assigned merely because priorities conflict, pressure is present,
 * work remains unfinished, Sealing (Q19) is concerning, or Punch List (Q24) is unfinished.
 * If urgency cannot be established, the section is not Red.
 *
 * Green requires evidence of a strength that supports the participant's stated direction.
 * Yellow is a specific tension, mixed pattern, or item that deserves examination.
 * Blue is an identifiable development opportunity, or insufficient evidence for a
 * clearer conclusion (the default — never invent urgency or a strength).
 *
 * Identical answer patterns always yield the same color and the same explanation key.
 */

export const COLOR_META = {
  red: { id: "red", label: "NEEDS IMMEDIATE ATTENTION", swatch: "#9B1B1B", text: "#FFFFFF" },
  green: { id: "green", label: "A STRENGTH TO BUILD UPON", swatch: "#0B6B32", text: "#FFFFFF" },
  yellow: { id: "yellow", label: "WORTH A CLOSER LOOK", swatch: "#C9A227", text: "#0C1222" },
  blue: { id: "blue", label: "AN AREA FOR DEVELOPMENT", swatch: "#163A7A", text: "#FFFFFF" },
};

function ans(answers, id) {
  return answers[id] ?? answers[String(id)] ?? "";
}

function count(answers, spec) {
  return Object.entries(spec).filter(([id, values]) => values.includes(ans(answers, Number(id)))).length;
}

function architectColor(answers) {
  const reactive = count(answers, { 1: ["E"], 3: ["C"], 5: ["E"] });
  // Red: fragmentation plus at least two signs of a life steered by the immediate/circumstances.
  if (ans(answers, 4) === "B" && reactive >= 2) {
    return { color: "red", key: "architect-red-reactive-fragment" };
  }
  const aligned = ans(answers, 4) === "A";
  const hasDirection = ["A"].includes(ans(answers, 1)) || ["A"].includes(ans(answers, 3));
  const livingTowardIt = ["A", "B"].includes(ans(answers, 5));
  if (aligned && hasDirection && livingTowardIt) {
    return { color: "green", key: "architect-green-aligned" };
  }
  if (ans(answers, 4) === "B" || ans(answers, 4) === "D" || (ans(answers, 1) === "A" && ["B", "C"].includes(ans(answers, 5)))) {
    return { color: "yellow", key: "architect-yellow-tension" };
  }
  return { color: "blue", key: "architect-blue-develop" };
}

function foundationColor(answers) {
  // Red: load taken on without filter, on ground and preparation that were mostly incidental,
  // with testing that revealed unknown strain — several answers, not pressure alone.
  if (ans(answers, 9) === "A" && ans(answers, 6) === "E" && ans(answers, 7) === "E" && ans(answers, 10) === "D") {
    return { color: "red", key: "foundation-red-unfiltered-load" };
  }
  const materialHolds = ["C", "D"].includes(ans(answers, 8));
  const testedWell = ["B", "E"].includes(ans(answers, 10));
  const handlesWeight = ["B", "C"].includes(ans(answers, 9));
  if (materialHolds && testedWell && handlesWeight) {
    return { color: "green", key: "foundation-green-tested" };
  }
  if (ans(answers, 9) === "D" || (ans(answers, 10) === "C" && ans(answers, 9) === "A")) {
    return { color: "yellow", key: "foundation-yellow-uneven" };
  }
  return { color: "blue", key: "foundation-blue-develop" };
}

function structureColor(answers) {
  if (ans(answers, 12) === "E" && ans(answers, 15) === "E" && ans(answers, 14) === "E") {
    return { color: "red", key: "structure-red-unfit-reactive" };
  }
  const usesPlan = ans(answers, 12) === "A";
  const craft = ["A", "B"].includes(ans(answers, 13));
  const connected = ans(answers, 14) !== "E";
  if (usesPlan && craft && connected) {
    return { color: "green", key: "structure-green-plan" };
  }
  if (["D"].includes(ans(answers, 12)) || ans(answers, 15) === "C" || ans(answers, 15) === "E") {
    return { color: "yellow", key: "structure-yellow-fit" };
  }
  return { color: "blue", key: "structure-blue-develop" };
}

function protectionColor(answers) {
  const sealingConcern = ["C", "E"].includes(ans(answers, 19));
  // Red: weather ignored until it hits, small openings neglected, AND pressure already
  // exposing strain. Q19 alone never produces Red.
  if (ans(answers, 16) === "E" && sealingConcern && ans(answers, 20) === "B") {
    return { color: "red", key: "protection-red-exposed" };
  }
  const prepares = ["A", "D"].includes(ans(answers, 16));
  const seals = ["A", "D"].includes(ans(answers, 19));
  if (prepares && seals) {
    return { color: "green", key: "protection-green-covered" };
  }
  if (sealingConcern || ans(answers, 19) === "B" || ["C", "E"].includes(ans(answers, 16))) {
    return { color: "yellow", key: "protection-yellow-openings" };
  }
  return { color: "blue", key: "protection-blue-develop" };
}

function finishColor(answers) {
  const calledFinished = ["A", "D"].includes(ans(answers, 21));
  const examinesOnlyWhenPrompted = ["B", "D"].includes(ans(answers, 23));
  const detailsLate = ans(answers, 22) === "D";
  const unknownRemaining = ans(answers, 24) === "E";
  // Intentional deferral (Q24 D) is never used as a defect and cannot create Red.
  if (calledFinished && examinesOnlyWhenPrompted && detailsLate && unknownRemaining && ans(answers, 24) !== "D") {
    return { color: "red", key: "finish-red-unexamined-complete" };
  }
  const examines = ans(answers, 23) === "C";
  const remainingKnownOrSeasoned = ["A", "D"].includes(ans(answers, 24));
  if (examines && remainingKnownOrSeasoned) {
    return { color: "green", key: "finish-green-examined" };
  }
  // Q24 D alone is not a warning. Uncertainty (E) or mixed examination can be yellow.
  if (ans(answers, 24) === "E" || (ans(answers, 23) === "B" && ans(answers, 24) === "A")) {
    return { color: "yellow", key: "finish-yellow-remaining" };
  }
  return { color: "blue", key: "finish-blue-develop" };
}

const SECTION_COLORS = {
  architect: architectColor,
  foundation: foundationColor,
  structure: structureColor,
  protection: protectionColor,
  finish: finishColor,
};

export const FINDING_COPY = {
  "architect-red-reactive-fragment":
    "Your answers show competing directions, and more than one response says circumstances or the immediate next task are steering you. Write down one picture of the next year you want, then check which current commitments actually serve it.",
  "architect-green-aligned":
    "Your time, relationships, and responsibilities appear to be moving together toward a direction you can name. Keep using that picture when you decide what to take on or set aside.",
  "architect-yellow-tension":
    "There is a specific tension worth examining: different parts of life may be pulling apart, priorities may still be catching up, or the life you imagined and the life you are living may not fully agree. Look at one area that is out of step and decide whether the plan or the practice needs to change.",
  "architect-blue-develop":
    "You described how your direction has formed, but the answers do not yet show a single clear picture that the rest of life is following. A practical next step is to write a short description of the next season you want, then compare your calendar to it.",
  "foundation-red-unfiltered-load":
    "You tend to take on more as soon as it arrives, in a setting shaped more by circumstance than by choice, and hard seasons have already shown you things you had not seen. Before you add another responsibility, list what you are already carrying and what can wait.",
  "foundation-green-tested":
    "You can name the principles you use, you have learned from hard seasons, and extra demand leads you to adjust rather than simply pile more on. Keep using that filter when the next request arrives.",
  "foundation-yellow-uneven":
    "Some parts of your life handle extra demand better than others. Notice which commitments strain you first, and whether those are still the ones that should be carrying so much.",
  "foundation-blue-develop":
    "You described what has shaped your principles and how you respond when life gets heavier, but not a clear pattern of strength or strain. Name the two or three convictions you actually use when a hard decision comes.",
  "structure-red-unfit-reactive":
    "You have sometimes built without knowing whether your methods fit your plan, you often handle each situation as it comes, and extra demand is not clear until it is already pressing. Pick one important commitment and ask whether the way you are doing it still matches what you meant to build.",
  "structure-green-plan":
    "You tend to use what your plan calls for, you pay attention to how the work is done, and something more stable than spur-of-the-moment reaction holds things together. Keep checking new habits against that plan before they become permanent.",
  "structure-yellow-fit":
    "Some of what you are using may not fit as well as you expected, or some areas have less room when demand rises. Look at one habit, relationship, or routine that feels overloaded and ask whether it still belongs. A substitution by itself is not a defect.",
  "structure-blue-develop":
    "You described how your life currently gets its shape, but the answers do not show a clear fit or a clear problem. Name the plan you are actually following, then notice one habit that does not match it.",
  "protection-red-exposed":
    "Outside pressure often reaches you before you have prepared for it, small issues can grow before they are handled, and strain has already shown up under pressure. Choose one likely pressure you already know is coming, and one small issue you have been postponing, and address both this week. Sealing alone did not produce this tag.",
  "protection-green-covered":
    "You prepare for pressures you can see coming, or experience has taught you to anticipate them, and you tend to deal with small issues when you notice them. Keep that practice when the next disruption appears.",
  "protection-yellow-openings":
    "Small issues may wait, get missed until they grow, or lose out to bigger problems — or you often deal with trouble after it arrives. This is a prompt to look, not a verdict. Pick one small issue you already know about and decide what handling it would look like.",
  "protection-blue-develop":
    "You described how outside influence and pressure currently affect you, but not a clear pattern of being well prepared or clearly exposed. List the two or three outside pressures you already know will return, and how you usually respond.",
  "finish-red-unexamined-complete":
    "The work is being treated as complete while leftover items are still unclear, details often wait until later, and you mainly look back when something forces the question. Set a time to review what is actually unfinished before calling this season done. Unfinished work by itself did not produce this tag.",
  "finish-green-examined":
    "You regularly compare where you are with what you meant to build, and leftover work is either named or waiting on purpose. Keep a written list so intentional waiting does not turn into forgotten work.",
  "finish-yellow-remaining":
    "Some leftover work is still being sorted, or you mainly examine your life when something raises a question. Write down what is unfinished and mark what is waiting on purpose versus what has no date. Intentional deferral is not treated as failure.",
  "finish-blue-develop":
    "You described what “finished” means to you and what gives your life purpose, but not a regular way of reviewing leftover work. List what is still open and decide which items belong on this season’s list.",
};

export function assignSectionColor(sectionId, answers) {
  const fn = SECTION_COLORS[sectionId];
  if (!fn) return { color: "blue", key: `${sectionId}-blue-develop` };
  return fn(answers);
}

export function colorResult(sectionId, answers) {
  const { color, key } = assignSectionColor(sectionId, answers);
  const meta = COLOR_META[color];
  return {
    sectionId,
    color: meta.id,
    label: meta.label,
    swatch: meta.swatch,
    text: meta.text,
    key,
    finding: FINDING_COPY[key],
  };
}

export function colorSummary(answers) {
  return ["architect", "foundation", "structure", "protection", "finish"].map((id) => colorResult(id, answers));
}
