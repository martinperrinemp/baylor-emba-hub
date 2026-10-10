"""Safe local prototype: group normalized proposals; NEVER publish or vote on dates.

Run: python scripts/reconcile.py examples/conflicting-reports.json
Only processes structured sample records. Natural-language AI extraction, official
source verification, reviewers, and production Cloudflare API are not implemented.
"""
import json
import sys
from collections import defaultdict
from pathlib import Path

ALLOWED_FIELDS = frozenset({"presentation_at", "submission_due_at", "official_due_at", "title", "ai_use_rule", "resource_link"})


def reconcile(reports):
    groups = defaultdict(list)
    for record in reports:
        field = record.get("field")
        if field not in ALLOWED_FIELDS:
            raise ValueError("Unsupported field: " + str(field))
        assignment_id = record.get("assignment_id")
        if not isinstance(assignment_id, str) or not assignment_id:
            raise ValueError("Missing assignment_id")
        val = record.get("proposed_value")
        if val is not None and not isinstance(val, str):
            raise ValueError("proposed_value must be string or null")
        groups[(assignment_id, field)].append(record)
    output = []
    for (assignment_id, field), records in sorted(groups.items()):
        proposed = defaultdict(list)
        for rec in records:
            proposed[rec.get("proposed_value")].append(rec.get("proposal_id"))
        is_conflict = len(proposed) > 1
        output.append({
            "assignment_id": assignment_id, "field": field,
            "status": "conflicting_reports" if is_conflict else "awaiting_authoritative_evidence",
            "report_count": len(records),
            "alternatives": [{"proposed_value": value, "report_ids": ids} for value, ids in sorted(proposed.items(), key=lambda e: str(e[0]))],
            "automatic_canonical_change": False,
            "human_review_required": True,
            "warning": "Reports are not authoritative evidence; original approved value must remain unchanged."
        })
    return output


if __name__ == "__main__":
    infile = Path(sys.argv[1] if len(sys.argv) > 1 else "examples/conflicting-reports.json")
    data = json.loads(infile.read_text(encoding="utf-8"))
    print(json.dumps({"reconciliation": reconcile(data["reports"])}, indent=2))
