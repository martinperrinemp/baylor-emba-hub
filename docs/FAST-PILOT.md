# Fast pilot: launch the shared class hub without waiting for every feature

**Status (2026-10-13):** Public mobile landing page **visually verified LIVE on owner's Android** at `baylor-emba-proposals.martin-perrine-mp.workers.dev`. The original Fall 2026 Excel master tracker and cohort starter pack were recovered, and **40 dated course-wide deliverables have been imported as `needs_verification` candidates** (two with `conflicted` status). They are displayed transparently as provisional, not approved or automatically verified. `knowledge_revision` remains `0` and `INTAKE_ENABLED=false` keeps agent writes paused. Personal status, teammate names, and private Canvas links were excluded.

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
2. **Completed:** Owner opened live mobile hub and confirmed responsive UI and public status. After this master import, reopen the hub and confirm it now shows **40 provisional dates**, including flagged conflicting DoorDash submission date and ENT peer evaluation, plus **0 reviewed assignments**. Use 'Upcoming' and 'All dates' filters. Do not claim current published data formally verified.
3. Verify `/health` still reports online and `/api/public/manifest.json` gives valid JSON with `knowledge_revision`, while `/api/public/secret.json` returns 404. Any unknown `/api/public` filename must be refused.
4. **Confirm the proposal emergency stop remains off:** existing `INTAKE_ENABLED=false`, including both REST and MCP write routes. Do not authorize classmate submissions before review and monitor tests.
5. Review and approve a small set of **public-safe** assignments from the actual current course instructions (start with October and November). For each: `course_id`, safe title, presentation vs upload deadline, timezone, `verification_status`, short non-restricted source reference, and `last_verified_at`. Unknowns remain `null`. Student tracker snapshots can supply **candidates for owner review**, never automatically become approved public deadlines. Upload nothing from Canvas automatically.
6. Publish approved records in `data/assignments.json`, log revision + a change in `data/manifest.json` and `data/changes.json`. Reopen page: they should appear within approximately 60 seconds. Confirm the dates match current authoritative class instructions.
7. Pilot with 2–3 trusted classmates: send only the live URL, have each ask their own AI to use the hub, and collect friction notes. Reuse one GitHub → Cloudflare deployment pipeline. Never promise agent-tool integration where unsupported.

## Master tracker import notes (October 13)

- Original source: `EMBA_Fall_2026_Tracker.xlsx`, **40 dated deliverables** and one undated internal team kickoff. Also checked the sanitized cohort-oriented `Baylor_Dallas_EMBA_Cohort_Starter_Pack_Fall_2026.docx` prepared September 26 and a subsequent private October 9 continuity summary.
- Imported exactly **40 course-wide dated records** to `data/assignments.json`: ENT 5342 (10), MGT 5311 (19), QBA 5330 (11). The undated internal kickoff was excluded. No team-member names, private meeting plans, completion/submission statuses, case texts, or Canvas file URLs were copied.
- All `verification_status` values remain `needs_verification`, except two `conflicted` records. `last_verified_at` is `null`, `knowledge_revision` stays `0`. This is a **provisional class calendar**, not a claim of official confirmation.
- **DoorDash:** Original tracker lists case slide/description deadline Oct 7 at 5 PM; later cohort starter says presentation moved to Oct 13, and owner confirms it took place that day. Published candidate separates presentation `2026-10-13 6 PM CDT` from `submission_due_at: null`; the changed/unknown upload deadline must not be invented.
- **ENT peer evaluation:** Original tracker lists Oct 10; newer private continuity lists Oct 15 at 11:59 PM. Published provisional Oct 15 candidate **flagged conflict** until current official course instructions are rechecked.
- Students can start using their own AI with the hub's starter prompt now, **provided they understand provisional dates are not authoritative** and course syllabi/Canvas remain binding. A full class launch and accepting public correction submissions still require the previously documented tests/approval controls.

## Pilot v2: remove friction, without dropping approval

- Ship **public-safe proposal intake** only after an owner-tested pending queue, reasonable bot/spam controls, tested emergency pause, private backup freshness alerts and at least one review process. A shared public reviewer password is **not** acceptable.
- A modest **owner-first approval interface** that confirms actual evidence and manually updates canonical GitHub records is sufficient for an initial pilot. Multi-reviewer admin tools and automated publication can follow.
- Publish a portable private `continuity.json` generation / download workflow first. Do not build centralized storage of personal progress until authenticated student identities and data deletion/export protections exist.
- Add features when pilot users demonstrate the need. Avoid new Workers, complex notifications, duplicated data, and credentials unless an explicit capability requires them.

## Out of scope for first pilot

Native automatic app integration into every AI platform; a shared private student-progress database; unrestricted student writing; multi-reviewer administration; Canvas login, feeds, API access, scraping, or automatic import; copying case texts or private instructor correspondence.

**Rule:** The pilot may be shared as a public **read-only** reference once the landing page and authorized data are verified. Do not label it a complete submission or private continuity service.
