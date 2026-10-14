# Project handoff and build checklist

**Last user-confirmed milestone:** October 13, 2026 ~11:16 PM CDT (October 14 UTC), live cohort landing page viewed on Android phone. Other infrastructure checkpoints recorded below.

**CURRENT NEXT ACTION (Oct 14, 2026 ~04:42 AM CDT):** Owner explicitly confirmed **40 dates awaiting review are live** on the existing Android hub. In response we committed the next fast-pilot feature, a provisional **Reading & Prep** section sourced from the original workbook's second tab: **46 entries, 23 ENT 5342 and 23 MGT 5311**, zero QBA readings in that tab. Added `data/prep.json`, fixed allowlisted public read endpoint, mobile course/Upcoming/All filters, source notes and updated AI onboarding instructions. **Owner has not yet verified the new Reading & Prep section on the live Cloudflare site**; next ONE STEP: refresh `https://baylor-emba-proposals.martin-perrine-mp.workers.dev/`, confirm hub status shows `Prep items awaiting review: 46` and inspect the Reading & Prep list. Readings, dates and five public third-party URLs are student-prepared leads, NOT official confirmation. Site's reviewed assignments remain 0, knowledge revision remains 0, `INTAKE_ENABLED=false`, and no private student progress or Canvas URLs have been published. After UI check, prioritize official confirmation of the nearest-term key deadlines, AI policies and a small trusted classmate pilot. Independently pending: unattended backup/watchdog cycle, disabled Watchdog public URL, paused write smoke tests and safe missing-backup alert drill.

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
- [x] **Discord TEST delivery verified (owner, 2026-10-11 ~04:30 UTC).** The root cause of earlier failed cron was the webhook originally saved as a **build-time** secret; owner saved `DISCORD_WEBHOOK_URL` as a **Production runtime Secret**, retried direct smoke-test URL and confirmed it worked in Discord. Cron was independently observed firing at 04:16 and 04:21 UTC; delivery had failed only due to missing runtime secret. Original test used a temporary public workers.dev endpoint and a 5-minute cron.
- [x] **Private daily Watchdog configuration committed to GitHub**: Removed public test route from `watchdog/src/index.mjs` (`91e7aec`), disabled `workers_dev`, set `WATCHDOG_TEST_MODE="false"`, and replaced the 5-minute test cron with `0 12 * * *` (`b1cfe1a`). Existing production backup remains scheduled at `09:00 UTC`. The Watchdog now checks at **12:00 UTC daily** (07:00 CDT / 06:00 CST) and stays silent on healthy backups.
- [x] **Watchdog updated build deployed READY** (owner screenshot at ~2026-10-11 04:33 UTC): `baylor-emba-backup-watchdog` active deployment version `72d321c2`, commit message `Record Discord success, remove temporary endpoint and activate private daily watchdog; verify deployment`, status Ready. Source removes test route, sets `workers_dev=false`, `WATCHDOG_TEST_MODE=false`, daily cron `0 12 * * *`. Screenshot confirms active deployment, **not yet runtime trigger state**.
- [x] **Permanent daily Cron schedule active (owner confirmed 2026-10-11 ~04:37 UTC):** Watchdog Settings → Trigger events displays Daily instead of Every 5 minutes; source is `0 12 * * *` (12:00 UTC, 07:00 CDT/06:00 CST). No automatic daily run is claimed yet.
- [ ] **VERIFY private public-URL removal** on Watchdog → Domains: `workers.dev` and preview URL disabled in deployed configuration; no diagnostic endpoint should be reachable.
- [ ] **VERIFY first scheduled daily run** and safe missing-backup alert scenario. Production backup 09:00 UTC; Watchdog check 12:00 UTC. Direct Discord test succeeded, but unattended daily monitoring not yet observed.
- [ ] **VERIFY first automatic daily backup plus health check**: on or after first 09:00 UTC backup, confirm R2 contains a new complete GitHub ZIP/D1 SQL/manifest; after 12:00 UTC verify Watchdog scheduled invocation. A healthy day should send no Discord alert. Direct test delivery alone does not confirm end-to-end daily monitoring.
- [ ] **Test missing/invalid backup alert safely in isolation** without deleting or changing production backup objects; verify alert fires exactly once and owner receives it. Independent monitor-of-monitor is still a later hardening step. **Keep `INTAKE_ENABLED=false` until required safety and review gates are met.**
- [ ] Add full Git history and Issues/PR archival if a literal whole-system recovery guarantee is required; current snapshot + D1 supports basic redeployment but is not a complete audit/history backup.
- [ ] Test `INTAKE_ENABLED=false` blocks both REST and MCP submissions and public GitHub read access remains working. Test credential rotation as part of the disaster drill.
- [ ] Secure and test proposal submission for compatible students' AI assistants, ensuring they only create **pending** records until human approval.
- [ ] Build authenticated multiple reviewer approval/reject/edit/override audit UI, safe publishing to GitHub, and notifications of conflicts and approved changes.
- [ ] Manually import/verify public-safe Fall 2026 assignment dates and AI-use restrictions, keeping Canvas integration excluded.
- [ ] Implement and test student-owned Agent Continuity checkpoints (save confirmed progress, private export, resume new chat, refresh shared hub). Design/template published, automatic private sync not built.
- [ ] Finally authorize cohort onboarding only after the restore drill, backup monitoring, proper permissions, and change review controls are tested.

