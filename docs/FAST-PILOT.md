# Fast pilot: launch the shared class hub without waiting for every feature

**Status:** A public, mobile-friendly cohort landing page has been added under `cloudflare/public/`, deployed by the existing `baylor-emba-proposals` GitHub → Cloudflare build once the owner confirms the new deployment. **Do not claim the page is live until its URL is opened and checked.** The intake Worker remains `INTAKE_ENABLED=false`; the page cannot accept automatic student submissions.

## Why this is faster

This follows the existing GitHub + Cloudflare delivery approach proved with the cohort's other prototype work: start with one easily shared URL and the essential functionality, commit small changes to GitHub, let Cloudflare deploy, then inspect the live page on a real device. Do **not** add a fourth Worker, login service, spreadsheet, domain, or duplicate database just for a landing page.

## Pilot v1: shareable public read-only hub

- The existing Worker serves responsive static assets at its root. It also exposes an **allowlisted**, read-only `/api/public/{filename}.json` endpoint that fetches public GitHub `data/` JSON, cached for up to 60 seconds. No D1 access, secrets, or writes for this endpoint.
- Students see reviewed assignment records when they exist, unreviewed resources clearly marked **candidate**, knowledge revision, urgent alerts, approved changes and a copyable AI startup prompt.
- Students can use their own AI assistant; the prompt instructs it to consult GitHub records fresh and disclose if it cannot fetch them. No promise that every AI product can auto-read a website or persist progress.
- Correcting a record currently uses the GitHub Issue form (GitHub account required) or a copyable safe correction template forwarded to a volunteer for manual review. The no-login submission UI and AI-to-queue workflow are **not yet enabled**.
- Student-specific completions and private continuity checkpoints are NOT sent to the shared site or D1. See `docs/AGENT-CONTINUITY.md`.
- All class records obey academic integrity, public metadata-only, and no Canvas integration/scraping. Sources stay official.

## Launch acceptance steps (owner can verify in browser)

1. Cloudflare → Workers & Pages → `baylor-emba-proposals` → Deployments: latest GitHub build **Ready** after the static-assets commit.
2. Open `https://baylor-emba-proposals.martin-perrine-mp.workers.dev/`. Confirm landing page loads on desktop/mobile, and the current empty assignment catalog is **clearly labeled not yet verified**.
3. Verify `/health` still reports online and `/api/public/manifest.json` gives valid JSON with `knowledge_revision`, while `/api/public/secret.json` returns 404. Any unknown `/api/public` filename must be refused.
4. **Confirm the proposal emergency stop remains off:** existing `INTAKE_ENABLED=false`, including both REST and MCP write routes. Do not authorize classmate submissions before review and monitor tests.
5. Review and approve a small set of **public-safe** assignments from the actual current course instructions (start with October and November). For each: `course_id`, safe title, presentation vs upload deadline, timezone, `verification_status`, short non-restricted source reference, and `last_verified_at`. Unknowns remain `null`. Student tracker snapshots can supply **candidates for owner review**, never automatically become approved public deadlines. Upload nothing from Canvas automatically.
6. Publish approved records in `data/assignments.json`, log revision + a change in `data/manifest.json` and `data/changes.json`. Reopen page: they should appear within approximately 60 seconds. Confirm the dates match current authoritative class instructions.
7. Pilot with 2–3 trusted classmates: send only the live URL, have each ask their own AI to use the hub, and collect friction notes. Reuse one GitHub → Cloudflare deployment pipeline. Never promise agent-tool integration where unsupported.

## Pilot v2: remove friction, without dropping approval

- Ship **public-safe proposal intake** only after an owner-tested pending queue, reasonable bot/spam controls, tested emergency pause, private backup freshness alerts and at least one review process. A shared public reviewer password is **not** acceptable.
- A modest **owner-first approval interface** that confirms actual evidence and manually updates canonical GitHub records is sufficient for an initial pilot. Multi-reviewer admin tools and automated publication can follow.
- Publish a portable private `continuity.json` generation / download workflow first. Do not build centralized storage of personal progress until authenticated student identities and data deletion/export protections exist.
- Add features when pilot users demonstrate the need. Avoid new Workers, complex notifications, duplicated data, and credentials unless an explicit capability requires them.

## Out of scope for first pilot

Native automatic app integration into every AI platform; a shared private student-progress database; unrestricted student writing; multi-reviewer administration; Canvas login, feeds, API access, scraping, or automatic import; copying case texts or private instructor correspondence.

**Rule:** The pilot may be shared as a public **read-only** reference once the landing page and authorized data are verified. Do not label it a complete submission or private continuity service.
