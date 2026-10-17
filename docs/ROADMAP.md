# EMBA Hub Roadmap — Cohort Starter Kit First

**Current decision: October 17, 2026.** Prioritize getting the existing shared course data into students' hands with an easy **copy-your-own Google Sheet + downloadable AI assistant instructions + platform setup guide**. Additional dashboard sophistication and infrastructure are secondary. The owner requested this ordering after confirming the program calendar and all six QBA module-to-session mappings.

## Student journey we are building

1. Open the public, unofficial [Dallas EMBA Cohort Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/) from any device. It contains the shared course assignments, readings/prep, class schedule, key dates and public-safe resources. Canvas/current instructor instructions remain authoritative.
2. Click **Make your copy** of an official-looking **blank master Google Sheet for student progress**. The master is public READ-ONLY; each student's copy is PRIVATE to that student. Never make a copy of an individual's filled progress workbook. The copy contains stable published assignment IDs/titles and blank progress statuses, not grades. Shared due dates are checked from the latest Hub, not treated as permanent copied truths.
3. Download or copy **EMBA AI Assistant Instructions**: neutral professional personality, academic accuracy/privacy rules, Hub source references, progress Sheet read/write protocol, and example questions. Supply plain `.txt` and `.md` as portable versions, not a proprietary executable/custom app. Provide a simple human-readable Google Doc getting-started manual as well if useful.
4. Follow a 3-minute **ChatGPT** or **Claude** setup guide (with Gemini/other AI or no-AI alternatives where feasible). Connect the student's own Google account only with explicit permission. Verify available actions per platform and plan; don't assert ChatGPT Free or Claude Free write parity without test evidence.
5. Ask **What must I finish this week / before the next class weekend?** The assistant reads fresh accessible Hub data and the student's private Sheet, distinguishes not started/in progress/finished-not-submitted/submitted/blocked/unknown, and proposes an achievable 7- or 14-day plan, including pre-class quizzes, readings, discussions and preparation.
6. Say **I submitted [specific assignment]**. With permitted write access, assistant updates ONLY the student's Sheet by stable ID, updates genuine Last Updated timestamp, and re-reads the row. Say **saved** only if verified. If the connector is unavailable, explain and use a private Project checkpoint/manual Sheet edit fallback. **No grade or score tracking.**

## Current foundation (already present, not a new build requirement)

- [x] Public GitHub/Cloudflare read-only site and stable assignment IDs.
- [x] Fall 2026 student-supplied catalog: **55 active assignments** (3 old grouped QBA quiz records superseded), **104 reading/prep records** (ENT 23, MGT 23, QBA 58). QBA readiness quizzes split individually.
- [x] Fall 2026 exact Friday/Saturday class timetable, Class of 2028 program milestones and 20 class-date blocks through March 2028 on the Hub.
- [x] Student confirmed all 6 QBA modules and associated class session times; 58 QBA prep entries have module/session association. Class-session date **does not equal assignment deadline**.
- [x] Owner visually confirmed Class weekends, trips & key dates renders on live Cloudflare Hub; new QBA labels still need specific refreshed display check.
- [x] Google Drive/Sheets native **read, write, read-back and new-conversation recovery** tested on the owner's connected ChatGPT account.
- [x] Project-saved manual checkpoint recovery tested as fallback.
- [ ] Independent reviewer approval of academic deadlines/AI-use rules remains incomplete; the public Hub must continue conspicuous **provisional** warnings and Canvas-first guidance. Do not re-gather files or claim these aren't uploaded; verify specific changes and edge cases.

## Release A: publish the class-owned Google Sheets template (FIRST BUILD)

- [ ] Create a separate, sanitized **EMBA Personal Progress — TEMPLATE** Google Sheet, never a copied personal completed tracker. Do not expose any connected student's filled Sheet URL, progress, grades or status.
- [ ] Minimal tabs: **START HERE** for instructions and **PROGRESS** with `Assignment | ID | Status | Last Updated`. Include current stable public assignment IDs/titles (optionally seed blank statuses only); blank means **unknown/unconfirmed**, not automatically "not started." Include valid status dropdowns if low-friction.
- [ ] Publish template as view-only or verified copy-link. Test that a classmate can **Make a copy** into their own Google Drive without getting editing privileges to the shared master or anyone else's workbook.
- [ ] Test changes and read-back using a fictional `TEST-...` row in a private copy. Ensure duplicate assignments, wrong IDs, stale timestamps, and accidental public visibility are prevented.
- [ ] Add a prominent **Make your Google Sheet** link to the public Hub only when the copy workflow is tested.

**Done when:** one classmate copies a clean template, sees no other student's information, and can reliably find their own copy.

## Release B: downloadable AI Agent personality, instructions and prompts (SECOND BUILD)

