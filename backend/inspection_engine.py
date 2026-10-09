"""Life Inspection report builder.

Color rules must stay aligned with frontend/src/content/inspectionColorRules.js.
Not scientifically validated. Never assign colors from a global A–E grade.
"""

from __future__ import annotations

from typing import Any

VALID_CHOICES = {"A", "B", "C", "D", "E"}
SECTION_IDS = ("architect", "foundation", "structure", "protection", "finish")
SECTION_QUESTIONS = {
    "architect": (1, 2, 3, 4, 5),
    "foundation": (6, 7, 8, 9, 10),
    "structure": (11, 12, 13, 14, 15),
    "protection": (16, 17, 18, 19, 20),
    "finish": (21, 22, 23, 24, 25),
}
SECTION_TITLES = {
    "architect": "Architect",
    "foundation": "Foundation",
    "structure": "Structure",
    "protection": "Protection",
    "finish": "Finish",
}
COLOR_META = {
    "red": {"id": "red", "label": "NEEDS IMMEDIATE ATTENTION", "swatch": "#9B1B1B", "text": "#FFFFFF"},
    "green": {"id": "green", "label": "A STRENGTH TO BUILD UPON", "swatch": "#0B6B32", "text": "#FFFFFF"},
    "yellow": {"id": "yellow", "label": "WORTH A CLOSER LOOK", "swatch": "#C9A227", "text": "#0C1222"},
    "blue": {"id": "blue", "label": "AN AREA FOR DEVELOPMENT", "swatch": "#163A7A", "text": "#FFFFFF"},
}

FINDING_COPY = {
    "architect-red-reactive-fragment": "Your answers show competing directions, and more than one response says circumstances or the immediate next task are steering you. Write down one picture of the next year you want, then check which current commitments actually serve it.",
    "architect-green-aligned": "Your time, relationships, and responsibilities appear to be moving together toward a direction you can name. Keep using that picture when you decide what to take on or set aside.",
    "architect-yellow-tension": "There is a specific tension worth examining: different parts of life may be pulling apart, priorities may still be catching up, or the life you imagined and the life you are living may not fully agree. Look at one area that is out of step and decide whether the plan or the practice needs to change.",
    "architect-blue-develop": "You described how your direction has formed, but the answers do not yet show a single clear picture that the rest of life is following. A practical next step is to write a short description of the next season you want, then compare your calendar to it.",
    "foundation-red-unfiltered-load": "You tend to take on more as soon as it arrives, in a setting shaped more by circumstance than by choice, and hard seasons have already shown you things you had not seen. Before you add another responsibility, list what you are already carrying and what can wait.",
    "foundation-green-tested": "You can name the principles you use, you have learned from hard seasons, and extra demand leads you to adjust rather than simply pile more on. Keep using that filter when the next request arrives.",
    "foundation-yellow-uneven": "Some parts of your life handle extra demand better than others. Notice which commitments strain you first, and whether those are still the ones that should be carrying so much.",
    "foundation-blue-develop": "You described what has shaped your principles and how you respond when life gets heavier, but not a clear pattern of strength or strain. Name the two or three convictions you actually use when a hard decision comes.",
    "structure-red-unfit-reactive": "You have sometimes built without knowing whether your methods fit your plan, you often handle each situation as it comes, and extra demand is not clear until it is already pressing. Pick one important commitment and ask whether the way you are doing it still matches what you meant to build.",
    "structure-green-plan": "You tend to use what your plan calls for, you pay attention to how the work is done, and something more stable than spur-of-the-moment reaction holds things together. Keep checking new habits against that plan before they become permanent.",
    "structure-yellow-fit": "Some of what you are using may not fit as well as you expected, or some areas have less room when demand rises. Look at one habit, relationship, or routine that feels overloaded and ask whether it still belongs. A substitution by itself is not a defect.",
    "structure-blue-develop": "You described how your life currently gets its shape, but the answers do not show a clear fit or a clear problem. Name the plan you are actually following, then notice one habit that does not match it.",
    "protection-red-exposed": "Outside pressure often reaches you before you have prepared for it, small issues can grow before they are handled, and strain has already shown up under pressure. Choose one likely pressure you already know is coming, and one small issue you have been postponing, and address both this week. Sealing alone did not produce this tag.",
    "protection-green-covered": "You prepare for pressures you can see coming, or experience has taught you to anticipate them, and you tend to deal with small issues when you notice them. Keep that practice when the next disruption appears.",
    "protection-yellow-openings": "Small issues may wait, get missed until they grow, or lose out to bigger problems — or you often deal with trouble after it arrives. This is a prompt to look, not a verdict. Pick one small issue you already know about and decide what handling it would look like.",
    "protection-blue-develop": "You described how outside influence and pressure currently affect you, but not a clear pattern of being well prepared or clearly exposed. List the two or three outside pressures you already know will return, and how you usually respond.",
    "finish-red-unexamined-complete": "The work is being treated as complete while leftover items are still unclear, details often wait until later, and you mainly look back when something forces the question. Set a time to review what is actually unfinished before calling this season done. Unfinished work by itself did not produce this tag.",
    "finish-green-examined": "You regularly compare where you are with what you meant to build, and leftover work is either named or waiting on purpose. Keep a written list so intentional waiting does not turn into forgotten work.",
    "finish-yellow-remaining": "Some leftover work is still being sorted, or you mainly examine your life when something raises a question. Write down what is unfinished and mark what is waiting on purpose versus what has no date. Intentional deferral is not treated as failure.",
    "finish-blue-develop": "You described what “finished” means to you and what gives your life purpose, but not a regular way of reviewing leftover work. List what is still open and decide which items belong on this season’s list.",
}


