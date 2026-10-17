# AI Project pilot: shared Hub + private Google Sheets status

**Observed October 16, 2026 CDT:** On the owner's connected ChatGPT account, Google Drive/Sheets read/write **and cross-conversation update retrieval** worked on a fictional test record. This is not yet verified for ChatGPT Free or Claude Free. The prior Project-saved-checkpoint pilot also succeeded as a manual fallback. See [Roadmap](ROADMAP.md).

## Verified observations (sanitized)

1. Google Drive returned a student-owned private Google Sheet and its column headers (Assignment, ID, Status, Last Updated).
2. ChatGPT wrote a fictional assignment status and independently read it back.
3. A new Project conversation successfully changed the same test assignment status.
4. The original conversation then read the private Sheet again and verified the new status.
5. **Defect discovered:** during the cross-chat update, the `Last Updated` cell did **not** change. This must be fixed by the assistant's standard write instructions and tested. Do not assume a timestamp is maintained automatically.
6. Only capability results are published here; **no private spreadsheet URL, assignment progress, grades or account details**.

## Next experiments (no production coding required)

**1. Accuracy and write integrity on a fictional record**

- [ ] Ask the AI to update one specific `TEST-...` ID, writing **Status AND Last Updated** from actual time and confirming both by reading back.
- [ ] Ask for the same update twice. Check that it does not create two duplicate rows.
- [ ] Try a deliberately ambiguous assignment name. The assistant must ask for the ID rather than write to an arbitrary row.
- [ ] Simulate inability to edit. The assistant must say **not saved**, and offer a manual fallback.
- [ ] Ensure updates to the private Sheet cannot modify the public cohort catalog, and no grades are introduced.

**2. ChatGPT Free account**

- [ ] Create a private personal EMBA Project, connect Google Drive/Sheets if the particular Free plan permits it, and identify actual tools available.
- [ ] Have the assistant find the student's private test Sheet, read a row, update it, and verify the write/read-back.
- [ ] Start a new Project conversation and have it retrieve the latest data, not previous chat memory.
- [ ] If the plan does not support direct write actions from Project chat, record the precise friction and use the saved Project-source checkpoint fallback. Do not substitute a Sheets sidebar-only workflow while claiming chat write success.

**3. Claude Free account**

- [ ] Test Google Workspace integration on the real Free account; verify whether its regular Project/chat can write a Sheet, not merely reference a snapshot.
- [ ] Repeat update/read-back/new-chat recovery. Record OAuth setup, rate limits, confirmation steps and errors.
- [ ] If direct write isn't supported, document the Project-source or private pasted-checkpoint fallback.

**4. Weekly planning**

- [ ] Use public `manifest.json`, verified `assignments.json`, `prep.json`, `open-alerts.json`, class sessions and changes where actually available.
- [ ] Merge known requirements with private Sheet statuses keyed by stable assignment IDs and show the next 7/14 days, including **quizzes before a class weekend**.
- [ ] Offer 24–48-hour advance *planning targets*, not fabricated instructor deadlines or background reminders.
- [ ] Correctly label incomplete/provisional Hub records. Current 40 dated items, 46 ENT/MGT prep entries and QBA prep gap need official review.
- [ ] Run two simultaneous-student privacy checks with separate test accounts, without sharing personal progress.

## Preferred student instructions

> Use the public Baylor EMBA Hub only for shared course schedule, assignments, readings, changes and AI-use information; it is unofficial and sometimes provisional. Use **my private Google Sheet** for my personal assignment status, never for grades. Before weekly planning, read both sources when possible and report any source you could not verify. When I explicitly confirm finishing or submitting a task, find its exact stable assignment ID, update only my Sheet's status and real Last Updated timestamp, and read back the updated row. Say SAVED only after read-back matches. Ask if the assignment ID is ambiguous. In a new chat, re-read my Sheet rather than relying on memory. Never equate finished with submitted. Plan 7–14 days ahead and aim for 24–48 hours before confirmed deadlines. Do not claim automatic reminders or Canvas access.

## Fallback if the user's AI cannot write Google Sheets

Use one ongoing Progress & Weekly Planning Project chat and an explicitly saved **CURRENT EMBA PROGRESS** snapshot, or private copy/paste into future chats. On the owner's connected ChatGPT account, a new chat successfully read an earlier saved Project checkpoint. However, ordinary uploaded Project files do not automatically rewrite on each status update, so the fallback remains **manual**, not equivalent to live Sheets editing.

## Go/no-go before inviting classmates

Pass full write/read-back/new-chat tests on the **actual free account types in use**, correctly update timestamps, safely reject wrong assignment IDs, verify class-weekend quizzes against Canvas and ensure no cross-student access or public data leakage. Pilot with 2–3 classmates after that. Never make real grades or class progress public.
