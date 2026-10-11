# Agent Continuity: resume a student's EMBA assistant across conversations

**Status: product requirement and design. Not yet deployed as an automatic personal sync service.**

## Objective

A cohort member should be able to open a new conversation in ChatGPT, Claude, Gemini, or another compatible assistant and ask it to **resume their EMBA work** without repeating completed tasks, project progress or preferences. This requires durable private storage, NOT the previous model's chat history.

The public hub remains the only **canonical approved course, deadline and AI-use policy source**. Every student's checkpoint is theirs alone.

## Two data layers

| Data | Where it lives | Who can access |
|---|---|---|
| Officially reviewed shared course/assignment IDs, dates, AI policies, resources, revisions | Public `baylor-emba-hub` repository | Anyone |
| Student's confirmed completion/submission status, study plan, next actions, personal preferences, last synced shared revision, task notes | Student-owned **private** continuity storage | Student and AI connections they authorize |

**Never publish personal checkpoints to this public repository or its GitHub Issues.** The public `templates/personal/continuity.template.json` is empty example structure only. No grades, contact details or restricted source text should be included in shared templates.

## Minimal private checkpoint format

- `schema_version`, `updated_at`, `last_seen_shared_revision`, `last_successful_hub_check_at`
- `task_progress` keyed by stable *shared hub assignment ID*, with `status` among `not_started / in_progress / completed / submitted / blocked`, `confirmed_by_student`, `confirmed_at`, `notes`
- `projects`: short non-confidential summary, current milestone, next action, pending decisions, relevant shared IDs
- `study_preferences` and `personal_constraints`: optional, only if the student explicitly chooses to save them
- `outstanding_questions` and `continuity_notes`: keep concise; distinguish student facts from an AI suggestion
- `last_checkpoint_reason`: `user_request`, `confirmed_progress_change`, `session_handoff`, or `scheduled_sync`

Avoid storing copied hub-wide deadlines in private progress. Restore joins current public assignments with private task statuses **by stable assignment ID**, and surfaces any changed/retired IDs.

## Basic supported workflow, even before automatic synchronization

1. An assistant with permitted tools or explicit user confirmation writes a private checkpoint **after meaningful confirmed progress**, not just when it thinks a chat is about to end. Chat length limits can be reached unexpectedly.
2. On request, the assistant should also offer a copyable, human-readable handoff and a portable JSON export.
3. In a new chat, the student connects the same private storage or supplies their saved checkpoint, then asks to resume. The AI retrieves the public `AGENTS.md`, manifest, changes and alerts, then merges private progress with **fresh, verified shared records**.
4. Report changed deadlines since `last_seen_shared_revision` only if the assistant successfully checked that revision history. If retrieval fails, warn that current dates cannot be verified.
5. Show a brief *resumed status*: confirmed completed/submitted; currently in progress; top next actions; unresolved questions; new verified cohort changes. Never treat a planned task as submitted.
6. Save the newly checked revision and any **student-confirmed** progress back to private storage where a write connection exists; otherwise explain that the user must save an export.

## Stages and compatibility

**Phase 1 (lowest complexity):** downloadable/copyable private checkpoint; optionally student-owned private GitHub repo that the student connects to their assistant. Cross-platform portability comes from a documented JSON format. An agent may lack write permission; in that case, export instead of claiming autosave.

**Phase 2 (cohort-friendly):** optional authenticated continuity API on Cloudflare with per-user private storage, per-user permissions, encryption and account/data export/delete controls, so students need not create their own GitHub repo. A central service would then hold personal student information and requires privacy/security review and ongoing operating costs. Keep it **strictly isolated** from public suggestion intake and owner-only disaster-recovery bucket. This is not part of the current live infrastructure.

Different AI products/plans support different connectors and persistent storage. **Do not promise universal or invisible automatic continuation.** Nothing runs simply because a chat reaches a length limit. Autosave and restart require a real, connected action to read/write a checkpoint.

## Safety and correctness

- No common cohort login or shared token for viewing/editing someone's private progress.
- A student owns, can inspect, export, correct and delete their private checkpoint. A reviewer/admin of shared content gets no access.
- Secure storage must ensure authenticated access, per-user authorization, change history and backups with a restore drill.
- Never save passwords, bearer tokens, grades, private discussions, copyrighted cases/readings or full Canvas screenshots into a public GitHub repo.
- Default to recording `submitted` or `completed` only with an explicit student confirmation. `AI suggested done` is not sufficient.
- If someone stops midway through an assignment, save the **work status and next decision**, not a fabricated completed solution.
- Don't claim conversation history can be fully reconstructed. The checkpoint preserves the *useful task state*, not every message, attachment or nuanced context.

## Suggested student restart prompt

> Resume my Baylor EMBA assistant. Load my private continuity checkpoint from the account I connected, then fetch the latest public Baylor EMBA Hub manifest, assignments, change feed and open alerts. Tell me what I confirmed as complete, what I'm working on, what's changed since my last hub check, and my next priorities. If you cannot access either source, say so and ask me to provide the missing checkpoint.

**Fallback:** If no private account is connected, paste/upload the exported checkpoint and use the same restart prompt. Do not upload it to the public cohort issue queue.