class InspectionValidationError(ValueError):
    pass


def normalize_answers(raw: dict[str, Any]) -> dict[int, str]:
    answers: dict[int, str] = {}
    for key, value in raw.items():
        try:
            qid = int(key)
        except (TypeError, ValueError) as exc:
            raise InspectionValidationError("Answer keys must be question numbers 1–25.") from exc
        choice = str(value).strip().upper()
        if qid < 1 or qid > 25:
            raise InspectionValidationError("Answer keys must be question numbers 1–25.")
        if choice not in VALID_CHOICES:
            raise InspectionValidationError("Each answer must be one of A, B, C, D, or E.")
        answers[qid] = choice
    missing = [i for i in range(1, 26) if i not in answers]
    if missing:
        raise InspectionValidationError(f"All 25 answers are required. Missing: {missing}")
    extra = [k for k in answers if k < 1 or k > 25]
    if extra:
        raise InspectionValidationError("Unexpected question ids in answers.")
    return answers


def _a(answers: dict[int, str], qid: int) -> str:
    return answers.get(qid, "")


def _architect(answers: dict[int, str]) -> tuple[str, str]:
    reactive = sum(1 for q, vals in ((1, ("E",)), (3, ("C",)), (5, ("E",))) if _a(answers, q) in vals)
    if _a(answers, 4) == "B" and reactive >= 2:
        return "red", "architect-red-reactive-fragment"
    aligned = _a(answers, 4) == "A"
    has_direction = _a(answers, 1) == "A" or _a(answers, 3) == "A"
    living_toward = _a(answers, 5) in ("A", "B")
    if aligned and has_direction and living_toward:
        return "green", "architect-green-aligned"
    if _a(answers, 4) in ("B", "D") or (_a(answers, 1) == "A" and _a(answers, 5) in ("B", "C")):
        return "yellow", "architect-yellow-tension"
    return "blue", "architect-blue-develop"


def _foundation(answers: dict[int, str]) -> tuple[str, str]:
    if _a(answers, 9) == "A" and _a(answers, 6) == "E" and _a(answers, 7) == "E" and _a(answers, 10) == "D":
        return "red", "foundation-red-unfiltered-load"
    if _a(answers, 8) in ("C", "D") and _a(answers, 10) in ("B", "E") and _a(answers, 9) in ("B", "C"):
        return "green", "foundation-green-tested"
    if _a(answers, 9) == "D" or (_a(answers, 10) == "C" and _a(answers, 9) == "A"):
        return "yellow", "foundation-yellow-uneven"
    return "blue", "foundation-blue-develop"


def _structure(answers: dict[int, str]) -> tuple[str, str]:
    if _a(answers, 12) == "E" and _a(answers, 15) == "E" and _a(answers, 14) == "E":
        return "red", "structure-red-unfit-reactive"
    if _a(answers, 12) == "A" and _a(answers, 13) in ("A", "B") and _a(answers, 14) != "E":
        return "green", "structure-green-plan"
    if _a(answers, 12) == "D" or _a(answers, 15) in ("C", "E"):
        return "yellow", "structure-yellow-fit"
    return "blue", "structure-blue-develop"


