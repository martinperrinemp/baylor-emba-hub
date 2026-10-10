# Reviewer checklist

1. Check reporter's suggested record, exact field, original value, desired value and date/timezone.
2. Compare similar open reports. Mark duplicates but preserve individual reports; flag any contradictory dates.
3. Review authoritative evidence without copying private documents or tokens into GitHub. Verify whether the change concerns a presentation, submission, or suggested study milestone.
4. Record a concise decision rationale and source type, not identifiable student details.
5. If correct, update one canonical field, append an approved change record, and bump the manifest revision in the same PR/commit. If not proven, keep the original and log an unresolved alert when urgent.
6. Before merging, run `python scripts/validate.py` and `python -m unittest discover -s tests`.
7. Check that the change feed contains the old and new values and that every relevant open alert is closed/updated if resolved.
8. Confirm publication, then notify the cohort through the channels actually enabled. Never state notifications were delivered merely because a template was generated.

Reviewers can be added later through GitHub permissions now, and through an authenticated Cloudflare review interface after that service exists. The initial public repository must not store reviewer contact information.
