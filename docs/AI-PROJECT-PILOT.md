# AI Project pilot: progress and weekly planning

**Status:** Test plan only; no automatic personal persistence or background reminders deployed. Use the [Roadmap](ROADMAP.md). Run on personal, private ChatGPT/Claude Projects. Never make filled checkpoints public.

## One-time setup (each platform separately)

1. Create a **private Project** called "EMBA" (or use an existing one). Put a dedicated chat inside it named **Progress & Weekly Planning**.
2. Give the Project the [Hub onboarding instructions](AGENT-ONBOARDING.md) and the public [Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/). Project capabilities and methods to save sources vary by product and plan; **visually verify** what actually works on that user's free account.
3. Keep only a brief personal progress checkpoint in Project sources/knowledge if the UI permits. Never put grades, personal notes, emails, restricted course materials, or Canvas screenshots in public GitHub or issue submissions.
4. Verify current official deadlines in Canvas. The Hub currently carries **provisional records** and has incomplete source coverage.

## Copy/paste pilot prompts

**Test 1 — distinguish progress from submission**

> For this test, I confirm that [exact assignment A] is FINISHED but NOT SUBMITTED, and [exact assignment B] is SUBMITTED. Record those as student-confirmed status only. Use stable IDs if found in the public EMBA Hub; otherwise mark the ID unresolved. Show my two statuses without inventing grades or due dates.

**Test 2 — generate a private checkpoint**

> Prepare an updated, compact CURRENT EMBA PROGRESS checkpoint I can explicitly save in this Project. Include only confirmed task ID/title, status (not started / in progress / finished but not submitted / submitted), confirmation date if known, next action, and last hub revision you actually checked. Tell me how to save this on my current platform; do not say you saved it unless I confirm. This replaces the previous checkpoint.

**Test 3 — new conversation recovery**

> In this brand-new chat in my EMBA Project, read the latest saved CURRENT EMBA PROGRESS checkpoint and attempt a fresh read of the EMBA Hub. Tell me which assignments are confirmed submitted, which are finished but not submitted, and what is due or needed in the next 14 days before the next class weekend. Give 24–48-hour early targets only where exact official due dates are known. If you cannot retrieve a source, say which one is missing and do not guess.

**Test 4 — revise and recover again**

> Correction: I have now SUBMITTED [assignment A]. Prepare a replacement checkpoint. Tell me how to supersede/delete the prior version so future chats do not receive conflicting snapshots.

Start another new conversation and re-run Test 3.

## Expected student workflow

- During the week, tell the **Progress & Weekly Planning** chat when work is started, finished, and finally submitted.
- Before the next week or when changing chats, ask it for an updated **CURRENT EMBA PROGRESS** and **explicitly save/replace the checkpoint** if Project knowledge supports it. If that is not available, copy the short checkpoint to a private note and paste it into the next chat.
- Ask "What do I need to get done before class this weekend?" The assistant should fetch the current public hub where possible, use only confirmed personal progress, and propose an early study schedule. It does not continuously monitor deadlines or send proactive reminders.

## Record pilot observations without private data

For ChatGPT Free and Claude Free separately, capture: setup minutes; whether the Project could retain a saved checkpoint; whether a fresh chat read the *latest* version; whether old versions conflicted; whether fresh public Hub access succeeded; whether a missing quiz, source gap, or wrong deadline was surfaced; and the number of student manual steps.

**Pass:** reliable new-chat recovery of both statuses, a truthful Hub freshness warning on access failure, no private sharing, no claim of autosave, and accurate distinction between prep and graded due dates.

**Fallback:** paste latest checkpoint into new chat; continue task with clear freshness warnings. No mandatory GitHub repo, spreadsheet, extra app, or student database.

**Data-quality precondition for inviting classmates:** verify the next 2–4 weeks of required quizzes, discussion parts, readings, cases, exact due times and class sessions with the official course materials. Missing Canvas-only tasks are the principal high-impact failure mode.
