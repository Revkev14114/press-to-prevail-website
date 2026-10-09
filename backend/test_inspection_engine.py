import asyncio

import pytest

from inspection_engine import (
    InspectionSendError,
    InspectionValidationError,
    build_inspection_report,
    color_summary,
    deliver_inspection_report,
    normalize_answers,
)


def filled(overrides=None):
    answers = {str(i): "A" for i in range(1, 26)}
    if overrides:
        answers.update({str(k): v for k, v in overrides.items()})
    return answers


def test_normalize_rejects_invalid_email_answers():
    with pytest.raises(InspectionValidationError):
        normalize_answers({"1": "A"})
    with pytest.raises(InspectionValidationError):
        normalize_answers({str(i): "A" for i in range(1, 26)} | {"3": "Z"})


def test_every_section_gets_one_color():
    tags = color_summary(normalize_answers(filled()))
    assert [tag["sectionId"] for tag in tags] == [
        "architect",
        "foundation",
        "structure",
        "protection",
        "finish",
    ]
    labels = {
        "red": "NEEDS IMMEDIATE ATTENTION",
        "green": "A STRENGTH TO BUILD UPON",
        "blue": "AN AREA FOR DEVELOPMENT",
        "yellow": "WORTH A CLOSER LOOK",
    }
    for tag in tags:
        assert tag["label"] == labels[tag["color"]]
        assert "%" not in tag["finding"]


def test_green_requires_supporting_evidence():
    tags = {tag["sectionId"]: tag["color"] for tag in color_summary(normalize_answers(filled({
        1: "A", 3: "A", 4: "A", 5: "A", 12: "A", 13: "A", 14: "A", 16: "A", 19: "A",
    })))}
    assert tags["architect"] == "green"
    assert tags["structure"] == "green"
    assert tags["protection"] == "green"


def test_insufficient_evidence_is_blue():
    tags = {tag["sectionId"]: tag["color"] for tag in color_summary(normalize_answers(filled({
        4: "C", 8: "A", 9: "E", 10: "A", 12: "B", 13: "E", 23: "A", 24: "B",
    })))}
    assert tags["architect"] == "blue"
    assert tags["foundation"] == "blue"
    assert tags["structure"] == "blue"
    assert tags["finish"] == "blue"


def test_one_concerning_answer_is_not_red():
    assert color_summary(normalize_answers(filled({4: "B"})))[0]["color"] != "red"
    protection = next(tag for tag in color_summary(normalize_answers(filled({19: "E"}))) if tag["sectionId"] == "protection")
    assert protection["color"] != "red"


def test_sealing_alone_is_not_red():
    protection = next(
        tag
        for tag in color_summary(normalize_answers(filled({19: "C", 16: "A", 20: "A"})))
        if tag["sectionId"] == "protection"
    )
    assert protection["color"] == "yellow"


def test_punch_list_intentional_deferral_is_not_a_warning_color():
    finish = next(
        tag
        for tag in color_summary(normalize_answers(filled({23: "A", 24: "D", 21: "E", 22: "A"})))
        if tag["sectionId"] == "finish"
    )
    assert finish["color"] not in ("red", "yellow")


def test_red_requires_a_cluster():
    architect = next(
        tag
        for tag in color_summary(normalize_answers(filled({4: "B", 1: "E", 3: "C", 5: "E"})))
        if tag["sectionId"] == "architect"
    )
    assert architect["color"] == "red"


def test_identical_patterns_match():
    a = color_summary(normalize_answers(filled({4: "B", 1: "A", 5: "B"})))
    b = color_summary(normalize_answers(filled({4: "B", 1: "A", 5: "B"})))
    assert a == b


def test_report_has_no_numeric_grade():
    report = build_inspection_report(filled())
    blob = str(report)
    assert "byQuestion" not in blob
    assert report["nextSteps"]
    assert "Building the Perfect Home" in report["invitation"]


def test_email_failure_does_not_report_success():
    async def fail_send(**kwargs):
        return None

    called = {"consent": False}

    async def consent(email):
        called["consent"] = True

    async def run():
        with pytest.raises(InspectionSendError):
            await deliver_inspection_report(
                email="reader@example.com",
                answers=filled(),
                marketing_opt_in=True,
                send_email_fn=fail_send,
                save_marketing_consent_fn=consent,
                books_url="https://example.com/books",
            )

    asyncio.run(run())
    assert called["consent"] is False


def test_marketing_consent_is_separate_from_delivery():
    sent = {"n": 0, "html": ""}

    async def ok_send(*, to, html):
        sent["n"] += 1
        sent["html"] = html
        sent["to"] = to
        return "email-id-1"

    consents = []

    async def save(email):
        consents.append(email)

    async def run():
        report = await deliver_inspection_report(
            email="reader@example.com",
            answers=filled(),
            marketing_opt_in=False,
            send_email_fn=ok_send,
            save_marketing_consent_fn=save,
            books_url="https://presstoprevail.com/books",
        )
        assert report["status"] == "complete"
        assert "answers" not in report
        assert consents == []
        assert sent["n"] == 1
        assert "Life Inspection" in sent["html"]
        assert "https://presstoprevail.com/books" in sent["html"]
        assert "chapter is unlocked" not in sent["html"].lower()

        await deliver_inspection_report(
            email="reader@example.com",
            answers=filled(),
            marketing_opt_in=True,
            send_email_fn=ok_send,
            save_marketing_consent_fn=save,
            books_url="https://presstoprevail.com/books",
        )
        assert consents == ["reader@example.com"]

    asyncio.run(run())


def test_chapter_welcome_is_not_used_by_inspection_engine():
    import inspect
    import inspection_engine
    import emailer

    source = inspect.getsource(inspection_engine)
    assert "send_subscriber_welcome" not in source
    assert "send_inspection_report_email" in inspect.getsource(emailer)
    assert "Your chapter is unlocked" in inspect.getsource(emailer.send_subscriber_welcome)
    assert "Life Inspection" in inspect.getsource(emailer.send_inspection_report_email)
