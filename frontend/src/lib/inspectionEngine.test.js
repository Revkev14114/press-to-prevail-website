import { INSPECTION_QUESTIONS } from "../content/inspectionQuestions";
import { INSPECTION_SCORING } from "../content/inspectionScoring";
import {
  computeInternalConditionScores,
  generateInspectionReport,
  getAttentionFlags,
  getMissingQuestionIds,
} from "../content/inspectionReport";
import { colorSummary, COLOR_META } from "../content/inspectionColorRules";

const filled = (overrides = {}) => {
  const answers = {};
  INSPECTION_QUESTIONS.forEach((question) => {
    answers[question.id] = "A";
  });
  return { ...answers, ...overrides };
};

describe("Building the Perfect Home Inspection", () => {
  test("includes 25 questions with five choices each", () => {
    expect(INSPECTION_QUESTIONS).toHaveLength(25);
    INSPECTION_QUESTIONS.forEach((question) => {
      expect(question.choices.map((choice) => choice.id)).toEqual(["A", "B", "C", "D", "E"]);
    });
  });

  test("does not score discovery-only questions", () => {
    INSPECTION_SCORING.unscoredQuestionIds.forEach((id) => {
      expect(INSPECTION_SCORING.conditionQuestions[id]).toBeUndefined();
    });
    expect(INSPECTION_SCORING.conditionQuestions[9]).toBeUndefined();
    expect(INSPECTION_SCORING.attentionIndicators[24].numericalScoreApproved).toBe(false);
  });

  test("maps condition points by question-specific choice ids, not a global letter scale", () => {
    expect(INSPECTION_SCORING.conditionQuestions[4].points.A).toBe(4);
    expect(INSPECTION_SCORING.conditionQuestions[4].points.B).toBe(1);
    expect(INSPECTION_SCORING.conditionQuestions[16].points.A).toBe(3);
    expect(INSPECTION_SCORING.conditionQuestions[16].points.D).toBe(4);
  });

  test("returns incomplete when answers are missing", () => {
    const report = generateInspectionReport({ 1: "A" });
    expect(report.status).toBe("incomplete");
    expect(getMissingQuestionIds({ 1: "A" })).toHaveLength(24);
  });

  test("builds a report only after all answers are present and never includes point totals", () => {
    const report = generateInspectionReport(filled());
    expect(report.status).toBe("complete");
    expect(report.sections).toHaveLength(5);
    const asText = JSON.stringify(report);
    expect(asText).not.toMatch(/"points"/);
    expect(asText).not.toMatch(/byQuestion/);
    expect(report.summary).toMatch(/No numerical grade is shown/);
    expect(report.invitation).toMatch(/Building the Perfect Home/);
  });

  test("internal scores stay out of the participant report", () => {
    const answers = filled({ 4: "B", 12: "E", 16: "D", 19: "C" });
    const internal = computeInternalConditionScores(answers);
    expect(internal.byQuestion[4]).toBe(1);
    expect(internal.byQuestion[12]).toBe(1);
    expect(internal.byQuestion[16]).toBe(4);
    expect(internal.byQuestion[19]).toBe(1);
    const report = generateInspectionReport(answers);
    expect(JSON.stringify(report)).not.toContain('"byQuestion"');
  });

  test("marks Sealing C and E for closer examination without treating them as failure", () => {
    const flagsC = getAttentionFlags(filled({ 19: "C" }));
    expect(flagsC.some((flag) => flag.id === "sealing-closer")).toBe(true);
    expect(flagsC.find((flag) => flag.id === "sealing-closer").interpretation).toMatch(/not a diagnosis/);

    const flagsE = getAttentionFlags(filled({ 19: "E" }));
    expect(flagsE.some((flag) => flag.id === "sealing-closer")).toBe(true);

    const flagsB = getAttentionFlags(filled({ 19: "B" }));
    expect(flagsB.some((flag) => flag.id === "sealing-review")).toBe(true);
    expect(flagsB.find((flag) => flag.id === "sealing-review").interpretation).toMatch(/not automatic evidence of failure/);

    const flagsA = getAttentionFlags(filled({ 19: "A" }));
    expect(flagsA.some((flag) => flag.id.startsWith("sealing"))).toBe(false);
  });

  test("Punch List does not condemn intentional deferral", () => {
    const report = generateInspectionReport(filled({ 24: "D" }));
    const punch = report.attentionIndicators.find((flag) => flag.id === "punch-list");
    expect(punch.interpretation).toMatch(/Intentional deferral/);
    expect(punch.level).toBe("context");
  });

  test("every section receives exactly one color tag with the approved labels", () => {
    const tags = colorSummary(filled());
    expect(tags).toHaveLength(5);
    const ids = tags.map((tag) => tag.sectionId);
    expect(ids).toEqual(["architect", "foundation", "structure", "protection", "finish"]);
    expect(COLOR_META.red.label).toBe("NEEDS IMMEDIATE ATTENTION");
    expect(COLOR_META.green.label).toBe("A STRENGTH TO BUILD UPON");
    expect(COLOR_META.blue.label).toBe("AN AREA FOR DEVELOPMENT");
    expect(COLOR_META.yellow.label).toBe("WORTH A CLOSER LOOK");
    tags.forEach((tag) => {
      expect(Object.keys(COLOR_META)).toContain(tag.color);
      expect(tag.label).toBe(COLOR_META[tag.color].label);
      expect(tag.text).toBe(COLOR_META[tag.color].text);
      expect(tag.finding).toBeTruthy();
    });
    expect(JSON.stringify(tags)).not.toMatch(/%/);
  });

  test("green requires aligned supporting evidence", () => {
    const tags = colorSummary(filled({ 1: "A", 3: "A", 4: "A", 5: "A", 12: "A", 13: "A", 14: "A", 16: "A", 19: "A" }));
    expect(tags.find((tag) => tag.sectionId === "architect").color).toBe("green");
    expect(tags.find((tag) => tag.sectionId === "structure").color).toBe("green");
    expect(tags.find((tag) => tag.sectionId === "protection").color).toBe("green");
  });

  test("insufficient evidence produces Blue rather than an invented conclusion", () => {
    const tags = colorSummary(filled({ 4: "C", 8: "A", 9: "E", 10: "A", 12: "B", 13: "E", 23: "A", 24: "B" }));
    expect(tags.find((tag) => tag.sectionId === "architect").color).toBe("blue");
    expect(tags.find((tag) => tag.sectionId === "foundation").color).toBe("blue");
    expect(tags.find((tag) => tag.sectionId === "structure").color).toBe("blue");
    expect(tags.find((tag) => tag.sectionId === "finish").color).toBe("blue");
  });

  test("one concerning answer does not automatically cause Red", () => {
    expect(colorSummary(filled({ 4: "B" })).find((tag) => tag.sectionId === "architect").color).not.toBe("red");
    expect(colorSummary(filled({ 19: "E" })).find((tag) => tag.sectionId === "protection").color).not.toBe("red");
    expect(colorSummary(filled({ 12: "E" })).find((tag) => tag.sectionId === "structure").color).not.toBe("red");
  });

  test("Q19 Sealing alone does not trigger Red", () => {
    const protection = colorSummary(filled({ 19: "C", 16: "A", 20: "A" })).find((tag) => tag.sectionId === "protection");
    expect(protection.color).toBe("yellow");
  });

  test("Q24 intentional deferral does not automatically cause a warning color", () => {
    const finish = colorSummary(filled({ 23: "A", 24: "D", 21: "E", 22: "A" })).find((tag) => tag.sectionId === "finish");
    expect(finish.color).not.toBe("red");
    expect(finish.color).not.toBe("yellow");
  });

  test("Red requires a cluster of supporting answers", () => {
    const architect = colorSummary(filled({ 4: "B", 1: "E", 3: "C", 5: "E" })).find((tag) => tag.sectionId === "architect");
    expect(architect.color).toBe("red");
    const protection = colorSummary(filled({ 16: "E", 19: "E", 20: "B" })).find((tag) => tag.sectionId === "protection");
    expect(protection.color).toBe("red");
  });

  test("identical answer patterns yield identical colors and findings", () => {
    const first = colorSummary(filled({ 4: "B", 1: "A", 5: "B" }));
    const second = colorSummary(filled({ 4: "B", 1: "A", 5: "B" }));
    expect(first).toEqual(second);
  });

  test("personalized findings use the selected answers", () => {
    const report = generateInspectionReport(filled({ 4: "B", 1: "A", 5: "B" }));
    const architect = report.sections.find((section) => section.id === "architect");
    expect(architect.yourResponses.find((item) => item.id === 4).answer).toMatch(/Different areas of my life are pulling/);
    expect(architect.shortFinding).toMatch(/tension/);
    expect(report.nextSteps).toHaveLength(3);
  });

  test("Yellow mixed-pattern architect when vision and building diverge", () => {
    const architect = colorSummary(filled({ 1: "A", 4: "A", 5: "C", 3: "B" })).find((tag) => tag.sectionId === "architect");
    expect(architect.color).toBe("yellow");
  });
});
