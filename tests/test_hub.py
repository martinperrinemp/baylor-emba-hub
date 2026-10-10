import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from reconcile import reconcile
from validate import validate

class HubTests(unittest.TestCase):
    def test_seed_data(self):
        self.assertTrue(validate())

    def test_duplicate_reports_do_not_auto_approve(self):
        reports = [
            {"proposal_id": "1", "assignment_id": "A", "field": "presentation_at", "proposed_value": "2027-03-12"},
            {"proposal_id": "2", "assignment_id": "A", "field": "presentation_at", "proposed_value": "2027-03-12"},
        ]
        out = reconcile(reports)
        self.assertEqual(out[0]["status"], "awaiting_authoritative_evidence")
        self.assertEqual(out[0]["report_count"], 2)
        self.assertFalse(out[0]["automatic_canonical_change"])

    def test_conflicts_not_resolved_by_majority(self):
        reports = [
            {"proposal_id": str(i), "assignment_id": "A", "field": "presentation_at", "proposed_value": "2027-03-12"} for i in range(3)
        ] + [{"proposal_id": "4", "assignment_id": "A", "field": "presentation_at", "proposed_value": "2027-03-19"}]
        out = reconcile(reports)
        self.assertEqual(out[0]["status"], "conflicting_reports")
        self.assertEqual(len(out[0]["alternatives"]), 2)
        self.assertTrue(out[0]["human_review_required"])

    def test_separate_presentation_and_submission_dates(self):
        reports = [
            {"proposal_id": "1", "assignment_id": "A", "field": "presentation_at", "proposed_value": "2027-03-12"},
            {"proposal_id": "2", "assignment_id": "A", "field": "submission_due_at", "proposed_value": "2027-03-05"}
        ]
        out = reconcile(reports)
        self.assertEqual(len(out), 2)
        self.assertNotEqual(out[0]["field"], out[1]["field"])

    def test_reject_unapproved_fields(self):
        with self.assertRaises(ValueError):
            reconcile([{"assignment_id": "A", "field": "secrets", "proposed_value": "x"}])

if __name__ == "__main__":
    unittest.main()
