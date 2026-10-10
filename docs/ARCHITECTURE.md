# Architecture and rollout

## One approved hub, separate private progress

- **This public GitHub repo:** canonical, approved coursework metadata, resources, verified AI-use rules, lessons learned, revision history and public conflict alerts.
- **Student-owned private space:** completion/submission, notes, study plans, preferences, last successful revision. Never another copied master deadline database.
- **GitHub Issues today:** change submission + human review.
- **Proposed Cloudflare Worker + D1 later:** short intake form/API, untrusted submission queue, AI grouping and draft reviewer decisions, authenticated multi-reviewer UI, audit trails, publication after approval.
- **AI editorial assistant:** extracts candidate field/value, groups duplicates, identifies conflicting reports, prepares summaries. Does **not** silently approve consequential changes, fabricate evidence, or bypass human review.

## Live status
| Capability | Status |
|---|---|
| Public read-only hub | Published |
| Machine-readable empty canonical catalogs | Implemented |
| GitHub issue submission template | Implemented |
| JSON validation GitHub Action | Implemented; executes when workflows are enabled |
| Reconciliation logic for normalized reports | Local prototype only |
| Cloudflare intake, D1, editor identities | Not built or deployed |
| GitHub writes triggered by approvals | Not built |
| Email or WhatsApp delivery | Not built |
| Canvas calendar or API | Explicitly out of scope |

## Security constraints
The public repository has no secrets or personal student data. For a later Worker, tokens live only in server-side secrets. Review actions must be authenticated, authorized and audited; a widely shared passcode cannot grant approval rights. Public forms must validate field allowlists, rate limit, reject credential-bearing URLs and untrusted code instructions, and avoid logging private inputs publicly. A model's summary is **not source verification**.
