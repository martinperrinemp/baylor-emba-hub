# Architecture and rollout

## One approved hub, separate private progress

- **This public GitHub repo:** canonical, approved coursework metadata, resources, verified AI-use rules, lessons learned, revision history and public conflict alerts.
- **Student-owned private space:** completion/submission, notes, study plans, preferences, last successful revision. Never another copied master deadline database. [Agent Continuity](AGENT-CONTINUITY.md) requires portable checkpoints that survive chat limits.
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
| Cloudflare proposal intake, D1 schema, MCP and OpenAPI source | Code published; NOT deployed or tested against live Cloudflare |
| Cloudflare reviewer identities and approval UI | Not built |
| GitHub writes triggered by approvals | Not built |
| Email or WhatsApp delivery | Not built |
| Canvas calendar or API | Explicitly out of scope |
| Student-owned Agent Continuity | Design and blank template published; automatic personal sync not deployed |
| Owner-only seven-day rolling private backup | Architecture and runbook published; not deployed |
| Emergency intake pause for MCP and REST | Fail-closed code implemented; live Cloudflare test pending |

## AI-assisted submissions
The code under [Cloudflare](../cloudflare/README.md) provides a proposal-only HTTP API and a remote MCP tool interface designed for agents to submit changes automatically. It is not deployed. Each client needs an actual connector and secret configured. All submitted changes remain pending until a human reviewer approves. The public knowledge revision must not change simply because the service accepts a report.

## Disaster recovery and anti-spam
A fully private backup and emergency rollback process is a **launch prerequisite**, not an optional follow-up. See [backup and recovery runbook](BACKUP-AND-RECOVERY.md). At minimum: daily verified archive of GitHub data/history and D1 schema/data to an owner-only private R2 bucket, seven days of restore points, monitored backup failures, and isolation from the public intake Worker. A fail-closed `INTAKE_ENABLED` switch blocks both submission transports independently of GitHub's read-only public data. Cloudflare backup storage, daily schedule, live verification and recovery drills have **not been deployed yet**.

## Security constraints
The public repository has no secrets or personal student data. For a later Worker, tokens live only in server-side secrets. Review actions must be authenticated, authorized and audited; a widely shared passcode cannot grant approval rights. Public forms must validate field allowlists, rate limit, reject credential-bearing URLs and untrusted code instructions, and avoid logging private inputs publicly. A model's summary is **not source verification**.
