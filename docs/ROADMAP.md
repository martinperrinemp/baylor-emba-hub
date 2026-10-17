# EMBA Hub roadmap: weekly planning first

**Decision recorded October 16, 2026 (CDT):** Prefer a small, student-owned AI Project workflow over building new personal data infrastructure. This is the current product direction. Refer to [Pilot test plan](AI-PROJECT-PILOT.md) and [Fast pilot](FAST-PILOT.md) for deployment gates.

## Product outcome

A Dallas EMBA student opens their personal ChatGPT or Claude Project, asks what is due or needed before the next class weekend, reports work as finished or submitted, and receives a useful 7- to 14-day plan with a 24- to 48-hour target buffer. The assistant must distinguish **actual official due date**, **pre-class preparation date**, and **suggested early finish target**. A new chat should recover student-confirmed progress from an explicit private checkpoint where supported, rather than confidently guessing from memory.

**Canvas, the current syllabi, and instructor communications remain authoritative.** The public EMBA Hub is an unofficial, student-maintained coordination resource, not a complete Canvas mirror or guaranteed reminder service. No background monitoring occurs simply because a Project exists.

## Release 0: test the workflow before building software (NOW)

- [ ] Have one volunteer create or reuse a PRIVATE personal ChatGPT Project with a dedicated **Progress & Weekly Planning** chat. Repeat with Claude Free; verify the exact save-to-project/source mechanism on each account instead of assuming it is identical across platforms.
- [ ] Use the current Hub starter instructions. Student tells the assistant two explicitly confirmed statuses: one **finished but not submitted**, one **submitted**. The assistant must not collapse these statuses.
- [ ] Request a short **Current EMBA Progress** checkpoint: stable public assignment IDs (when available), confirmed status, brief next action, checkpoint timestamp, and last successfully checked public knowledge revision. No grades, scores, personal identifiers, copied Canvas materials or restricted content.
- [ ] Student explicitly saves the checkpoint to their own Project knowledge/source using the UI available on their plan. Remove or clearly supersede the older version. Never say it was saved without confirmation.
- [ ] Start a **brand-new conversation within the same Project**. Ask for a weekly plan. Verify the assistant reads the latest saved checkpoint, does not incorrectly mark unfinished work submitted, and attempts a fresh Hub check; it must warn when either source cannot be read.
- [ ] Test a change of status followed by another checkpoint and new chat. Verify old checkpoint conflicts are not silently preferred.
- [ ] Repeat on genuine ChatGPT Free and Claude Free accounts. Record friction and failed cases, including source/file limits and inability to save a chat response directly.
- [ ] Test with 2–3 trusted classmates **only after important upcoming coursework is checked against official sources**; obtain feedback without collecting their private checkpoints.

**Go/no-go:** If a new chat cannot reliably retrieve the student-saved checkpoint on a platform, require a private copy/paste checkpoint as the supported fallback. Do not market autonomous persistence. Do not build a database merely to avoid one manual save until tested student feedback warrants it.

## Release 1: trustworthy shared academic data (highest-value build)

- [ ] Check next class weekend and following 14 days against current Canvas/syllabus/instructor materials, **including quizzes hidden within modules**, readiness requirements, discussion posts and replies, readings, case prep, submissions and presentation dates.
- [ ] Verify and publish the relevant subset of 40 provisional assignment/date candidates and 46 provisional ENT/MGT prep items. Fill QBA prep gaps only from authorized official source material; do not infer no assignment exists.
- [ ] Add or verify structured **class weekends and meeting times** as public metadata, including class timezone and scheduled pre-class preparation dependencies. Date-only values must not receive invented 11:59 PM times.
- [ ] Put a 7/14-day pre-class **checklist** first in the public hub, showing actual due dates, whether verified, and a separately labeled suggested 24–48-hour early target.
- [ ] Move **active, verified, assignment-specific AI-use rules** and useful student prompts near the top of the page, with a clear unknown-policy warning. Archive prior course guidance rather than deleting it; time alone is not proof that a course has ended.
- [ ] Keep read-only JSON, stable IDs, approved revision/change alerts, manual correction process, and existing paused intake safety controls. No Canvas scraping or API integration.
- [ ] Add curated class tips, study workflows (including NotebookLM ideas), and resources through human-approved, public-safe submissions.
- [ ] Optional clean Excel/export of shared academic metadata; not required to use Projects, and never used as a grade tracker or canonical personal progress database.

## Release 2: make Project onboarding easy

- [ ] Publish a tested 3-minute ChatGPT Free setup guide and a tested Claude Free setup guide, with one copyable prompt each.
- [ ] Provide examples: **What's due this week?**, **What is required before class Friday?**, **I finished X but have not submitted it**, **I submitted Y**, **Save a progress checkpoint**, **What changed since my last hub check?**
- [ ] Document a clear fallback when the model cannot browse the Hub, add Project knowledge, or update saved source. It should still help with the data provided and state the freshness limitation.
- [ ] Keep progress chats/checkpoints inside each student's private AI account. No class-wide shared AI Project or public progress logs.

## Deferred / conditional (not on critical path)

- Student logins, Zero Trust enrollment, student D1 databases, private Cloudflare progress API, mandatory GitHub or Obsidian, Google Sheet sync, MCP write integrations, automated 24/48-hour alerts, automatic Canvas import.
- Persisted grades, point scores, grade predictions, grade calculators: **removed from Hub product scope**. Students can paste or upload Canvas results privately and ask their AI for ad hoc analysis; no shared storage or score tracking.
- Automatic direct sync may be reconsidered only if manual Project checkpoint testing demonstrably fails and classmates want the additional complexity. Any future private data infrastructure would need an explicit privacy and security design first.
- Existing proposal-intake D1/Worker, backup/watchdog and admin workflow are separate public-catalog correction infrastructure, **not** student tracking. Keep **INTAKE_ENABLED=false** until documented live safety gates pass.

## Pilot success metrics

1. Given a verified schedule, the AI lists **every known pre-class quiz, reading, and submission** in the next 7/14 days and clearly flags incomplete or provisional source coverage.
2. Reports **finished, not submitted** separately from **submitted** and never invents a completion.
3. Correctly handles a student's explicit progress update and an explicitly saved checkpoint in a new Project conversation, or honestly falls back to user-supplied checkpoint.
4. Sets planning targets 24–48 hours early **only when an actual exact deadline is known**; otherwise uses a labeled suggested preparation date.
5. Clearly communicates Hub lookup failures and changed/unknown dates without claiming a successful sync.
6. Nothing private is published in GitHub, the public Hub, public issues, screenshots, or logs.

**Next concrete action:** Run [AI Project pilot](AI-PROJECT-PILOT.md) with the owner's private MGT progress (no grades), then validate two additional free-account flows. In parallel, audit the next class weekend's quizzes and coursework for reliable shared data.
