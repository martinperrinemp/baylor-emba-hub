"""Validate public machine-readable files and basic cross-file integrity (stdlib only)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = ["manifest", "assignments", "resources", "ai-policies", "lessons-learned", "changes", "open-alerts"]


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
    rid = [x["id"] for x in data["resources"]["resources"]]
    assert len(rid) == len(set(rid)), "Duplicate resource ids"
    assert all("verification_status" in x and "ai_tool" in x for x in data["resources"]["resources"])
    assert data["ai-policies"].get("default") == "unknown_requires_official_verification"
    assert len(data["changes"]["changes"]) <= manifest["knowledge_revision"], "Changes exceed revision"
    return True


if __name__ == "__main__":
    validate()
    print("Baylor EMBA hub data validation: PASS")
