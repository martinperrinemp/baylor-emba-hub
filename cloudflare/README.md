# Planned Cloudflare submission and review application (not deployed)

The GitHub Issue workflow is usable without Cloudflare. The proposed next release will add one Worker and a small D1 store for pending submissions, duplicate grouping, and reviewer audit events. The **canonical approved coursework stays in public GitHub**; D1 is a proposal queue, not a second copy of due dates.

Minimum implementation before launch:
- Authenticated reviewer accounts and roles (submitter, reviewer, admin); never a shared approval password.
- Reviewer actions: approve, reject, edit proposed field/value before approval, request evidence, and show immutable original submissions and audit events.
- A GitHub token scoped to this repository stored only in Cloudflare secrets; atomic revision/commit updates with conflict detection.
- Untrusted submission field allowlist, abuse controls, private evidence handling, and URL sanitation.
- Conflict detection independent of AI; AI may summarize, deduplicate and draft but never decide authoritative dates by vote.
- `data/manifest.json`, `data/changes.json` and `data/open-alerts.json` updated together upon approval, with notifications only after confirmed publication.

**Not yet built:** Worker routes, D1 schema and migrations, UI, GitHub commit integration, notification delivery. This directory is roadmap documentation, not a deployable app.
