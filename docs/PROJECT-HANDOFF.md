# Project handoff and build checklist

**Last user-confirmed checkpoint: October 10, 2026 (US Central; October 11 UTC).**

This file is the durable handoff for a future AI conversation. **It is not a live connection to Cloudflare.** Confirm changing service status in the owner's dashboard before making claims or executing migrations. Do not confuse code published in GitHub with deployed, fully working features.

## Recovery prompt for a new chat

> Continue the Baylor EMBA Hub project at https://github.com/martinperrinemp/baylor-emba-hub. Read README.md, AGENTS.md, docs/PROJECT-HANDOFF.md, docs/BACKUP-AND-RECOVERY.md, backup/README.md and cloudflare/README.md. Check the latest GitHub files and ask me for a Cloudflare screenshot if needed. Continue from the first unconfirmed checklist item. Don't start over, connect Canvas, enable cohort submissions, change secrets, or declare backups working until verified. Walk me through Cloudflare one step at a time, browser-only.

## Principles, locked-in decisions

- Public repository: `martinperrinemp/baylor-emba-hub`. **No personal progress, grades, credentials, tokens, restricted course content, class rosters, confidential work files, or raw Canvas materials.**
- Entire cohort may read approved public metadata; every student manages private progress independently.
- **New locked requirement (Oct 10): student Agent Continuity.** Every cohort member must be able to resume their agent after chat-length limits using a student-owned PRIVATE checkpoint (confirmed task completions, current projects, preferences, last hub revision). Portable across compatible assistants. Never store filled personal data in this public repo; see [Agent Continuity](AGENT-CONTINUITY.md).
- **No Canvas integration at all**: no calendar feed, APIs, scraping, Duo workarounds, or automatic login. Authorized semester metadata is prepared by manual review.
- Multiple reviewers eventually approve/reject/edit/override proposals and leave an audit trail. AI consolidates duplicates and prepares suggestions but **cannot majority-vote official deadlines**.
- Classmates should be able to tell their own compatible AI assistant to submit proposed updates. One-time connection via remote MCP or REST action; GitHub Issues are fallback. AI submission is **not yet working end-to-end or open to classmates**.
- Important approval changes are published to GitHub's canonical data and a machine-readable change feed; agents must recheck fresh data. No automatic background awareness without a connected scheduler.
- **Mandatory prelaunch safety:** fail-closed intake, owner-only private backup separate from intake Worker, at least daily verified copies, rolling week of restore points, missed-backup alerts, and recovery drill.
- Deployment steps are browser-only through Cloudflare's Git integration. Keep TCG Radar and Baylor dashboard apps untouched.

## User-confirmed completed work

- [x] GitHub repo created **public** and ChatGPT's GitHub connection authorized to edit it.
- [x] Public starter hub published: README, AGENTS instructions, empty approved assignment catalog, resource candidates (including Baylor-branded PowerPoint templates), AI policy catalog (unverified/unknown), open alerts and changes feed, volunteer change issue form, validation and conflict-consolidation prototype.
- [x] Cloudflare GitHub integration confirmed after the GitHub app was granted access to the repository. Automatic build/deploy worked following a new GitHub commit.
- [x] Worker `baylor-emba-proposals` deployed and `/health` returned `status:online` in user's browser.
- [x] Proposal Worker remains configured with `INTAKE_ENABLED=false` in `cloudflare/wrangler.toml` (latest confirmed source; check active runtime before changes).
- [x] Cloudflare D1 database `baylor-emba-proposals` created and bound to proposal Worker as `DB`.
- [x] D1 migration executed successfully in Cloudflare Console. User's verification query showed `proposals`, `submission_counters`, and internal `_cf_KV` tables.
- [x] Private Cloudflare R2 bucket `baylor-emba-private-backups` created with public access disabled, according to user's screenshot.
- [x] R2 lifecycle rule `expire-old-backups` saved, deleting uploaded objects after eight days.
- [x] Separate Worker `baylor-emba-daily-backup` deployed successfully from GitHub `/backup` folder after removing invalid empty Workflow `schedules` configuration.
- [x] Backup Worker bindings verified in screenshot: `DAILY_BACKUP` → `baylor-emba-backup-workflow`, `PRIVATE_BACKUPS` → `baylor-emba-private-backups`.
- [x] Dedicated Cloudflare API token `baylor-emba-d1-backup` created by owner, scoped to their Cloudflare account, saved **as secret** `D1_EXPORT_TOKEN` on backup Worker. **Actual token value is never in this repository.**
- [x] First manual Workflow test was triggered. GitHub commit pin + ZIP archive/verification steps succeeded, but full D1 export failed with **HTTP 401**. Thus **no complete backup was confirmed**.
- [x] Owner subsequently changed token permission from **Account / D1 / Read** to **Account / D1 / Edit**, reported **“Updated!”**.
- [x] After the D1 token update, owner manually restarted the backup Workflow. The new attempt **failed at GitHub HEAD (HTTP 403)** before reaching the D1 export. Thus the new D1 permission is **not yet verified**.
- [x] Backup Worker source updated to require a **repository-scoped GitHub read-only token** (`GITHUB_BACKUP_TOKEN`) and to report GitHub rate-limit response headers without exposing secrets. Owner has **created a fine-grained GitHub token and confirmed saving it as a production Secret named `GITHUB_BACKUP_TOKEN` in the private backup Worker**. Deployment of latest code and success of the next full Workflow run are **not yet verified**.

