# AI-to-cohort submission service (proposal-only prototype)

**Source code published, but service NOT deployed.** Students do not need to navigate GitHub once they configure a compatible AI connector. This is a single backend for API-action and MCP-capable agents.

## What your classmates can say
"Professor moved our group presentation to October 23. Submit that update to the cohort."

Their connected AI should:
1. Retrieve the current assignment ID and clarify **presentation vs upload deadline**.
2. Ask for missing information rather than inventing an exact time.
3. Submit a proposal via the connected action `submitCohortProposal` or MCP tool `submit_cohort_proposal`.
4. Confirm **queued for review**, never claim the approved date changed until publication.

## Supported endpoints after deployment
- `POST /api/proposals`: receive proposal and return proposal ID and conflict status
- `GET /api/proposals/:id`: read pending/review status
- `GET /openapi.json`: API-action schema with deployed server URL
- `/mcp`: remote MCP endpoint exposing `submit_cohort_proposal` and `get_cohort_proposal_status`
- `GET /health`: basic status

Both write interfaces place items in the **same private D1 pending queue**. They never change the public GitHub repository. Immediate field-by-field grouping detects identical and conflicting reports but does **not** independently verify instructor evidence or schedule notifications. Those are later phases.

## Backup and emergency shutdown: prerequisite

**Do not open intake to classmates before [the owner-only backup and recovery checklist](../docs/BACKUP-AND-RECOVERY.md) is satisfied.** At least one independently verified private backup is required before first acceptance; seven daily restore points accumulate during the first week. Daily backups must cover approved GitHub files/history, pending D1 data and review/audit metadata (when implemented).

Both MCP and REST submissions now have a fail-closed server-side switch, `INTAKE_ENABLED`, default `false` in `wrangler.toml.example`. A verified owner changes it to `true` only after backups and the abuse-response procedure have been tested. Set to `false` and redeploy during an incident; the public read-only GitHub hub stays available. GitHub Issues are a separate fallback and must be disabled independently if abused.

**Status:** Emergency stop guard implemented in code and under unit test. Scheduled private backups, R2 bucket, alerting, and live restore testing are not yet built or enabled.

## Cloudflare owner setup
You need to deploy the Worker to your own Cloudflare account. No Cloudflare connection is available to this chat, so deployments and live testing require your action.

1. Clone `baylor-emba-hub` to your PC and open a terminal in `cloudflare/`.
2. Run `npm install`, then `npx wrangler login` to authorize Cloudflare.
3. Run `npx wrangler d1 create baylor-emba-proposals`.
4. Copy `wrangler.toml.example` to `wrangler.toml` and replace the placeholder database ID from step 3. **Do not commit secrets or a local .dev.vars file.**
5. Run `npx wrangler d1 migrations apply DB --remote`.
6. Generate **two independent random secrets** and set with `npx wrangler secret put SUBMISSION_TOKEN` (32+ characters), and `npx wrangler secret put RATE_LIMIT_SALT` (16+ characters).
7. Run `npm test` and `npm run check`, then `npx wrangler deploy` **with intake disabled**.
8. Complete the private backup deployment, first verified backup, and pause-switch test before enabling `INTAKE_ENABLED=true`. Open `https://YOUR-WORKER.workers.dev/health` and `https://YOUR-WORKER.workers.dev/openapi.json`; verify both respond. Test a fictional proposal in an isolated test queue.

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
