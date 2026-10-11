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
- [x] Owner confirmed **both backup Worker secrets present and latest deployment Ready**, then triggered a new Workflow. Authenticated GitHub HEAD succeeded; GitHub ZIP archive step errored with a Cloudflare Workers `TypeError`: unsupported `redirect: "error"`. Fixed source by using supported `redirect: "follow"` **only for validated codeload.github.com download URL without forwarding Authorization**, commit `3319bb8`. The user later confirmed the corrected build was Ready.
- [x] **FIRST COMPLETE BACKUP WORKFLOW VERIFIED (2026-10-11 02:42 UTC, screenshot):** a fresh `baylor-emba-backup-workflow` instance showed **Completed, 5/5 steps** in approximately four seconds. Both GitHub commit ZIP and D1 SQL exported, read back and hash-verified by the Workflow; backup manifest step completed. This demonstrates that the GitHub and D1 credentials now worked in that run. Private R2 object listing and a full restore drill have **not yet been independently verified**.

## Immediate next step — do not skip

- [x] **R2 backup objects verified (2026-10-11 02:46 UTC screenshot)** in the completed-run folder `daily/2026-10-11/2026-10-11T02-42-44.702Z-…`: `d1-database.sql` (650 B), `github-source.zip` (63 KB), and `manifest.json` (1.01 KB). Screenshots confirm all three exist together and the Workflow reported 5/5 completed. SQL import and isolated restoration **have not yet been tested**; manifest content is not yet independently inspected.
- [x] Owner created a **separate** temporary D1 restore database named `baylor-emba-restore-test` (user confirmed). Production database `baylor-emba-proposals` remains unchanged.
- [x] **Owner executed the SQL backup in the temporary restore database** `baylor-emba-restore-test` (confirmed at ~2026-10-11 03:00 UTC). Previous empty-schema screenshots preceded the actual SQL execution and were therefore expected, not a failed restore. No production database changes requested.
- [x] **Isolated D1 schema restore VERIFIED (2026-10-11 ~03:01 UTC screenshot):** user executed the actual R2 backup SQL in **temporary** `baylor-emba-restore-test` database and the follow-up `SELECT type, name FROM sqlite_master ORDER BY type, name;` displayed tables `proposals`, `submission_counters` and index `proposals_target_pending_idx` (plus normal `sqlite_autoindex` and Cloudflare `_cf_KV`). Production was not the restore target. The source database had no user-submitted rows, so actual row-level data restoration is **not** verified yet.
- [x] **GitHub ZIP file recovery check verified (user confirmed 2026-10-11 ~03:05 UTC):** downloaded the completed R2 backup's `github-source.zip`, opened it using Windows and confirmed the expected source folders and files were present. This verifies a readable **file snapshot** only; full Git commit history, issues/PRs, Cloudflare configuration and credentials are not contained in this ZIP.
- [x] **Daily schedule added to GitHub source:** `backup/wrangler.toml` now has `[[workflows]] schedules = ["0 9 * * *"]`, supported by Cloudflare for recurring Workflows (09:00 UTC = 04:00 CDT / 03:00 CST). Commit `c132615`. This **does not establish that a scheduled run has occurred yet**; owner must verify Cloudflare's latest deployment and schedule, then check the first automatic instance the next morning.
- [x] **Scheduled daily backup deployed and schedule visible in Cloudflare (user confirmed 2026-10-11 ~03:10 UTC).** Backup Worker latest build Ready; owner sees `baylor-emba-backup-workflow` daily schedule `0 9 * * *` (09:00 UTC). This verifies the schedule is configured, **not that a scheduled run has executed or succeeded yet**.
- [ ] **Verify first automatic run after 09:00 UTC:** Check Cloudflare Workflow for successful scheduled instance and private R2 completed manifest + D1 SQL + ZIP for the date. Eight-day R2 expiration configured; accumulate at least seven verified daily restore points.
- [x] **Cloudflare built-in alert search completed**: Owner checked Alerts → Create an Alert and searched `workflow`; **no Workflow-related alert types appeared** in their dashboard. Do not assume there is a suitable built-in failure notification.
- [ ] **Build and test private automatic backup freshness monitor:** independent Cloudflare scheduled Worker checks private R2 after the 09:00 UTC backup for a *fresh* complete `manifest.json`, referencing both GitHub ZIP and D1 SQL; alerts **only the owner** if missing/failed, with a tested alert and no flooding. **User confirmed they do NOT manage a domain in Cloudflare DNS** (Oct 10, 2026), so do not assume Cloudflare Email Service is available. **Notification provider selected by owner: Discord** (user confirmed they have Discord). **Owner confirmed private Discord `backup-alerts` channel AND incoming webhook created** (2026-10-10 US Central). **The webhook URL is not in chat or GitHub.** Owner-only watchdog source code, tests, Wrangler config and browser-only instructions are now published under [`watchdog/`](../watchdog/README.md). **Backup watchdog Worker deployed successfully** (owner supplied Cloudflare build log at 2026-10-11 03:39:58 UTC). Worker `baylor-emba-backup-watchdog`, version `e82b1b05-682d-4feb-a390-f76b5dc1caf3`, has R2 binding `PRIVATE_BACKUPS` → private `baylor-emba-private-backups` and `WATCHDOG_TEST_MODE=false`. Wrangler reported `No targets deployed` as expected because cron and public URL are intentionally disabled. **User confirmed Discord webhook URL saved as Cloudflare encrypted Worker secret `DISCORD_WEBHOOK_URL` (2026-10-11 ~03:42 UTC).** At 03:43 UTC, source `watchdog/wrangler.toml` updated for a temporary 5-minute cron (`*/5 * * * *`) with `WATCHDOG_TEST_MODE="true"`, which should send a plainly labeled Discord TEST message and write a private R2 deduplication marker. **Test config deployment confirmed Ready by owner at ~03:46 UTC; no Discord alert received yet as of 03:50:55 UTC.** User screenshot at ~03:52 UTC confirms `baylor-emba-backup-watchdog` **Cron Trigger visible**: runs every 5 minutes; next event scheduled `2026-10-11 03:55 UTC` (10:55 PM CDT). This verifies scheduling is configured, **not that execution or Discord delivery succeeded**. **No Discord TEST message received as of ~03:55 UTC.** Owner screenshot at ~03:57 UTC shows Cloudflare Worker **Observability is Disabled**, so earlier Cron errors are not yet visible; this is not proof that Cron failed. Next: enable Observability for watchdog (avoid consenting to unexpected billing), use Live view to capture the next 5-minute cron execution and specific error/success. Do not modify secret or schedule on speculation. Do not mark Discord delivery verified yet. After owner confirms a labeled TEST Discord message, immediately replace temporary cron with daily `0 12 * * *`, set test mode false, and confirm production schedule active. Credentials belong in private Worker secrets, never GitHub. See [BACKUP-MONITORING.md](BACKUP-MONITORING.md). Do not open submissions until monitoring is tested.
- [ ] Add full Git history and Issues/PR archival if a literal whole-system recovery guarantee is required; current snapshot + D1 supports basic redeployment but is not a complete audit/history backup.
- [ ] Test `INTAKE_ENABLED=false` blocks both REST and MCP submissions and public GitHub read access remains working. Test credential rotation as part of the disaster drill.
- [ ] Secure and test proposal submission for compatible students' AI assistants, ensuring they only create **pending** records until human approval.
- [ ] Build authenticated multiple reviewer approval/reject/edit/override audit UI, safe publishing to GitHub, and notifications of conflicts and approved changes.
- [ ] Manually import/verify public-safe Fall 2026 assignment dates and AI-use restrictions, keeping Canvas integration excluded.
- [ ] Implement and test student-owned Agent Continuity checkpoints (save confirmed progress, private export, resume new chat, refresh shared hub). Design/template published, automatic private sync not built.
- [ ] Finally authorize cohort onboarding only after the restore drill, backup monitoring, proper permissions, and change review controls are tested.

## Key links

- [Hub](https://github.com/martinperrinemp/baylor-emba-hub)
- [Submitted-change Worker source](../cloudflare/README.md)
- [Owner backup Worker source](../backup/README.md)
- [Recovery requirements](BACKUP-AND-RECOVERY.md)
- [Backup monitoring specification](BACKUP-MONITORING.md)
- [Change review design](CHANGE-PROCESS.md)
- [Manual semester data import](SEMESTER-IMPORT.md)
- [Portable private Agent Continuity](AGENT-CONTINUITY.md)
- Deployed proposal Worker health endpoint: https://baylor-emba-proposals.martin-perrine-mp.workers.dev/health

## Handoff maintenance rule

After any meaningful user-confirmed milestone, update **this document in GitHub**. Mark only observed/tested work complete; keep `[ ]` for pending, failed or unverified steps. When unsure about Cloudflare runtime, say that a fresh screenshot or readout is needed. Never publish token values, personally identifying student information, or restricted course content.

**Note:** This public checklist is intentionally free of passwords, token strings and student-specific coursework/progress. Secrets remain exclusively in Cloudflare or another owner-controlled private vault. This file is a planning checkpoint, not an automated backup of cloud services.
