# Fast pilot: launch the shared class hub without waiting for every feature

**Status (2026-10-13):** Public mobile landing page **visually verified LIVE on owner's Android** at `baylor-emba-proposals.martin-perrine-mp.workers.dev`. The original Fall 2026 Excel master tracker and cohort starter pack were recovered, and **40 dated course-wide deliverables** plus **46 course-wide ENT/MGT Reading & Prep references** have been imported as provisional candidates (two date records have `conflicted` status). They are displayed transparently as provisional, not approved or automatically verified. `knowledge_revision` remains `0` and `INTAKE_ENABLED=false` keeps agent writes paused. Personal status, teammate names, and private Canvas links were excluded.

## October 17 academic-data expansion (supersedes older import counts below)

The student supplied two official-looking Baylor program and Fall course timetable PDFs, the six QBA module Read/Watch lists, and updated Canvas assignment-list transcripts for all three Fall courses. **20 program class dates/weekends**, 16 session/course slots, travel events and payment due dates were captured in public **metadata-only** `data/program-calendar.json`. There are now **104 prep records** (ENT 23 + MGT 23 + QBA 58), plus **55 active assignments** with three prior grouped QBA readiness placeholders archived as superseded (58 raw). Individual QBA Week 1–11 readiness quizzes are now separate and student-transcribed dates have been reconciled. See [latest project handoff](PROJECT-HANDOFF.md) and [public program calendar data](../data/program-calendar.json).

**Read-only feature added in code:** program-calendar section, Fall 2026 course blocks and QBA Module filtering. **Next verify** Cloudflare deployed state and phone rendering after merge. The source data is still **not independently reviewer-approved** and shared knowledge revision remains 0; public publication is a transparent student-supplied candidate reference, not a guarantee that every current Canvas task is listed. Never publish students' submitted dates, grades or private status. Older sections below describe the previous October 13/14 state and are historical, not the current counts.

## Updated priority: private AI Projects, not personal databases (decision October 16, 2026)

The **student experience** is a personal ChatGPT or Claude Project with one ongoing **Progress & Weekly Planning** chat. A student explicitly confirms progress; their AI makes a short **CURRENT EMBA PROGRESS** checkpoint, which the student saves/updates in private Project knowledge when available. In a new chat the AI should retrieve that checkpoint, or ask the student to paste it. No score tracking, mandatory workbook, personal GitHub repo, Zero Trust account, private D1, OAuth/MCP sync or automatic reminders for this pilot. See [Roadmap](ROADMAP.md) and [copy/paste pilot tests](AI-PROJECT-PILOT.md).

**First tests, before coding:** ChatGPT Free and Claude Free: confirm finished-versus-submitted status, generate and explicitly save a checkpoint, create new chat in Project, recover correct statuses, then revise/save/retest. Record which save controls actually exist, and do not claim autosave. If saving source cannot be done reliably, use a private copy/paste checkpoint fallback. Public Hub remains source of *shared candidate data only*, not grades or private work status.

**Pilot reliability bottleneck:** verify all assignments/quizzes/readings for the next 2–4 weeks and the upcoming class weekend against authoritative current course instructions, especially hidden module quizzes. Student-provided file or syllabus summaries can omit new Canvas tasks. A 24–48-hour early finish target is planning guidance, not an actual instructor deadline or reminder notification. No missing task can be treated as evidence that no task exists.

## Why this is faster

This follows the existing GitHub + Cloudflare delivery approach proved with the cohort's other prototype work: start with one easily shared URL and the essential functionality, commit small changes to GitHub, let Cloudflare deploy, then inspect the live page on a real device. Do **not** add a fourth Worker, login service, spreadsheet, domain, or duplicate database just for a landing page.

## Pilot v1: shareable public read-only hub

- The existing Worker serves responsive static assets at its root. It also exposes an **allowlisted**, read-only `/api/public/{filename}.json` endpoint that fetches public GitHub `data/` JSON, cached for up to 60 seconds. No D1 access, secrets, or writes for this endpoint.
- Students see provisional coursework deadlines and Reading & Prep, resource verification labels, knowledge revision, urgent alerts, approved changes and a copyable AI startup prompt. Neither the preparation date nor an unverified due date is presented as officially confirmed.
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
7. First run the [AI Project pilot](AI-PROJECT-PILOT.md) using an owner's private progress and genuine ChatGPT Free/Claude Free accounts. After verifying upcoming official course data, pilot with 2–3 trusted classmates: share the public URL and setup guide, ask them to test checkpoint recovery privately, and collect friction notes **without collecting or publishing private progress**. Never promise agent-tool integration where unsupported.

## Master tracker import notes (October 13)

