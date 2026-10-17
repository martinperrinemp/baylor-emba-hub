# Agent continuity: private progress across EMBA conversations

**Decision October 16, 2026 (CDT):** Use one private student-owned ChatGPT or Claude Project with a dedicated **Progress & Weekly Planning** chat, plus an **explicitly saved short progress checkpoint**. No required Excel, private GitHub repository, Obsidian, student Cloudflare account, D1 student database, or custom MCP connection. Test free-plan source-saving and new-chat recovery before claiming reliability.

See [current roadmap](ROADMAP.md), [student onboarding](AGENT-ONBOARDING.md), and [pilot test plan](AI-PROJECT-PILOT.md).

## Which records are authoritative?

- **Canvas/current syllabus/instructor communications** are authoritative for actual class assignments, deadlines, submissions, and AI policies.
- **Public EMBA Hub** is an unofficial human-reviewed catalog of shareable coursework metadata, stable assignment IDs, readings, quizzes, class weekends, AI-use summaries, and approved changes. It may be incomplete or provisional. It stores no student's progress.
- **Student's latest explicitly saved private CURRENT EMBA PROGRESS checkpoint** is the working personal status record. The student's explicit corrections override it. Neither the model's memory nor the checkpoint proves Canvas submission.
- Student-owned grades are **not stored or tracked by this system**. A student may privately paste a Canvas grades table or upload a PDF for one-off analysis.

## Student experience

1. Create a private Project called **EMBA** in ChatGPT or Claude. Create a conversation inside it called **Progress & Weekly Planning**.
2. Report work accurately as **not started**, **in progress**, **finished but not submitted**, or **submitted**. The assistant changes personal status only based on explicit student statements.
3. Ask: "What is due or needed before our next class weekend?" The assistant checks public Hub data if it can; identifies unknown or provisional coverage; merges the student's confirmed progress; and proposes 7- or 14-day work with 24–48-hour early targets when precise deadlines exist.
4. Periodically request **CURRENT EMBA PROGRESS**. The assistant generates a concise versioned checkpoint. The student **explicitly saves it to Project sources/knowledge if available**, replacing/superseding any older copy, and verifies retrieval in a fresh Project conversation. The assistant must never claim to have saved or synced when it merely generated text.
5. If a Free plan does not permit a dependable saved Project checkpoint, copy it to a private note and paste it into future conversations. This is an openly documented manual fallback, not a failure to hide.
6. Pilot first on genuine ChatGPT Free and Claude Free before onboarding classmates. Platform capabilities, Project memory behavior and save controls may differ.

## Small checkpoint specification

Include: `checkpoint_version`, `updated_at` if accurately known, `last_seen_shared_revision` only if actually fetched, and a short set of personal task rows keyed by public stable ID **when known** (course, short title, status, student confirmation, next action). Optional next-week time availability may be included at the student's request.

Do **not** include grades, scores, copied public deadlines as authoritative truth, private contact information, restricted readings, full Canvas screenshots or personal teammate details. If an ID is missing, use a short title plus `id_unresolved` instead of inventing an ID.

When an assignment title/date changes in the Hub, **do not change the student's confirmed status** merely because public data changed. Compare IDs and approved revision history. If duplicate checkpoints exist, surface conflict and ask which is latest.

## Reliability rules

- No assistant is an automatic, guaranteed calendar alarm without a separately authorized scheduling system. A 24–48-hour buffer is a **planning target** only.
- Never mark a merely finished task as submitted or infer completion from silence.
- Never claim a fresh Hub lookup, knowledge-save, checkpoint write, or change sync without actually performing and confirming it.
- No public GitHub storage of filled private checkpoints; no copy into correction reports.
- Current Hub source gaps and provisional entries must be conspicuously labeled, not presented as a complete schedule.

## Later experiments, only if needed

Optional export/Excel, personal GitHub or Obsidian, read/write MCP and private Cloudflare continuity storage remain deferred. They are not prerequisites for initial pilot. Grade tracking and grade-calculation product features were explicitly dropped. Keep the separate, paused shared-proposal D1 service isolated from student information.
