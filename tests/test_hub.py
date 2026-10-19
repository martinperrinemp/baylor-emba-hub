import sys
import json
import shutil
import tempfile
import unittest
from unittest.mock import patch
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from reconcile import reconcile
from validate import validate

class HubTests(unittest.TestCase):
    def test_seed_data(self):
        self.assertTrue(validate())

    def validate_prep_change(self, **changes):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(ROOT / "data", root / "data")
            path = root / "data/prep.json"
            prep = json.loads(path.read_text())
            record = next(x for x in prep["records"] if x["course_id"] == "QBA 5330")
            record.update(changes)
            path.write_text(json.dumps(prep))
            with patch("validate.ROOT", root):
                return validate()

    def test_qba_class_session_date_and_public_reading_are_valid(self):
        self.assertTrue(self.validate_prep_change(
            date_meaning="class_session_discussion_date_only_NOT_a_canvas_submission_deadline",
            external_resource_url="https://joshdp34.github.io/QBA/week_01_01.html",
        ))

    def test_prep_rejects_submission_or_unknown_date_meanings(self):
        for meaning in ("submission_deadline", "unknown", None):
            with self.subTest(meaning=meaning), self.assertRaises(AssertionError):
                self.validate_prep_change(date_meaning=meaning)

    def test_prep_rejects_unapproved_or_private_reading_links(self):
        for url in (
            "http://joshdp34.github.io/QBA/week_01_01.html",
            "https://joshdp34.github.io.evil.example/QBA/week_01_01.html",
            "https://joshdp34.github.io/other-course/reading.html",
            "https://joshdp34.github.io@evil.example/QBA/week_01_01.html",
            "https://baylor.instructure.com/courses/123/files/456",
        ):
            with self.subTest(url=url), self.assertRaises(AssertionError):
                self.validate_prep_change(external_resource_url=url)

    def test_prep_still_rejects_private_progress(self):
        with self.assertRaises(AssertionError):
            self.validate_prep_change(personal_status="Submitted")

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
