"""Validate public machine-readable files and basic cross-file integrity (stdlib only)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = ["manifest", "assignments", "prep", "resources", "ai-policies", "lessons-learned", "changes", "open-alerts"]


def validate():
    data = {n: json.loads((ROOT / "data" / (n + ".json")).read_text(encoding="utf-8")) for n in FILES}
    for n, obj in data.items():
        assert isinstance(obj.get("schema_version"), str), f"Missing schema_version: {n}"
    manifest = data["manifest"]
    assert type(manifest.get("knowledge_revision")) is int and manifest["knowledge_revision"] >= 0
    assert manifest["open_urgent_alert_count"] == sum(1 for x in data["open-alerts"]["alerts"] if x.get("urgent"))
    ids = [x["id"] for x in data["assignments"]["records"]]
    assert len(ids) == len(set(ids)), "Duplicate assignment ids"
    for x in data["assignments"]["records"]:
        assert x.get("verification_status") in {"verified", "needs_verification", "conflicted"}
        assert all(x.get(k) is None or isinstance(x[k], str) for k in ["presentation_at", "submission_due_at", "official_due_at"])
        assert not (x.get("source_reference") or "").lower().startswith("https://baylor.instructure.com"), "Do not publish Canvas private file references"
    # Read-only public prep catalog must contain only course-wide, provisional
    # metadata. No private Canvas file URLs or individual study state.
    prep = data["prep"]
    assert isinstance(prep.get("records"), list), "Prep records must be an array"
    prep_ids = [x["id"] for x in prep["records"]]
    assert len(prep_ids) == len(set(prep_ids)), "Duplicate prep ids"
    forbidden = {"status", "completed", "submitted", "personal_status", "grade", "group_members", "estimated_hours"}
    for x in prep["records"]:
        assert not forbidden.intersection(x), "Private or student-specific prep fields cannot be public"
        assert x.get("verification_status") in {"verified", "needs_verification", "conflicted"}
        assert x.get("course_id") and x.get("module") and x.get("title"), "Prep item missing key metadata"
        assert x.get("date_meaning") == "preparation_or_discussion_date_from_original_tracker_not_necessarily_a_submission_deadline"
        assert x.get("due_or_discuss_date") is None or (
            isinstance(x["due_or_discuss_date"], str) and
            len(x["due_or_discuss_date"]) == 10 and x["due_or_discuss_date"][4] == "-"
        ), "Prep date must be date-only and cannot be treated as an assignment deadline"
        serialized = json.dumps(x).lower()
        assert "baylor.instructure.com" not in serialized, "Private Canvas file references are forbidden"
        url = x.get("external_resource_url")
        if url is not None:
            assert isinstance(url, str) and (
                url.startswith("https://www.youtube.com/watch?v=") or
                url.startswith("https://www.mckinsey.com/")
            ), "Only explicitly public third-party prep links may be published"
    rid = [x["id"] for x in data["resources"]["resources"]]
    assert len(rid) == len(set(rid)), "Duplicate resource ids"
    assert all("verification_status" in x and "ai_tool" in x for x in data["resources"]["resources"])
    assert data["ai-policies"].get("default") == "unknown_requires_official_verification"
    ai_policies = data["ai-policies"].get("policies", [])
    assert isinstance(ai_policies, list), "AI policies must be an array"
    assert len({p["id"] for p in ai_policies}) == len(ai_policies), "Duplicate AI policy ids"
    known_assignments = set(ids)
    forbidden_policy_fields = {"personal_status", "grade", "student_name", "student_email", "submitted", "completed"}
    for p in ai_policies:
        assert p.get("assignment_id") in known_assignments, "AI policy references unknown assignment"
        assert p.get("verification_status") in {"verified", "needs_verification", "conflicted"}
        assert not forbidden_policy_fields.intersection(p), "Personal data or status in public AI policy"
        assert p.get("source_reference"), "AI policy must carry safe source attribution"
        assert "baylor.instructure.com" not in json.dumps(p).lower(), "Private course link in public AI guidance"
        if p["verification_status"] != "verified":
            assert p.get("verified_permission") is False, "Unverified policy cannot grant permission"

    assert len(data["changes"]["changes"]) <= manifest["knowledge_revision"], "Changes exceed revision"
    return True


if __name__ == "__main__":
    validate()
    print("Baylor EMBA hub data validation: PASS")
