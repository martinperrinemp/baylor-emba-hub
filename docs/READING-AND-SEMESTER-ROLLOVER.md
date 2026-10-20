# Reading & Prep tracking and semester-safe catalog reconciliation

**Decision (October 20, 2026):** Keep one private **EMBA Personal Progress** Google Sheet and one private EMBA Planner Project per student across terms. Support ChatGPT and Claude; Gemini is currently unsupported. The public GitHub catalogs remain the shared authoritative *technical* sources, subject to Canvas/syllabus/instructor override.

## Working student workbook

The public blank "COPY ME" tracker is a template, NOT a live synchronizer. New copies have exactly three tabs:

| Tab | Columns | Meaning |
| --- | --- | --- |
| START HERE | Label, instructions | Setup and update notes |
| Progress | Assignment, ID, Status, Last Updated | Student-confirmed assignment/submission progress |
| Reading & Prep | Reading & Prep, ID, Status, Last Updated | Student-confirmed completion of each reading, article, video, tutorial, case, chapter or prep item |

- `Progress`: 55 initial **active** Fall 2026 assignment IDs, status values **Not started**, **In progress**, **Finished not submitted**, **Submitted**, **Blocked**. Three superseded QBA aggregate records in public JSON MUST NOT be included.
- `Reading & Prep`: 104 initial Fall 2026 `prep.json` IDs, status values **Not started**, **In progress**, **Done**, **Blocked**. This catalog includes 23 ENT, 23 MGT and 58 QBA records. Similar titles that occur in multiple modules are distinct stable IDs; never deduplicate solely by title.
- Blank Status/Last Updated means **UNCONFIRMED**, not "not started" or "missed". Both tabs have zero student progress prefilled; no public user progress, grades, scores or Canvas restricted content.
- Keep the original four Progress columns and existing statuses untouched. Do not change existing IDs because older private student rows refer to them.

## What the next class weekend check actually does

1. At the *start of a user-requested weekly plan*, attempt fresh `data/manifest.json`, `data/open-alerts.json`, `data/assignments.json`, `data/prep.json`, `data/program-calendar.json`, the student's own approved private Sheet.
2. From `program-calendar.json`, find the **next class weekend**, even more than 14 days out, then look up its applicable course sessions. Align public prep using course_id, module, needed_for, due_or_discuss_date and date_meaning; don't mislabel discussion/session dates as deadlines.
3. Join public active assignment records to private `Progress` by exact ID, and all public prep records to private `Reading & Prep` by exact ID. Read current Status and Last Updated. Treat missing tab or failed source access as **unknown**, not zero required items.
4. Report items requiring preparation and assignments with their verification status; flag conflicting and unverified dates and defer to the latest official Canvas/instructor source.
5. Only the student's direct command plus read-back can establish a completed status or edit.

## Per-conversation reconciliation, not background sync

This process is triggered by a **planning or explicit sync request**. Merely putting a URL in Project instructions does not run scheduled jobs or push Google Sheet changes. Google Drive/Sheets tools and per-account permissions may differ.

- Get current active public assignments (exclude `record_status=superseded_aggregate`) and prep IDs.
- Compare each source independently with matching private tab IDs. Detect new IDs, duplicate IDs and orphaned/historical IDs. Do not delete history.
- Present a compact "new assignments" and "new readings" count and sample, with full list available, then **ask explicit permission** to insert missing items.
- When authorized and supported, append only missing ID/title rows. Status and Last Updated remain empty. Never infer Not started for new items or reset existing statuses; never overwrite a known ID just because its title or date changed.
- Re-read the new rows and ID counts. Report the actual result or an exact manual alternative if unavailable. For bulk additions, validate IDs/bounds and verify zero duplicates before and after.
- If `Reading & Prep` tab is missing in an old personal Sheet, ask before creating it; populate from public prep IDs. If the AI cannot create sheets, the student can add a tab manually or copy the unfilled tab from the shared starter using Google's UI if that action is offered. Avoid copying anybody else's filled progress.
- A new published due date with the **same** ID changes the AI's public plan, not the private status. Make approved date changes in `data/changes.json`, update `manifest.json` appropriately, and preserve review state and history.

## Semester rollover (future work)

- Extend public catalogs with a stable `term_id` (and course-offering identity where necessary); **do not migrate or rename existing IDs**. Fall 2026 records can be tagged without ID changes.
- Append new term assignments to `data/assignments.json` and new prep to `data/prep.json`. Keep `data/program-calendar.json` class dates current. Terms are logical filters, not new student Sheets and not a second authoritative dataset.
- Import new syllabi/Canvas assignment metadata into owner-reviewed draft changes, classify assignment vs prep vs class session, flag unclear dates/policies, and approve before publishing. Do not publish protected Canvas files or classmates' private data.
- After the public import, existing students ask their saved EMBA Planner to reconcile newly published IDs. New students copy the latest three-tab starter, which must also be regenerated from public catalogs when new terms are published (no static untracked second source).
- Historical private rows and statuses remain intact through graduation; active-term planning filters by current term and still surfaces outstanding older items if the student wants them.

## Existing students and deployment

The public blank starter spreadsheet was edited with the 104 new prep records and verified, as was the owner's existing private tracker. **Other student-owned copies cannot update automatically from the template.**

An additive self-contained [Reading Upgrade prompt](../cloudflare/public/downloads/EMBA-Reading-Upgrade.txt) helps current ChatGPT and Claude Project owners incorporate prep tracking without replacing their working agent instructions. For existing Projects, saving the upgrade as a new private Project source (or an instruction amendment where room permits) is preferable to sending a one-off chat prompt; neither guarantees an automatic background job. Verify the actual source access and write/read-back on the user's plan.

This is an unofficial student-maintained aid; authoritative source materials always take precedence.