## Fast rollout milestone (October 13, 2026)

- [x] **Reuse proven GitHub → Cloudflare pipeline** rather than adding another database, domain, token, or worker. One public read-only mobile landing page under `cloudflare/public/{index.html,styles.css,app.js}`; planned user URL: `https://baylor-emba-proposals.martin-perrine-mp.workers.dev/`.
- [x] **Public read-only API committed** to existing paused proposal Worker: `cloudflare/src/public.mjs` strict JSON filename allowlist, fetches public GitHub canonical `data/` entries, 60-second cache, no private D1 reads or user data. `cloudflare/src/index.mjs` handles `GET /api/public/{filename}` before token-authenticated submit routing; `cloudflare/wrangler.toml` includes `[assets]` for static page and `run_worker_first` for API endpoints.
- [x] Public pilot displays reviewed/candidate status without pretending assignments are confirmed; copyable starter AI prompt; privacy guidance; GitHub Issue fallback (requires GitHub login); safe correction template; no login or personal data collection. User's own EMBA progress is not in public site.
- [x] Regression tests for public filename allowlist and safe failure plus `node --check` validation added to GitHub CI; **execution/passing status has not been confirmed** (GitHub combined status query returned no statuses at time of commit). Read [Fast pilot](FAST-PILOT.md).
- [x] **Public hub live on user's Android phone (Oct 13 ~11:16 PM CDT screenshot):** correct responsive landing page, live-looking hub status revision `0`, assignments `0`, alerts `0`, and **No reviewed assignment deadlines published yet** notice. The page clearly warns that official course instructions outrank this student resource. Root page and populated status UI verified; exact Cloudflare deployment version and individual `/health`/API route responses have not separately been checked.
- [ ] **Additional smoke tests**: check `/health`, `/api/public/manifest.json`, allowlist 404, and the intentionally paused write paths (`INTAKE_ENABLED=false`) before describing all backend checks as passed.
- [x] **Import original working master schedule as provisional**, NOT verified: 40 dated assignments safely de-identified, first student-oriented starter pack cross-checked, October date conflicts labeled. The page has been updated to show provisional source notices, upcoming vs all dates, 0 reviewed, and 40 pending review. This is a useful candidate planning calendar but cannot supersede Canvas.
- [x] **Owner confirmed 40 provisional dates live (2026-10-14 ~04:42 AM CDT).** Live mobile UI successfully shows the 40-entry imported master schedule.
- [x] **Add original 46-item Reading & Prep catalog in GitHub**: `data/prep.json` with 23 ENT and 23 MGT titles and prep/discussion dates; original personal statuses/study estimates, private Canvas file links and copyrighted full text excluded. Five public external links retained as unreviewed source links. No QBA reading records present in source.
- [x] **Prepare Reading & Prep UI**: same existing Cloudflare Worker/API allowlist, added responsive mobile cards and Upcoming/All + course filters, updated AI startup prompt and docs, and public-data validator/tests. GitHub commits made; live deployment is not yet confirmed.
- [ ] **Confirm Reading & Prep is live** on owner's mobile hub: status `Prep items awaiting review 46`, new `Prep` header link, and entries under All dates for ENT/MGT. If absent, inspect latest `baylor-emba-proposals` deployment; do not add another Worker.
- [ ] **Promote a vetted subset to verified shared metadata**: owner manually checks actual authoritative current syllabus/Canvas dates, individually approves explicit dates/AI rules, sets `last_verified_at`, updates manifest revision and changes.json. No fully verified assignments and no verified AI-use policies yet.
- [ ] Pilot with 2–3 classmates using one URL and simple ChatGPT/Claude/Gemini prompt, collect friction. Don't imply that every AI product has automatic website or write access.
- [ ] Implement low-friction no-GitHub classmate submission + review after verifying **private daily backup monitoring, emergency switch, abuse controls**, and owner authorization. No auto-publishing of student-reported dates. Private per-user continuity stays independently owned until authentic student sync exists.
- [ ] **Previous safety checks still pending:** independently verify Watchdog workers.dev URL disabled, first unattended backup + health check, and an isolated missing-backup alert. Nothing from the fast landing-page work changes existing backup permissions or schedules.

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

