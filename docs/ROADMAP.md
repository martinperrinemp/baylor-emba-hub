# EMBA Hub roadmap: classmate-ready starter kit first

**Product decision refreshed October 17, 2026.** The academic catalog and the owner's personal Google Sheets read/write proof-of-concept are in place. **NEXT: ship a simple classmate onboarding package**, rather than adding databases, connectors or extra academic import tools before the first user pilot.

## The one-minute description

A classmate visits the [public EMBA Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/), opens a **shared blank Google Sheets template**, clicks **Make a copy** to put a **private** personal tracker in their own Drive, copies/downloads **agent instructions and suggested prompts**, sets up their ChatGPT or Claude Project, and asks "What's due before our next class weekend?" The AI consults the current public Hub for deadlines/prep and the student's private Sheet for confirmed statuses, and updates only that private Sheet when the user's connector supports authorized read/write.

**Important distinction:** A shared **Google Sheet** is the template to copy; a Google **Doc** can be a concise illustrated setup guide. No shared grade/score file and no shared student progress Sheet.

## Milestone 0 — shared data and proof of concept: ALREADY BUILT

- [x] Public, read-only Cloudflare class hub with source data in GitHub.
- [x] 55 active Fall 2026 assignment/date records, three archived/superseded QBA aggregates, and 104 ENT/MGT/QBA prep records (23 + 23 + 58).
- [x] 2026–2028 program class-date highlights, key events/trips/payment dates and Fall 2026 class/course blocks.
- [x] QBA's six modules associated with confirmed class sessions, with **class preparation dates kept separate from submission deadlines**.
- [x] Owner visibly confirmed "Class weekends, trips & key dates" on the deployed hub; detailed QBA module labels not yet rechecked after most recent merge.
- [x] Connected ChatGPT account demonstrated personal private Google Sheet search, successful write/readback, and fresh-chat update/readback.
- [x] First private progress import tested using owner-supplied Canvas **submission evidence only**, with no scores published.

**Data safety:** Every record is student-supplied and pending separate peer/instructor-material review, hence `knowledge_revision=0`. The Hub is unofficial; Canvas/current syllabus/instructor directions remain authoritative. Don't mistake "everything supplied for the semester" for "automatically complete if Canvas changes later."

## Milestone 1 — the classmate's copyable Google Sheet: NEXT TO BUILD

- [x] Created a **separate master Google Sheet** named `Dallas EMBA Progress Tracker – COPY ME (Blank Template)`, with a clean START HERE tab, 55 preloaded public assignment IDs/titles, empty personal statuses/timestamps, and status dropdowns. **Verified actual rows and privacy-safe content Oct 17.** It is currently PRIVATE; no class access has yet been granted.
- [x] Includes START HERE guide, 55 prefilled public stable IDs/titles, and Progress columns `Assignment | ID | Status | Last Updated`, with personal columns completely blank; no grades or private Canvas URLs.
- [x] Applied status-validation dropdown: `Not started`, `In progress`, `Finished, not submitted`, `Submitted`, `Blocked`; blank means unconfirmed by default.
- [ ] **Owner's one-time sharing step still required:** Google Sheet → Share → General access → **Anyone with the link → Viewer** (only after verifying no personal data). The available Drive connector cannot set this specific public-link permission. Then test the **/copy** link with a student who isn't the owner. Individual copies remain private by default, subject to each student's Drive permissions.
- [ ] Test two independent copies and connector access. Confirm the AI can read, write **status and timestamp**, avoid duplicates and read back the changed row. Do not overwrite master.

**Accept:** a nontechnical classmate has a private tracker with no manual row entry, and nobody can see another student's progress.

## Milestone 2 — portable, downloadable EMBA agent instructions and prompts

- [ ] Package **one cross-platform agent instruction file**, such as `EMBA-AGENT-INSTRUCTIONS.md` plus easy-download `.txt`, in the public repository and on the Hub. It should define the assistant's personality (organized, proactive during a conversation, concise, practical and academic-integrity-aware), source hierarchy, privacy, how to use the Hub, how to update private status, and how to report uncertainty.
- [ ] Publish an optional small **PROMPTS.txt** / web copy button: weekly 7/14-day plans, before-class quizzes and readings, "finished but not submitted", "submitted", catch-up plan, and "what changed".
- [ ] Make agent behavior compatible with both ChatGPT and Claude; use platform-specific connector snippets only as appendices. **Never embed anyone's spreadsheet ID, token or personal status in downloadable instructions.**
- [ ] Put prominent **Download instructions**, **Copy instructions**, and **Copy common prompts** choices on the Hub. No GitHub account required to access files.

