# EMBA Hub roadmap: classmate-ready starter kit first

## Beginner onboarding walkthrough: three platforms (October 17, 2026)

- [x] Rewrite ChatGPT, Claude and Gemini setup guides as short, numbered click-by-click instructions written for classmates who have never used AI Projects, Gems or GitHub.
- [x] Add website-native, mobile-responsive beginner guides at `/guides/chatgpt.html`, `/guides/claude.html` and `/guides/gemini.html` so students never need a GitHub account or repository view.
- [x] Point Step 3 website buttons to these guides; include a common fictional Google Sheet write/read-back test and the first weekly planning prompt.
- [x] Separate Claude Drive reading from Google Sheets live editing, and Gemini Gem planning from Gemini-in-Sheets actions; avoid guaranteeing edits on any plan.
- [x] Update view-only Google Sheet template's START HERE tab to point students to the direct web guides (Google read-back verified).
- [ ] Confirm guide routes, responsiveness and links on live Cloudflare site after merge.
- [ ] Have one classmate with no AI setup experience follow their chosen guide completely and record any friction; test actual free plan actions rather than guessing.


## Baylor-themed public Hub refresh (October 17, 2026)

- [x] Source implementation: official **Baylor Green #154734** and **University Gold #FFB81C**, Georgia and Helvetica, recognizable **Hankamer / MBA in Dallas** program naming.
- [x] Refined header, hero, get-started cards, assignment and calendar surfaces, darker AI section, and responsive mobile navigation.
- [x] Maintain explicit unofficial student-run identity and link to Baylor's official MBA in Dallas page. **Do not** recreate the university mark or school signature; approved official assets would require separate permission.
- [x] Source-level checks: no remaining navy/blue accents, accessibility contrast spot checks, intact JS syntax and all DOM IDs.
- [ ] Verify live Cloudflare build/deployment, mobile and desktop rendering and any classmate feedback before declaring visual sign-off.
- [ ] Continue onboarding pilot with real classmates after site verification. Academic records remain provisional until independently checked.


## October 17 polish: clearer onboarding and Gemini support

- [x] **Step 1:** explicitly rename the private Google Sheet copy to **EMBA Personal Progress** in Google's Make a copy dialog, then save; the view-only master START HERE tab carries the same instruction.
- [x] **Plans:** recommend paid ChatGPT/Claude/Google AI accounts for more capable integrations *without promising autonomous chat-to-Sheet writes*. Current Google AI Pro student promotion: eligible U.S. college students can claim 12 months at no cost through Dec 31, 2026 (verification and payment method required, automatically paid after promotional year unless cancelled). This is not a guaranteed Baylor-specific entitlement.
- [x] **Step 2:** clearly label the download as a plain-text instruction file **to paste into Project instructions (ChatGPT/Claude) or Gem instructions (Gemini) during setup**, not installed software.
- [x] **Step 3:** prominent separate ChatGPT, Claude and Gemini setup buttons; optional example-prompts download visually separated.
- [x] Create [Gemini setup guide](SETUP-GEMINI.md) for Gemini Gems, Workspace connection and Gemini in Sheets actions, including how edits may require Apply.
- [ ] After merge, verify the three setup buttons, latest text download, and prompt-extra placement on the deployed Cloudflare site, especially on mobile.
- [ ] Run real free/paid workflow tests. Gemini editing in Google Sheets is documented, but an ordinary Gem chat's ability to edit the saved tracker without opening Sheets is **not yet verified**.



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
- [x] Owner enabled sharing and Google permissions verified **anyone with link / Reader**. [Make a copy](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy) now available. Still test external-student flow and private copy permissions.
- [ ] Test two independent copies and connector access. Confirm the AI can read, write **status and timestamp**, avoid duplicates and read back the changed row. Do not overwrite master.

**Accept:** a nontechnical classmate has a private tracker with no manual row entry, and nobody can see another student's progress.

## Milestone 2 — portable, downloadable EMBA agent instructions and prompts

- [x] Built model-agnostic downloadable [agent instructions](../cloudflare/public/downloads/EMBA-Agent-Instructions.txt). It should define the assistant's personality (organized, proactive during a conversation, concise, practical and academic-integrity-aware), source hierarchy, privacy, how to use the Hub, how to update private status, and how to report uncertainty.
- [x] Built downloadable [common prompts](../cloudflare/public/downloads/EMBA-Common-Prompts.txt): weekly 7/14-day plans, before-class quizzes and readings, "finished but not submitted", "submitted", catch-up plan, and "what changed".
- [x] Core behavior is model-agnostic for ChatGPT and Claude; use platform-specific connector snippets only as appendices. **Never embed anyone's spreadsheet ID, token or personal status in downloadable instructions.**
- [x] Added downloads and copy-full-instructions control to Hub Get Started code. Live static asset deployment validation still needed.

**Accept:** students can install the basic assistant personality and run a useful weekly plan in minutes, even when optional connector actions are unsupported.

## Milestone 3 — two real setup guides and a one-page handout

- [x] Drafted [ChatGPT guide](SETUP-CHATGPT.md), with specific connector verification procedure: start a personal Project if available, add instructions, link the shared Hub, make a private Sheet copy, connect Google Drive if the account supports the needed actions, test one fictional row and new chat.
- [x] Drafted [Claude guide](SETUP-CLAUDE.md) distinguishing Project setup from unverified Free-plan Sheets writes. Actual Free-plan testing remains open.
- [ ] Offer a short **Google Doc quick-start handout** if useful for class communication, but maintain canonical agent instructions and versioned setup guides in GitHub/Hub to avoid conflicting copies.
- [ ] Include a one-minute fallback for accounts unable to write to Sheets: maintain one Progress chat and periodically manually save a Project checkpoint (or manually update the Sheet).
- [ ] Test setup instructions on a fresh account without assistance; correct confusing steps and permission prompts.

**Accept:** two classmates can follow the guide without direct hand-holding; each understands what's automated and what's manual.

## Milestone 4 — make the website the entire onboarding doorway

- [x] Built **Get Started** section above long lists in website source with three-action path: **1. Make a copy of my progress Sheet, 2. Install my AI assistant, 3. Ask what is due this week**.
- [x] Wired public Google **/copy** URL, plain text downloads, ChatGPT and Claude guide links, and privacy note in website source. Live access still must be checked after deployment.
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

**Template built and publicly readable as Viewer; agent instructions, prompts, setup guides and Get Started website code now built.** Next: merge, check live assets/layout, then test real classmate copy and Free-plan account integrations. Academic source review remains parallel.
