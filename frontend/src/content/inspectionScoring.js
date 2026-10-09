/**
 * Internal scoring only. Do not display these values to participants.
 * Points are mapped to specific choice IDs per question — never by a global A–E scale.
 * All numerical rules below are provisional and unvalidated.
 */
export const INSPECTION_SCORING = {
  version: "draft-1",
  validated: false,
  conditionQuestions: {
    4: {
      title: "Alignment",
      points: { A: 4, B: 1, C: 2, D: 3, E: 2 },
      note: "Provisional. Internal only. Not validated.",
    },
    12: {
      title: "Blueprint and Materials",
      points: { A: 4, B: 3, C: 3, D: 2, E: 1 },
      note: "Provisional. A change or substitution is not automatically a defect; consider reason and context.",
    },
    16: {
      title: "Weatherproofing",
      points: { A: 3, B: 3, C: 2, D: 4, E: 1 },
      note: "Provisional. Internal only. Not validated.",
    },
    19: {
      title: "Sealing",
      points: { A: 4, B: 2, C: 1, D: 3, E: 1 },
      note: "Provisional. Attention indicator; do not treat as automatic evidence of failure.",
    },
  },
  attentionIndicators: {
    19: {
      title: "Sealing",
      closerExamination: ["C", "E"],
      mayWarrantReview: ["B"],
      note: "These indicators are not diagnoses or judgments about the participant. Do not automatically lower a section score.",
    },
    24: {
      title: "Punch List",
      numericalScoreApproved: false,
      note: "Do not automatically flag every unfinished item. Intentional deferral may be appropriate. Uncertainty may invite reflection rather than a negative judgment.",
    },
  },
  unscoredQuestionIds: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 23, 25],
};
