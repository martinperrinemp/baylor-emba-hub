# EMBA Hub roadmap: weekly planning with private Google Sheets

**Updated October 16, 2026 CDT after a real integration test.** The simplest promising end-to-end architecture is **public GitHub/Cloudflare course catalog + each student's private Google Sheet for confirmed status + the student's own ChatGPT/Claude Project for conversation and weekly planning**. There is no requirement to build student D1 accounts, a personal GitHub repo, or an Excel-based tracking workflow.

**Important qualification:** Direct Google Sheets read/write was verified through the Google Drive connector on **the owner's connected ChatGPT account**. It has NOT yet been verified on ChatGPT Free or Claude Free, and some students may need the previous explicit Project-checkpoint fallback. Do not advertise universal Free-plan write access until tested.

## Recent completed academic content milestones (October 17, 2026)

- [x] Owner confirmed new public Class weekends, trips & key dates layout is visible on the Cloudflare hub.
- [x] Import 58 QBA module reading/tutorial references and 11 separate week 1–11 readiness quiz entries into the shared Fall academic catalog (metadata only).
- [x] Confirm and link all six QBA module-to-class time blocks: Sep 5, Oct 16, Oct 17, Nov 13, Dec 4 and Dec 5. Class-session dates on prep are not submission deadlines.
- [x] Record Fall 2026 Friday/Saturday courses and published Class of 2028 program calendar.
- [ ] Confirm new module labels display on Cloudflare after deployment; validate that upcoming prep filter shows the right QBA modules.
- [ ] Still outstanding: human review of course requirements, free-plan ChatGPT/Claude access testing, private tracker negative-case tests, better weekly checklist layout.

## What counts as success

A student says "I submitted Quiz M3." Their AI identifies the stable assignment ID in the shared Hub, finds the matching row in the student's **private** Google Sheet, changes only the status and update time after explicit confirmation, receives a successful write response, **reads back the cell**, and reports the exact confirmed saved status. In a new Project chat, the AI reads the same Sheet and plans the upcoming 7–14 days from current shared course records and confirmed private statuses. No score or grade storage.

The assistant must distinguish **not started / in progress / finished but not submitted / submitted** and never equate a plan with an actual Canvas submission. Canvas, current syllabi and instructor communications remain authoritative over Hub summaries.

## Observed results

- [x] Existing Google Drive/Sheets connection searched for a private native Google Sheet and read its actual 4-column header.
- [x] ChatGPT created a **fictional** test row, read it back, updated its status and independently read the updated status.
- [x] Owner used a **new Project conversation** to update that fictional row again. A separate retrieval subsequently confirmed the new status persisted.
- [ ] **Timestamp integrity:** the last-updated text on the test row was unchanged during the new-chat status update. The proposed procedure must always write **Status AND Last Updated**, then read both back.
- [ ] Test a real confirmed progress update, ambiguous assignment title, unknown ID, duplicate update and a failed write. No accidental changes to real records.
- [ ] Independently test read, authorized update and new-chat retrieval on **ChatGPT Free**, including any required app availability and permissions.
- [ ] Independently test the same on **Claude Free** with its supported Google Workspace capabilities. A product claiming spreadsheet integration isn't proof of the exact write workflow.
- [ ] Confirm a student's private Sheet remains inaccessible to another student and doesn't accidentally become public through sharing links.

No Google Sheet ID, private checkpoint, grades, or student progress belongs in this public repository.

## Student-owned progress format

Minimal private Sheet headers: **Assignment | ID | Status | Last Updated**. Store only confirmed progress and optional short next action when needed. Stable IDs come from public `data/assignments.json`; don't guess unknown IDs or duplicate changing due dates into the private Sheet. A score, quiz result or point value belongs in Canvas, not our personal-status tracker.

Authorized write procedure:
1. Locate student's own Sheet using their connection; verify ownership/access and columns. Never choose by ambiguous title alone.
2. Find exact stable assignment ID. If absent, and public Hub confirms it, insert a new unique row; if identity is ambiguous, ask.
3. Apply only explicitly user-confirmed status and a real update timestamp; don't alter unrelated rows or publish student data.
4. Re-read the row and state **saved** only if the returned values match. On failure, report unsaved and offer a manual Sheet update.
5. In a fresh chat, read private Sheet **again**, and merge it with current Hub records. Do not substitute Project memory for the saved progress record.

**Fallback for unsupported/free clients:** personal Project + ongoing Progress chat + occasionally saved `CURRENT EMBA PROGRESS` source (or private copy/paste). This recovery test already passed on the owner's account, but the source requires a manual save; it is no longer the **preferred** workflow when live Sheet writes are available.

## Highest-priority academic data work

- [ ] Verify all known deliverables before the next class weekend and within the next 14 days against authorized Canvas/syllabus/instructor sources, including **readiness quizzes**, module-specific tasks, discussion initial posts/replies, and required readings.
- [ ] Preserve stable IDs and provenance; identify unverified/unknown dates. The published 40 assignment and 46 prep entries remain provisional until official source review; missing QBA prep is a known coverage gap.
- [ ] Add explicit structured class weekends, actual class times, and timezone where confirmed; avoid inventing times for date-only values.
- [ ] Improve the public 7/14-day view and pre-class checklist, with optional **24–48-hour suggested completion targets**, clearly separate from official deadlines. No background alert guarantee.
- [ ] Surface active verified assignment-specific AI rules near the top; archive prior rules rather than deleting them. Continue curated tips, prompts, study tools and human-reviewed lessons learned.

## Cohort onboarding after pilots

- [ ] Offer separate, **tested** ChatGPT Free and Claude Free Project guides. Each student owns and grants access to only their own private Google Sheet.
- [ ] Provide copyable assistant instructions and ask: "What must I finish before class this weekend?", "I finished but haven't submitted X", "I submitted Y", "What changed?".
- [ ] Test with 2–3 classmates only once their next academic obligations are reviewed and platform read/write works on their respective accounts, or clearly label the manual fallback.
- [ ] Keep optional Excel export strictly as a **shared public metadata snapshot**; not an automatically writable or required personal tracker.

## Out of scope / deferred

- **Grade tracking, score history, predictions and course-grade calculator in the Hub:** explicitly removed. Students privately paste/attach Canvas information for one-off questions.
- No student D1 database, Student Zero Trust enrollment, custom private API, MCP server, mandatory personal GitHub, Obsidian or multi-tenant cloud service unless real pilot evidence justifies them.
- No promise of automatic deadline notifications, Canvas integration/scraping, automatic spreadsheet updates on unsupported models, or automatic propagation of changed official dates.
- Existing proposal-intake Worker/D1 and owner backup/watchdog work belong to **shared catalog corrections** and are independent; **`INTAKE_ENABLED=false` remains unchanged** pending separate security tests.

**Next action:** Complete timestamp and negative-case tests on a fictional row, then run independent ChatGPT Free / Claude Free tests. In parallel verify class-weekend quizzes and deadlines; the system cannot prevent a missed assignment absent from the shared data.