- [ ] Create one canonical **platform-neutral EMBA Assistant profile** with tone, responsibilities, non-assumptions, source hierarchy (Canvas > updated official syllabus/instructor > public Hub), privacy/academic-integrity boundaries, and 7-/14-day planning logic.
- [ ] Include shared Hub file references (`manifest.json`, `assignments.json`, `prep.json`, `program-calendar.json`, `ai-policies.json`, `changes.json`, `open-alerts.json`) and explicit staleness/verification checks.
- [ ] Include private Sheet matching/write/read-back steps. Preserve stable assignment IDs; status is student-confirmed only. No Canvas scraping, no guarantee of background reminders or platform-independent direct writes.
- [ ] Provide downloadable **plain text + Markdown** instructions, and a small copyable **Prompt Library**: weekly plan, before-class checklist, submitted vs finished, catch up, readings by module, changed deadline, and time-budget planning.
- [ ] Put **Download assistant setup** and **Copy starter prompt** on the Hub. Student can use another AI tool or no AI; sharing a central student ChatGPT Project is **not required**.

**Done when:** a classmate can copy instructions into their own assistant without needing a custom integration or individual assistance.

## Release C: setup guides for actual student platforms (THIRD BUILD)

- [ ] One concise **Google Doc / web page** class setup manual with screenshots *from real UI only if obtained*, common troubleshooting, permissions/privacy and three links: template, prompts, Hub.
- [ ] Separate short walkthroughs for **ChatGPT Free/paid**, **Claude Free/paid**; include how to use Projects if available, where to put instructions, connect Google Drive/Sheets if supported, and how to test write/read-back.
- [ ] Document **Gemini/Perplexity/other AI** variations and a simple **no-AI** use of the public website. Label unverified or unsupported connectors and give manual status alternatives without forcing payment.
- [ ] On actual Free accounts, independently check Project creation, connection availability, read/write permissions, cross-chat retrieval, timestamp update, and error handling. Do not extrapolate the owner's connected Plus test.
- [ ] Make start-to-finish workflow understandable to a less technical classmate in a single sitting.

**Done when:** an ordinary student can complete setup without needing GitHub, Cloudflare, command line, or technical jargon.

## Release D: test a complete weekly planning loop, then invite the cohort

- [ ] User asks “What is due this week?” with a time budget; AI uses the public Hub + a private copied Sheet; includes pre-class **quizzes, readings, cases, discussion posts/replies**, real due times and separate 24–48h *suggested* early targets.
- [ ] Test confirmed finished-not-submitted, submitted, unknown, ambiguous title, date conflicts and a new chat retrieving the same updated sheet.
- [ ] Verify upcoming 14 days and especially all Canvas-only/new module quizzes against instructor updates before declaring a checklist exhaustive. This is quality control **in parallel** with A–C, not a reason to postpone building the starter kit.
- [ ] Use 2–3 volunteer classmates across their actual chosen platforms/plans, including at least one Free plan. Record setup time, failed steps, omissions and user confusion **without copying private progress**.
- [ ] Adjust website's 7/14-day and pre-class checklist UI after testing; do not overbuild dashboard features before seeing usage.
- [ ] Offer a **single low-friction Get Started path** prominently on the Hub.

**Done when:** a classmate can get from the public site to a useful private weekly plan, say "I submitted the quiz," have a supported tool save it, and recover it from another conversation (or understand the manual fallback).

## Release E: maintain through graduation (ITERATIVE)

- [ ] Termly onboarding: safely import and approve new public course metadata, meeting dates, readings and AI-use policies as course materials arrive; update revision/change feed; archive older courses without losing useful context.
- [ ] Maintain easy public-safe corrections and verified changes; never accept grade/submission/private progress from classmates into the public repository.
- [ ] Consider additional study aids/NotebookLM tips and a class lessons-learned area based on actual demand.
- [ ] Existing proposal write-intake infrastructure stays **`INTAKE_ENABLED=false`** until separate reviewer/backup/emergency-stop checks are complete.
- [ ] Continue to improve the optional no-AI calendar/website experience.

## Explicitly not in MVP

No student account database, required Excel workbook, personal GitHub repository, Cloudflare Zero Trust student login, mandatory MCP server, automatic grade tracking, grade calculation, unapproved AI permissions, Canvas scraping/import, unsolicited background reminders, or promise of identical Free-plan capabilities.

**Single next implementation task:** Build and safely publish **EMBA Personal Progress — TEMPLATE** as a *view-only, copyable Google Sheet*, add a link to the public Hub after testing. Then create the downloadable Assistant Instructions/Prompt Pack and setup manual, followed by a complete end-to-end classmate test.

**References:** [Live Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/) · [Starter instructions currently available](AGENT-ONBOARDING.md) · [Pilot evidence](AI-PROJECT-PILOT.md) · [Change/verification procedure](SEMESTER-IMPORT.md).
