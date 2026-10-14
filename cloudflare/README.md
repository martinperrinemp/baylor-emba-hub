# AI-to-cohort submission service (proposal-only prototype)

**Service deployed with cohort submissions intentionally PAUSED** (`INTAKE_ENABLED=false`). A public read-only landing page and public GitHub data endpoint have now been added to the existing Worker; their live deployment must be confirmed by the owner. Students do not yet have a working authorized AI submission connector. When the owner eventually opens and tests intake, compatible clients can submit proposals to the D1 pending queue without navigating GitHub.

## What your classmates can say
"Professor moved our group presentation to October 23. Submit that update to the cohort."

Their connected AI should:
1. Retrieve the current assignment ID and clarify **presentation vs upload deadline**.
2. Ask for missing information rather than inventing an exact time.
3. Submit a proposal via the connected action `submitCohortProposal` or MCP tool `submit_cohort_proposal`.
4. Confirm **queued for review**, never claim the approved date changed until publication.

## Existing public and protected endpoints
- `POST /api/proposals`: receive proposal and return proposal ID and conflict status
- `GET /api/proposals/:id`: read pending/review status
- `GET /openapi.json`: API-action schema with deployed server URL
- `/mcp`: remote MCP endpoint exposing `submit_cohort_proposal` and `get_cohort_proposal_status`
- `GET /health`: basic status
- `GET /`: public mobile-friendly cohort launch page (new, live verification pending)
- `GET /api/public/{filename}`: strictly allowlisted, read-only data from public GitHub (new, live verification pending); no D1 access

Both write interfaces place items in the **same private D1 pending queue**. They never change the public GitHub repository. Immediate field-by-field grouping detects identical and conflicting reports but does **not** independently verify instructor evidence or schedule notifications. Those are later phases.

## Backup and emergency shutdown: prerequisite

**Do not open intake to classmates before [the owner-only backup and recovery checklist](../docs/BACKUP-AND-RECOVERY.md) is satisfied.** At least one independently verified private backup is required before first acceptance; seven daily restore points accumulate during the first week. Daily backups must cover approved GitHub files/history, pending D1 data and review/audit metadata (when implemented).

Both MCP and REST submissions now have a fail-closed server-side switch, `INTAKE_ENABLED`, default `false` in `wrangler.toml.example`. A verified owner changes it to `true` only after backups and the abuse-response procedure have been tested. Set to `false` and redeploy during an incident; the public read-only GitHub hub stays available. GitHub Issues are a separate fallback and must be disabled independently if abused.

**Status:** Emergency stop guard implemented in code and under unit test. Scheduled private backups, R2 bucket, alerting, and live restore testing are not yet built or enabled.

## Cloudflare owner setup: browser-first GitHub deployment

No repository download or local software is required for the initial deployment.

**Stage 1: safe deployment, intake paused**
1. In Cloudflare go to **Workers & Pages** → **Create application** → **Import a repository**.
2. Connect GitHub if necessary, and select `martinperrinemp/baylor-emba-hub`.
3. Set the Worker name to `baylor-emba-proposals` (matching `cloudflare/wrangler.toml`). Set **root directory** to `cloudflare` and build/deploy command to `npm run deploy` if Cloudflare requests one.
4. Deploy. The committed Wrangler configuration keeps `INTAKE_ENABLED=false`; there are **no database credentials** or active submissions at this stage.
5. Confirm only `/health` and `/openapi.json` respond. Do not invite classmates or enable intake.

**Stage 2: protected pending queue**
1. In Cloudflare's **D1 SQL Database** area, create database `baylor-emba-proposals`.
2. Add a D1 binding to the Worker named `DB`, targeting the new database. Keep the Wrangler config consistent with dashboard configuration when updating code/deploying.
3. Apply SQL migration `migrations/0001_create_proposals.sql` in the D1 dashboard SQL editor or via a controlled automation; verify tables and indexes.
4. Configure submission-only `SUBMISSION_TOKEN` and independent `RATE_LIMIT_SALT` as **Cloudflare Worker secrets** (never put their values into public GitHub or chat).
5. Run a paused-intake smoke test; do not enable intake until safe private backups exist.

**Stage 3: verified private backup and disaster recovery**
1. Provision a private, owner-only R2 backup destination and independent scheduled backup process for D1, GitHub history/content, and approval records.
2. Enable daily backup confirmation, seven daily restore points, failure alerting, and restore tests per [runbook](../docs/BACKUP-AND-RECOVERY.md).
3. Only after backups and access controls pass acceptance tests may the owner set `INTAKE_ENABLED=true`, redeploy, and test fictional change submissions.

For advanced development, local Wrangler remains optional. The archived `wrangler.toml.example` is a CLI-oriented template; `wrangler.toml` is the active browser-first config.

## Connect AI clients
- Compatible remote MCP agents: connect to `https://YOUR-WORKER.workers.dev/mcp`. Configure the Bearer submission token **privately in the connector**, not in the user's prompt.
- REST / OpenAPI agents: import `https://YOUR-WORKER.workers.dev/openapi.json`, configure Bearer authentication privately, and permit the proposal tool.
- Clients without MCP or action support **cannot submit automatically**; use the [GitHub form](../.github/ISSUE_TEMPLATE/proposal.yml) as a fallback.

The initial token is submission-only, but it is cohort-shared, so rate limiting, eventual token rotation, and reviewer controls are needed. It does **not** identify individual classmates. Do not hand out reviewer or GitHub administrative credentials. The public repository is freely readable.

## What is deliberately unfinished
- Authenticated multi-reviewer web dashboard for approve/reject/edit/override
- Human evidence-review workflow connected to approved GitHub commits
- Email/WhatsApp alerts, scheduled AI summaries and daily digests
- Production Cloudflare/MCP client compatibility tests and OAuth per student
- Automated platform-specific setup for ChatGPT/Claude/Gemini
- Canvas calendar/API integration, which is **permanently excluded**

### Security and academic integrity
Only submit a safe paraphrase and the needed assignment field. Never include raw private Canvas content, instructor correspondence, full readings/cases, grades, emails, tokens, or Baylor work records. The data validator rejects common sensitive patterns but is not a replacement for student discretion. A suggestion can never establish a confirmed deadline without official evidence and review.

The test suite exercises proposal validation, duplicate retries, and conflict cases. Unit tests do not prove that deployed Cloudflare D1, Workers bundling, remote MCP, or any specific AI client are working. Test those before cohort-wide rollout.

<!-- Cloudflare Git auto-build verification: 2026-10-10. Intake remains disabled. -->

<!-- Cloudflare Git trigger verification after GitHub app authorization, 2026-10-10. No runtime changes. -->
