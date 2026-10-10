# Change proposals and approvals

The public hub has **one canonical approved record**. GitHub Issues (and later a Cloudflare intake queue) accept untrusted reports; proposed changes are never automatically treated as true.

## Today (working first release)
1. Submit a [proposal issue](../.github/ISSUE_TEMPLATE/proposal.yml) with the exact course/assignment, affected field and suggested value. Exclude restricted screenshots, personal details or full course materials.
2. A volunteer checks the case with appropriate official evidence and determines whether the report duplicates another, is already current, or conflicts.
3. A repository maintainer publishes the approved change as a versioned Git commit or pull request. For date changes, preserve the previous value and write an entry to `data/changes.json`.
4. Any unresolved credible conflict is recorded in `data/open-alerts.json`, with the existing **approved** date kept intact. Label it unverified.
5. Agents reading the hub must show relevant unresolved conflicts before advising on affected deadlines.

## Intended Cloudflare review queue (not deployed)
- **Contributor:** submit suggestions, see safe public status.
- **Reviewer:** approve, reject, request evidence, or edit/override the proposed value with a written rationale.
- **Administrator:** add/remove reviewers, revoke access and manage configuration.
- Multiple reviewers can join later; reviewer identity and timestamps are logged in a **private** audit store. Do not put reviewer email addresses in public data.
- Consequential changes (official deadlines, presentation dates, AI permissions/restrictions) require a reviewer who has checked the source. Unverified or contradictory reports cannot be resolved by AI votes.
- Proposed updates should use a compare-and-swap revision check to avoid two reviewers silently overwriting each other. Every override preserves original submissions, reviewer notes and the prior canonical value.

## Reconciliation rules
For each report, normalize `(assignment_id, exact_field, proposed_value, timezone)` and preserve the original report separately. Group identical values; any different proposed values for the same field trigger `conflicting_reports`. Three identical reports from one rumor are **not** three authoritative sources. Source-based human confirmation is required. See [prototype](../scripts/reconcile.py) and [sample reports](../examples/conflicting-reports.json).

## Notification rules (future service)
- Approved material changes: versioned feed update, then optional opt-in email and WhatsApp-ready message. Only claim a notification was sent if a delivery service confirms it.
- Unresolved urgent conflict: publish a clearly labeled **unverified** alert and ask classmates to check the official source.
- Routine resource additions: daily digest rather than immediate interruption.
- Any assistant's ability to get new information depends on actually checking the hub or using a real scheduled connector.
