# Student progress continuity: Google Sheets first

**Current recommendation (October 16, 2026 CDT):** The public Baylor EMBA Hub stores shared course metadata. A student's **own private Google Sheet** stores only explicitly confirmed assignment progress. Their ChatGPT/Claude Project helps plan and discuss coursework. Direct read/write/retrieve across ChatGPT conversations was verified on the owner's connected account, but **Free-plan and Claude integration remain unverified**. Use an explicit saved Project checkpoint only as a fallback.

See [roadmap](ROADMAP.md), [student onboarding](AGENT-ONBOARDING.md), and [test plan](AI-PROJECT-PILOT.md).

## Source hierarchy

1. **Canvas, current syllabus, instructor communications:** actual authoritative requirements, submission state and due times.
2. **Public Hub:** unofficial verified/provisional course-wide assignment IDs, class weekends, quizzes, readings, applicable AI restrictions, change log. Incomplete entries must be flagged.
3. **Private student's own Google Sheet:** working saved record of student-confirmed status, **not** proof of actual Canvas submission. Never save it to a public repository or share it with cohort reviewers.
4. **AI memory:** useful context, **never** a substitute for the private Sheet's actual read-back.

## Minimal personal Sheet

| Assignment | ID | Status | Last Updated |
| --- | --- | --- | --- |
| Optional descriptive title | Stable ID from Hub | Not started / In progress / Finished but not submitted / Submitted / Blocked | Actual timestamp after confirmed change |

Store **no grades, scores, copied restricted content, instructor correspondence or secret links**. Shared deadlines belong in public course records, not manually re-copied to a private worksheet.

## Updating and recovering

- Student explicitly confirms a status. Resolve **one stable assignment ID**; ask when the title is ambiguous. Never assume submission.
- With authorized write access, update/insert only the matching private row, change **both status and timestamp**, and read back for verification. Only then say saved.
- New Project conversation retrieves the student's Sheet again and combines it with fresh accessible Hub dates. If a connection is absent or write fails, disclose it and provide manual fallback. Never claim that a Project upload is a live spreadsheet.
- A change to a public due date must not silently modify the student's private completion status. Keep stable IDs.
- 24–48-hour early finish targets are recommendations, **not proactive alerts**.

## Fallback when connector write isn't supported

Use an ongoing private Progress & Weekly Planning chat plus a short **CURRENT EMBA PROGRESS** snapshot the student explicitly saves to their Project sources (or privately copy/pastes to a later chat). This passed one owner's Project-source retrieval test but demands manual saves and may encounter older contradictory snapshots. Test it separately on real Free plans before recommending broadly.

## Pilot gates and security

- Read/write/new-chat recovery validated only for the owner's ChatGPT account to date.
- Check timestamp refresh, duplicate updates, wrong ID cases, failures, Free ChatGPT, Free Claude and per-user privacy/authorization before broader class rollout.
- Do not store individual academic scores/grades for this product. Students can paste Canvas results into a personal conversation for one-off interpretation.
- Keep public correction D1/Worker and owner-only backups **separate** from private student Sheets; public proposal intake remains paused.