## Immediate next step — do not skip

- [ ] **Verify backup Worker production deployment is current** and Settings → Runtime variables and secrets lists **both** `GITHUB_BACKUP_TOKEN` and `D1_EXPORT_TOKEN` as secrets (never reveal their values). New source commit included authenticated GitHub HEAD/archive requests; only then trigger a **new** Workflow instance (rather than retrying the stale instance) to test both authorization fixes.
- [ ] Run a fresh test Workflow, confirm the GitHub steps work and determine whether the earlier **D1 export 401** is resolved by the owner's D1 token permission change. If D1 still fails, investigate without requesting secrets.
- [ ] If export still returns HTTP 401, inspect API token scope/status, secret presence in the active deployment, Cloudflare API authorization, and error diagnostics without requesting token values. Distinguish permission, missing deployment secret, wrong resource ID, or API request shape.
- [ ] Successful Workflow must complete **all five** steps, including R2 D1 SQL and completed manifest. Verify private R2 objects `github-source.zip`, `d1-database.sql`, `manifest.json` in a single timestamped backup directory. GitHub ZIP alone is only a **partial** backup.
- [ ] Test restoring into an **isolated** temporary D1 database and validate recovered records/schema; test reading/reconstructing approved GitHub snapshot.
- [ ] Add complete Git history/issue metadata if required for the promised whole-system disaster recovery; current archive only captures the GitHub repository's file snapshot and D1, **not** full Git history, issues, reviewer identity/credentials, or Cloudflare settings.
- [ ] Add reliable owner-only missed/failed-backup alerts and a once-daily schedule. Check that daily jobs succeed and enough recovery points accumulate.
- [ ] Test that flipping `INTAKE_ENABLED=false` blocks **both REST and MCP** while public read access remains available. Rotate submission token as part of disaster drill.
- [ ] Configure and test secure proposal submission credentials; confirm sample AI clients can submit only **pending** changes (not approved updates).
- [ ] Build authenticated multi-reviewer approval/edit/reject and audit UI, safe GitHub approval publication, conflict notices and change notifications.
- [ ] Manually import/verify public-safe Fall 2026 course metadata and assignment-specific AI-use rules. Do not copy source course documents into this public repo.
- [ ] Implement and test the student-owned private checkpoint flow: save confirmed progress, create export, restart in fresh chat, fetch current hub and reconcile by stable assignment ID. Document limitations per AI provider. **Design and blank template published, automatic sync not built.**
- [ ] Evaluate optional authenticated per-student Cloudflare continuity storage later; do not couple it to shared class submissions, approvals, or backup bucket.
- [ ] Finally authorize cohort onboarding **only after** the owner-only backup and restore system and review access controls have been tested.

## Key links

- [Hub](https://github.com/martinperrinemp/baylor-emba-hub)
- [Submitted-change Worker source](../cloudflare/README.md)
- [Owner backup Worker source](../backup/README.md)
- [Recovery requirements](BACKUP-AND-RECOVERY.md)
- [Change review design](CHANGE-PROCESS.md)
- [Manual semester data import](SEMESTER-IMPORT.md)
- [Portable private Agent Continuity](AGENT-CONTINUITY.md)
- Deployed proposal Worker health endpoint: https://baylor-emba-proposals.martin-perrine-mp.workers.dev/health

## Handoff maintenance rule

After any meaningful user-confirmed milestone, update **this document in GitHub**. Mark only observed/tested work complete; keep `[ ]` for pending, failed or unverified steps. When unsure about Cloudflare runtime, say that a fresh screenshot or readout is needed. Never publish token values, personally identifying student information, or restricted course content.

**Note:** This public checklist is intentionally free of passwords, token strings and student-specific coursework/progress. Secrets remain exclusively in Cloudflare or another owner-controlled private vault. This file is a planning checkpoint, not an automated backup of cloud services.