def _protection(answers: dict[int, str]) -> tuple[str, str]:
    sealing_concern = _a(answers, 19) in ("C", "E")
    if _a(answers, 16) == "E" and sealing_concern and _a(answers, 20) == "B":
        return "red", "protection-red-exposed"
    if _a(answers, 16) in ("A", "D") and _a(answers, 19) in ("A", "D"):
        return "green", "protection-green-covered"
    if sealing_concern or _a(answers, 19) == "B" or _a(answers, 16) in ("C", "E"):
        return "yellow", "protection-yellow-openings"
    return "blue", "protection-blue-develop"


def _finish(answers: dict[int, str]) -> tuple[str, str]:
    called_finished = _a(answers, 21) in ("A", "D")
    prompted = _a(answers, 23) in ("B", "D")
    details_late = _a(answers, 22) == "D"
    unknown = _a(answers, 24) == "E"
    if called_finished and prompted and details_late and unknown and _a(answers, 24) != "D":
        return "red", "finish-red-unexamined-complete"
    if _a(answers, 23) == "C" and _a(answers, 24) in ("A", "D"):
        return "green", "finish-green-examined"
    if _a(answers, 24) == "E" or (_a(answers, 23) == "B" and _a(answers, 24) == "A"):
        return "yellow", "finish-yellow-remaining"
    return "blue", "finish-blue-develop"


_COLOR_FNS = {
    "architect": _architect,
    "foundation": _foundation,
    "structure": _structure,
    "protection": _protection,
    "finish": _finish,
}


def assign_section_color(section_id: str, answers: dict[int, str]) -> dict[str, str]:
    color, key = _COLOR_FNS[section_id](answers)
    meta = COLOR_META[color]
    return {
        "sectionId": section_id,
        "color": meta["id"],
        "label": meta["label"],
        "swatch": meta["swatch"],
        "text": meta["text"],
        "key": key,
        "finding": FINDING_COPY[key],
    }


def color_summary(answers: dict[int, str]) -> list[dict[str, str]]:
    return [assign_section_color(section_id, answers) for section_id in SECTION_IDS]


def build_inspection_report(raw_answers: dict[str, Any]) -> dict[str, Any]:
    answers = normalize_answers(raw_answers)
    colors = color_summary(answers)
    red_count = sum(1 for tag in colors if tag["color"] == "red")
    green_count = sum(1 for tag in colors if tag["color"] == "green")
    summary = (
        "This Life Inspection walked five areas the way a house is walked: Architect, Foundation, Structure, Protection, and Finish. "
        + (
            "At least one area is tagged for prompt attention because several answers together showed a concern — not because a single hard season or unfinished item appeared. "
            if red_count
            else "Nothing here is treated as an emergency solely because life is unfinished, under pressure, or being adjusted. "
        )
        + (
            "Where a strength showed up, it is named so you can keep building on it. "
            if green_count
            else "Where the answers did not establish a clear strength, the tag is development or a closer look — not a failing grade. "
        )
        + "This is not a scientific test and not a score of your worth or faith. No numerical grade is shown."
    )
    sections = []
    for tag in colors:
        sections.append(
            {
                "id": tag["sectionId"],
                "title": SECTION_TITLES[tag["sectionId"]],
                "color": tag["color"],
                "colorLabel": tag["label"],
                "swatch": tag["swatch"],
                "shortFinding": tag["finding"],
                "interpretation": tag["finding"],
            }
        )
    next_steps = _next_steps(answers, colors)
    return {
        "status": "complete",
        "summary": summary,
        "colors": colors,
        "sections": sections,
        "nextSteps": next_steps,
        "invitation": (
            "If this walkthrough named something you want to examine more closely, start with Building the Perfect Home, "
            "its workbook, or a group workshop. The inspection shows where to look. The work of building happens in the actual construction."
        ),
        "limitations": (
            "This inspection is a conversation tool, not a scientific test. Findings describe patterns in your answers; "
            "they do not grade your worth or measure your faith."
        ),
        "answers": {str(k): v for k, v in answers.items()},
    }