**Accept:** students can install the basic assistant personality and run a useful weekly plan in minutes, even when optional connector actions are unsupported.

## Milestone 3 — two real setup guides and a one-page handout

- [ ] Write a **ChatGPT Free** guide: start a personal Project if available, add instructions, link the shared Hub, make a private Sheet copy, connect Google Drive if the account supports the needed actions, test one fictional row and new chat.
- [ ] Write a **Claude Free** guide with actual tested Project/workspace/app instructions and equivalent read/write/fresh-chat test. Connector features and permissions may differ; label tested vs unsupported, **never imply identical Free-plan capabilities without running the test**.
- [ ] Offer a short **Google Doc quick-start handout** if useful for class communication, but maintain canonical agent instructions and versioned setup guides in GitHub/Hub to avoid conflicting copies.
- [ ] Include a one-minute fallback for accounts unable to write to Sheets: maintain one Progress chat and periodically manually save a Project checkpoint (or manually update the Sheet).
- [ ] Test setup instructions on a fresh account without assistance; correct confusing steps and permission prompts.

**Accept:** two classmates can follow the guide without direct hand-holding; each understands what's automated and what's manual.

## Milestone 4 — make the website the entire onboarding doorway

- [ ] Add a single **Get Started** area above long lists with a three-action path: **1. Make a copy of my progress Sheet, 2. Install my AI assistant, 3. Ask what is due this week**.
- [ ] Show the Google **/copy** template URL, direct text/Markdown instruction downloads, platform guide links, copyable prompts, and a clear "your progress is private" message.
- [ ] Retain read-only shared calendar, module readings, source-review badges, corrections and assignment-specific AI guidance. Add weekly pre-class highlights if classmates struggle to synthesize the long lists.
- [ ] Verify responsive layout on Android, public URLs, copy flow, and no broken downloads. No student sign-in to the Hub itself.

**Accept:** a classmate can complete the three steps from a phone within a few minutes, with no help from the builder.

## Milestone 5 — small classmate pilot and academic QA

- [ ] Validate the actual upcoming 2–4 weeks of assignments, readiness quizzes and readings with the owner/another enrolled student before asserting any week is complete. Assign reviewer-approved metadata status and increment approved knowledge revision **only after review**, preserving a clear change log.
- [ ] Test ChatGPT Free and Claude Free on real accounts for actual Google Sheet **reads and edits from the standard chat**, plus new-chat recovery. If a connector fails on Free, explicitly document manual fallback; don't silently claim it works.
- [ ] Pilot with 2–3 trusted classmates; observe whether they can copy the Sheet, set up agent, update a submission, and get an accurate week plan. Collect only usability feedback, **not student progress/grades or account secrets**.
- [ ] Fix any missed quiz, wrong/duplicate assignment ID, stale progress, accidental master edits, ambiguous assignment updates or shared-data staleness.
- [ ] Confirm proposed 24–48-hour early targets are labeled as study planning, **not** official deadlines or scheduled push notifications.

**Accept:** student can ask "What must I do before Friday?" and receive a complete *known* checklist with source uncertainty flagged and correct private statuses.

## Later only when classmates ask

- Better 7/14-day dashboard and mobile filtering; reviewed learning resources and study-tool suggestions, student tips, and human-reviewed correction submission.
- Automatic alerts or more complex syncing only if demand is proven.
- Existing proposal-intake D1/Worker security and backup watchdog tests remain a separate admin prerequisite to enabling public writes. Keep `INTAKE_ENABLED=false`.

## Explicitly NOT required

No cohort-shared progress database, per-student Hub accounts, private student D1 schema, custom MCP development, mandatory personal GitHub/Obsidian, score tracker, grade predictor, full Canvas import/scraping, or frequent manual Project checkpoint saves where Google Sheets write works.

## Right now

**Build the shareable Google Sheets progress template, then produce downloadable assistant instructions and ChatGPT/Claude setup guides; wire them into a focused Hub Get Started section.** Do source verification/free-tier capability tests in parallel rather than forcing the owner to keep refining the entire academic catalog before building onboarding.
