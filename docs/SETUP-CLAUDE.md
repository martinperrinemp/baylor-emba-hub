# Set up your EMBA assistant in Claude

**Baylor EMBA · 2028 Cohort**

The [guided Claude setup page](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/claude) is the recommended beginner pathway. The [full written manual](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/claude-manual) is the alternative for students who prefer to follow all steps at once.

## Student flow (about 15 minutes, Chrome on desktop)

1. Make a private [copy of the approved 55-assignment tracker](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy), name it **EMBA Personal Progress**, and verify **Share → Restricted**. Do not edit the class template.
2. On the [guided page](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/claude), choose **Copy setup prompt** or download the same [prompt .txt file](../cloudflare/public/downloads/EMBA-Claude-Setup-Prompt.txt). The button fetches that precise file; the prompt is never independently hard-coded into JavaScript.
3. Open a new chat at [claude.ai](https://claude.ai), paste the setup prompt, and let Claude guide the remaining steps one action at a time.
4. Within the guided chat, create a Claude Project named **EMBA Planner**, paste the full [project instructions .txt](../cloudflare/public/downloads/EMBA-Agent-Instructions.txt) from the Hub into its **Project instructions** field, and connect Google Drive and Google Sheets to your private Sheet.
5. Test the fictional `TEST-001` row and read back **Status** and **Last Updated**. Then test retrieval of its status in a new EMBA Planner chat and test a real upcoming date from the current public `assignments.json`. Delete only the fictional row when done.

On the private Sheet, the **Progress** tab has headings **Assignment, ID, Status, Last Updated** and initially **55 assignment rows**. Blank status is **unconfirmed**. Allowed statuses are: Not started (only when confirmed), In progress, Finished not submitted, Submitted, Blocked. The tracker stores no grades, points, personal names, private Canvas links, or due dates.

## Source of truth and date fetching

**Public course data** is in the versioned GitHub JSON files, not the JavaScript-rendered Hub landing page:

- [Assignments and deadlines](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/assignments.json)
- [Readings and preparation](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/prep.json)
- [Class calendar and trips](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/program-calendar.json)
- [Publication state](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/manifest.json)
- [Changes](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/changes.json)

The public Worker also exposes read-only `/api/public/*.json` endpoints. The private Sheet stores statuses only; match public and private rows by exact stable assignment ID. Ignore records marked `record_status: superseded_aggregate`. Use `official_due_at` when present and otherwise `submission_due_at`, noting `presentation_at` separately. These fields are currently provisional and must never be presented as Canvas-verified without evidence. Preparation/discussion dates are not automatically submission deadlines. `student_action_required: false` records are not student submissions.

The Sheet has no date columns, so it cannot reveal changed deadlines. Detect those only from an earlier Hub snapshot or an actual recorded change. If current Hub data cannot be fetched, disclose that plainly and rely on Canvas and instructors as authoritative sources.

## Safety and usability

- Claude’s automated Sheet edits and readbacks depend on a working authorized connector. Its ability to perform the edit is **not guaranteed** by the Free or paid plan. Students can update statuses manually while Claude helps plan.
- The guided chat must require a reply before moving on. The user handles screen clicks/sign-ins, while Claude can use an authorized Google Sheet connector for exactly the private Sheet the user supplies and for edits they approve.
- “Saved” is allowed only after reading back the exact edited cells. Past-due blank statuses are **unconfirmed**, not automatically late or completed. Never infer a submission.
- The Hub and GitHub are public; never send a filled-in private Sheet there.
- Current Canvas/syllabi/instructor instructions outrank shared metadata and determine permitted AI use.
- All global Hub naming changes and live master Sheet template edits remain deferred until approved separately.

## Release acceptance checks

The draft PR must include all three static pages/files: `cloudflare/public/guides/claude.html` (guided), `claude-manual.html` (manual), and `cloudflare/public/downloads/EMBA-Claude-Setup-Prompt.txt` (sole prompt source). Both the **Copy setup prompt** button and the download link must use that same file. The page must be readable without JavaScript; the only JavaScript-dependent action is copying to clipboard.

Before declaring onboarding working, manually test a fresh Claude Free and Pro session in Chrome: guided chat pauses after each action, 55 rows/four headings verified, TEST-001 written/read back, new Project chat returns its saved status, `assignments.json` returns real upcoming (unverified) dates with no superseded aggregates, fictional row removed, manual fallback works, and mobile troubleshooting table is readable. Correct UI labels based on what live Claude actually displays.

**Independent student-run resource, not operated by Baylor University.**