def _next_steps(answers: dict[int, str], colors: list[dict[str, str]]) -> list[dict[str, str]]:
    recs = {
        "architect": "Name the picture you are actually building toward, then ask whether your time and responsibilities sit on the same drawing.",
        "foundation": "Name what the life is sitting on before stacking more weight on it.",
        "structure": "Compare what is actually in the walls with the plan, and notice which joints carry the load.",
        "protection": "Name the weather you already know, and one small opening that deserves a seal.",
        "finish": "Write a punch list of what is unfinished, and mark what is waiting its season.",
    }
    priority = {"red": 0, "yellow": 1, "blue": 2, "green": 3}
    ordered = sorted(colors, key=lambda tag: priority[tag["color"]])
    steps = []
    for tag in ordered:
        if len(steps) >= 3:
            break
        sid = tag["sectionId"]
        steps.append({"sectionId": sid, "title": SECTION_TITLES[sid], "color": tag["color"], "text": recs[sid]})
    return steps


def render_report_email_html(report: dict[str, Any], books_url: str) -> str:
    from html import escape

    books = escape(books_url)
    rows = []
    for section in report["sections"]:
        swatch = escape(section["swatch"])
        title = escape(section["title"])
        label = escape(section["colorLabel"])
        finding = escape(section["shortFinding"])
        rows.append(
            "<tr><td style='padding:16px 0;border-bottom:1px solid #2a2c30'>"
            f"<p style='margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;"
            f"text-transform:uppercase;color:{swatch}'>{title} — {label}</p>"
            f"<p style='margin:10px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#c9c4b8'>{finding}</p>"
            "</td></tr>"
        )
    steps = "".join(
        f"<li style='margin:0 0 10px;font-size:14px;line-height:1.5;color:#c9c4b8'>"
        f"<strong style='color:#f4f1ea'>{escape(step['title'])}.</strong> {escape(step['text'])}</li>"
        for step in report["nextSteps"]
    )
    summary = escape(report["summary"])
    invitation = escape(report["invitation"])
    limitations = escape(report["limitations"])
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#0c0c0e;padding:32px 16px"><tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="background:#12161a;border:1px solid #2a2c30;border-radius:12px;overflow:hidden">'
        '<tr><td style="padding:24px 28px;border-bottom:1px solid #2a2c30">'
        '<p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#f4f1ea">Press to Prevail</p>'
        '<p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;'
        'text-transform:uppercase;color:#c9a227">Building the Perfect Home Life Inspection</p></td></tr>'
        f'<tr><td style="padding:24px 28px;font-family:Arial,sans-serif">'
        f'<p style="margin:0;font-size:15px;line-height:1.6;color:#c9c4b8">{summary}</p>'
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px">{"".join(rows)}</table>'
        f'<p style="margin:24px 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;'
        f'text-transform:uppercase;color:#c9a227">Three next steps</p>'
        f'<ol style="margin:0;padding-left:20px;font-family:Arial,sans-serif">{steps}</ol>'
        f'<p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#c9c4b8">{invitation}</p>'
        f'<p style="margin:24px 0 0"><a href="{books}" style="display:inline-block;background:#c9a227;'
        f'color:#0c0c0e;font-size:13px;font-weight:bold;text-decoration:none;padding:12px 22px;'
        f'border-radius:999px">Read Chapter One</a></p>'
        f'<p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#8a8577">Chapter One of '
        f'<em>Building the Perfect Home</em> is available on the Books page of the Press to Prevail website.</p>'
        f'</td></tr>'
        f'<tr><td style="padding:20px 28px;border-top:1px solid #2a2c30">'
        f'<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#8a8577">{limitations} '
        f'You received this because you asked for your Life Inspection report. '
        f"We never ask for your password or card details by email.</p>"
        "</td></tr></table></td></tr></table>"
    )


async def deliver_inspection_report(
    *,
    email: str,
    answers: dict[str, Any],
    marketing_opt_in: bool,
    send_email_fn,
    save_marketing_consent_fn=None,
    books_url: str,
) -> dict[str, Any]:
    """Build the report from answers, send it, optionally record marketing consent.

    Does not persist answers or the report. Does not send the chapter-preview welcome.
    Returns the structured report only after send_email_fn returns a truthy id.
    """
    report = build_inspection_report(answers)
    html = render_report_email_html(report, books_url)
    email_id = await send_email_fn(to=email, html=html)
    if not email_id:
        raise InspectionSendError("The report could not be emailed. Please try again.")
    if marketing_opt_in and save_marketing_consent_fn is not None:
        await save_marketing_consent_fn(email)
    public = {k: v for k, v in report.items() if k != "answers"}
    return public


class InspectionSendError(RuntimeError):
    pass