- Original source: `EMBA_Fall_2026_Tracker.xlsx`, **40 dated deliverables** and one undated internal team kickoff. Also checked the sanitized cohort-oriented `Baylor_Dallas_EMBA_Cohort_Starter_Pack_Fall_2026.docx` prepared September 26 and a subsequent private October 9 continuity summary.
- Imported exactly **40 course-wide dated records** to `data/assignments.json`: ENT 5342 (10), MGT 5311 (19), QBA 5330 (11). The undated internal kickoff was excluded. No team-member names, private meeting plans, completion/submission statuses, case texts, or Canvas file URLs were copied.
- All `verification_status` values remain `needs_verification`, except two `conflicted` records. `last_verified_at` is `null`, `knowledge_revision` stays `0`. This is a **provisional class calendar**, not a claim of official confirmation.
- **DoorDash:** Original tracker lists case slide/description deadline Oct 7 at 5 PM; later cohort starter says presentation moved to Oct 13, and owner confirms it took place that day. Published candidate separates presentation `2026-10-13 6 PM CDT` from `submission_due_at: null`; the changed/unknown upload deadline must not be invented.
- **ENT peer evaluation:** Original tracker lists Oct 10; newer private continuity lists Oct 15 at 11:59 PM. Published provisional Oct 15 candidate **flagged conflict** until current official course instructions are rechecked.
- Students can start using their own AI with the hub's starter prompt now, **provided they understand provisional dates are not authoritative** and course syllabi/Canvas remain binding. A full class launch and accepting public correction submissions still require the previously documented tests/approval controls.

## Reading & Prep import (October 14)

- Original spreadsheet's **Reading & Prep** tab lists 46 materials: **23 ENT 5342** and **23 MGT 5311**. There is no dedicated QBA preparation/reading list in that tab; this is a source gap, not proof that QBA has no reading requirements.
- Imported only titles, modules, course codes, the original purpose/context, preparation/discussion dates, and five public third-party links labeled **not rechecked**. The original personal progress flags, study-hour estimates, individual notes, internal Canvas links, and copyrighted cases/article contents were excluded.
- Two historical “waiting for instructor” records are kept as **status at the time of original tracker**, not a current availability claim. The original short/truncated titles remain flagged for verification.
- The hub adds **Reading & Prep** with Course and Upcoming/All filters and source notes. A classmate can now use the public hub for a tentative prep plan, but the current syllabus/Canvas instructions remain authoritative.
- The shared manifest remains at **revision 0** because no item has been independently verified and approved as canonical.
- On October 14 the owner **confirmed the Reading & Prep section loads on mobile**. QBA reading references remain an explicitly deferred source gap; the owner will provide the original QBA reading items later.

## Assignment-specific AI use guidance (October 14)

- The source packet summarizes ENT professor guidance for **Paper #1** and **Paper #2**: AI is not to compose the student's assessed response; editing/polishing the student's own writing is described as permitted; if AI is used, an endnote naming the platform and describing its use is required. This is **student-prepared source-derived guidance awaiting current official re-verification**.
- The same source describes the **ENT case presentation** as permitting AI with disclosure on its opening slide; the precise allowed scope remains to be checked. This does not imply broader permission for other assessments.
- Published three assignment-scoped records in `data/ai-policies.json` with `verification_status=needs_verification`, `verified_permission=false`, safe attribution, and pending official questions. The hub displays these as **provisional, not permission** in the existing Your AI section. The page rendering remains to be confirmed on the live deployment.
- For other assignments, **especially MGT and QBA, policy is unknown and not automatically authorized.** No student-specific academic status, course instructions, or confidential material was published.

## Pilot v2: remove friction, without dropping approval

- Ship **public-safe proposal intake** only after an owner-tested pending queue, reasonable bot/spam controls, tested emergency pause, private backup freshness alerts and at least one review process. A shared public reviewer password is **not** acceptable.
- A modest **owner-first approval interface** that confirms actual evidence and manually updates canonical GitHub records is sufficient for an initial pilot. Multi-reviewer admin tools and automated publication can follow.
- **First test a Project-saved short private progress checkpoint, with a private copy/paste fallback.** Optional JSON download comes only if students need it. Do not build centralized storage of personal progress for this pilot.
- Add features when pilot users demonstrate the need. Avoid new Workers, complex notifications, duplicated data, and credentials unless an explicit capability requires them.

## Out of scope for first pilot

Native automatic app integration into every AI platform; a shared private student-progress database; unrestricted student writing; multi-reviewer administration; Canvas login, feeds, API access, scraping, or automatic import; copying case texts or private instructor correspondence.

**Rule:** The pilot may be shared as a public **read-only** reference once the landing page and authorized data are verified. Do not label it a complete submission or private continuity service.