### Watchdog diagnostic, 2026-10-11 04:22 UTC

- Observability screenshot confirms Cron executions at 04:16 and 04:21 UTC. Both fail with `DISCORD_WEBHOOK_URL secret is not configured`. Cron is firing; the running Production Worker lacks the Discord secret.
- Next: inspect `baylor-emba-backup-watchdog` Production Settings → Variables and Secrets; verify exact secret name and type. If missing, add securely through Cloudflare; if present, investigate deployment environment before changing it. Do not paste webhook value in chat or GitHub.
- Direct test returned HTTP 500. Discord delivery and daily Watchdog remain unverified; temporary test endpoint and five-minute schedule are still active, and must be removed after test success.

### Critical fix identified, 2026-10-11 04:25 UTC

- Owner's screenshot shows `DISCORD_WEBHOOK_URL` was set as an encrypted **Builds → Variables and secrets** secret, under the `Build watch paths` and `API token` settings. Cloudflare documents build secrets are ONLY available at build time and **not** to the running Worker. This directly explains runtime log `DISCORD_WEBHOOK_URL secret is not configured`; Cron itself has already been confirmed executing.
- **Next single user step:** on `baylor-emba-backup-watchdog` Production → Settings, navigate to the top-level **Bindings / runtime Variables and Secrets** section, **not** Builds. Add `DISCORD_WEBHOOK_URL` as type **Secret** using original private Discord webhook URL and **Deploy**. Don't share the URL. Then reload the temporary direct test URL and check Discord. After success, immediately disable workers.dev temporary test endpoint, remove temp handler, set test mode false, and schedule the daily watchdog at 12:00 UTC. Remove the unnecessary build-time duplicate secret afterward if safe to do so.

### Runtime Discord secret now deployed, 2026-10-11 04:29 UTC

- Owner confirmed adding and deploying `DISCORD_WEBHOOK_URL` as a **Production runtime Secret**, separate from the earlier build-time secret.
- **Next immediate action:** open existing manual smoke-test URL `https://baylor-emba-backup-watchdog.martin-perrine-mp.workers.dev/__diagnostics/discord-smoke-test-20261011`, check browser response and receipt in private Discord `#backup-alerts`.
- **Critical temporary exposure:** workers.dev endpoint and five-minute cron/test mode are still in place for this test. After successful delivery, promptly revert public Worker URL / diagnostic fetch handler, set `WATCHDOG_TEST_MODE=false` and Cron to daily `0 12 * * *`, and verify deployment. No evidence of delivery as of this checkpoint.
