# Baylor EMBA Cohort Knowledge Hub

## Baylor / Hankamer-inspired website theme — October 17, 2026

The student-led Hub has been refreshed with the **official Baylor Green (#154734)** and **University Gold (#FFB81C)**, accessible green-and-white surfaces, Georgia/Helvetica typography, a stronger **Hankamer School of Business / MBA in Dallas** identity, responsive student-onboarding cards, and clearer mobile navigation. The website remains explicitly **unofficial and not Baylor-operated**. No University/School logo has been recreated or added; the official brand marks require approved assets and appropriate permissions. See [brand implementation and rationale](docs/BRAND-THEME.md). Live visual confirmation still required after the merge.


## Three-platform student setup — October 17, 2026

The three-step [EMBA Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/) now instructs students to **rename their private Google Sheet copy** to `EMBA Personal Progress` before saving; download the plain-text [Agent Instructions](cloudflare/public/downloads/EMBA-Agent-Instructions.txt) for use **inside their AI's instructions settings** during setup; then choose the prominent [ChatGPT](docs/SETUP-CHATGPT.md), [Claude](docs/SETUP-CLAUDE.md), or new [Gemini](docs/SETUP-GEMINI.md) guide. [Example prompts](cloudflare/public/downloads/EMBA-Common-Prompts.txt) are optional extras.

Paid versions are recommended for the best chance of connected Google Sheets edits, but this depends on features and permissions and is **not guaranteed**. Eligible U.S. college students may receive 12 months of [Google AI Pro at no cost](https://gemini.google/us/students/) under Google's offer terms, with enrollment verification, payment method and Dec 31, 2026 redemption deadline. Gemini's regular Gem chat is not equivalent to Gemini in Sheets, which may require the student to review/apply an edit.



## New: Classmate starter kit (October 17, 2026)

**Three steps:** [Make your own blank progress Sheet](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy); [download the EMBA agent personality and rules](cloudflare/public/downloads/EMBA-Agent-Instructions.txt); follow [ChatGPT setup](docs/SETUP-CHATGPT.md) or [Claude setup](docs/SETUP-CLAUDE.md). There is also a [prompt pack](cloudflare/public/downloads/EMBA-Common-Prompts.txt) and [one-page quickstart](docs/START-HERE.md).

The master Sheet is Google-confirmed shared as ANYONE / READER with no personal scores or status values. Each student makes a copy under their own Google account and keeps personal progress private. The Get Started area and direct text downloads are implemented in website source; live Cloudflare deployment still needs a post-merge check. ChatGPT Free / Claude Free Google Sheet writes are NOT verified yet; each guide provides a manual fallback.


**Unofficial, student-maintained resource. Not operated by or endorsed by Baylor University.**

This public repository gives the Dallas Executive MBA cohort and compatible AI assistants **one shared source** for approved coursework metadata, deadlines, resources, lessons learned, AI-use guidance, and change alerts. **Canvas, current course syllabi, and instructor communications are authoritative. Each student is responsible for independently verifying deadlines and submissions.**

> **Build status (Oct 13, 2026):** **Read-only classmate landing page LIVE, visually verified on Android (owner screenshot October 13, 2026).** The existing `baylor-emba-proposals` Worker hosts a responsive public hub and a read-only public GitHub data endpoint, while **`INTAKE_ENABLED=false`** keeps automatic proposals paused. The owner has verified a manual full backup, an isolated D1 schema restore, readable GitHub ZIP, a daily backup and Watchdog schedule, and a Discord test message. **First unattended backup/watchdog cycle and missing-backup alert are not yet verified.** The hub now includes **55 active Fall 2026 assignment candidates (plus three superseded aggregate QBA quiz placeholders), 104 provisional ENT/MGT/QBA Reading & Prep items, a program calendar, and three source-attributed provisional ENT AI-use notes** imported from the student-prepared semester materials; **none are independently verified against current official instructions**, and shared knowledge revision remains 0. See the [fast pilot checklist](docs/FAST-PILOT.md) and [live project handoff](docs/PROJECT-HANDOFF.md).

## October 17, 2026: Coursework catalog + program calendar expanded

The owner supplied the Class of 2028 program-wide calendar, the Fall 2026 course-block timetable, all six QBA module read/watch lists and updated ENT/MGT/QBA Canvas assignment lists. This update adds **20 program class-date blocks through March 2028**, orientations/travel/graduation and tuition payment events, and **16 Fall 2026 Friday/Saturday course-block slots** via `data/program-calendar.json`. QBA module readings/tutorials are now present alongside ENT/MGT, with public original course-reading links and **without restricted Canvas URLs**.

The Hub now contains **55 active assignment records** plus **3 archived/superseded grouped QBA readiness placeholders**, and **104 reading/preparation records** (23 ENT, 23 MGT, 58 QBA). New course requirements and deadlines were transcribed from student-supplied Canvas lists; **no grades, student submissions, or personal tracking data** were published. Records still need separate official reviewer sign-off, so the approved knowledge revision remains 0. On Oct 17, the enrolled student confirmed the **full six-module QBA-to-class-session sequence**. All 58 QBA prep entries now link to those class-session dates, explicitly *not* graded submission due dates. The student also confirmed the public **Class weekends, trips & key dates** section loads. Module labels are now included on the relevant course blocks; their live deployment still needs a refresh check.

## Latest progress-tracking pilot result (October 16, 2026 CDT)

The owner's connected ChatGPT account **successfully edited and re-read a fictional record in a private Google Sheet; a new Project conversation updated the same row and a subsequent independent read confirmed it**. This makes private Google Sheets the **preferred candidate** for student progress, with each student owning their own Sheet; the AI Project is the planning interface and the public Hub stores shared requirements. **ChatGPT Free and Claude Free write access remains unverified**, and our pilot caught a stale timestamp on the changed row. The [roadmap](docs/ROADMAP.md), [Sheet pilot test](docs/AI-PROJECT-PILOT.md) and [onboarding](docs/AGENT-ONBOARDING.md) specify the remaining tests. Manual Project checkpoints remain a fallback; they are no longer preferred when live Sheets editing is available. No grades are stored and no classmate data is published.

## Prior student-first pilot direction (superseded where Google Sheets write works)

The near-term product is **weekly planning and assignment progress**, not grade tracking or a new student database. Each student uses a **private ChatGPT or Claude Project**, a dedicated **Progress & Weekly Planning** chat, and an **explicitly saved private progress checkpoint** where their account supports it. New chats should read that checkpoint or ask for a private pasted copy. Chat memory and automatic autosave are **not guaranteed**. A 24–48-hour early completion target is planning guidance, not a proactive alert. Students may privately paste Canvas grades for one-off analysis; **the Hub does not store or calculate personal grades**.

- [Prioritized project roadmap](docs/ROADMAP.md)
- [Project checkpoint pilot and acceptance tests](docs/AI-PROJECT-PILOT.md)
- [ChatGPT and Claude Project setup and starter instructions](docs/AGENT-ONBOARDING.md)

Existing shared Hub source records (40 assignments, 46 prep items) are still **provisional** until official source review. The top launch priority is ensuring upcoming class-weekend quizzes and readings are not missed. No Cloudflare code was modified by this documentation update.

## Resume the build or move to a new AI chat

Read [**Project Handoff and Build Checklist**](docs/PROJECT-HANDOFF.md) first. It tracks only user-confirmed milestones, outstanding tests and the next action, without any passwords or private coursework.

## Resume your own AI assistant across conversations

Every cohort member should be able to keep **confirmed personal progress in a student-owned private checkpoint** and restore it in another chat, then check fresh approved class information. The [Agent Continuity design](docs/AGENT-CONTINUITY.md) and [blank portability template](templates/personal/continuity.template.json) are published. **Automatic checkpoint sync and cross-platform connections are not yet deployed.** Never save filled student checkpoints in this public repository.

## Start with the cohort hub

The classmate-facing page is live at **[Dallas EMBA Cohort Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/)**. One URL lets students inspect public course metadata, a provisional Reading & Prep list, candidate resources, changes, and copy an AI onboarding prompt. The page does not collect students' grades, personal progress, or their ChatGPT conversations.

**First use:** open the page, copy **AI starter prompt**, and paste into your own AI assistant. Assistants that cannot fetch the public repo must say so. Candidate dates are **not authoritative** until checked against current course instructions, and missing course records are **not** evidence that no coursework is due.

The [fast pilot plan](docs/FAST-PILOT.md) lists the minimum tests before sharing with classmates. The existing [GitHub correction form](../../issues/new?template=proposal.yml) remains a fallback requiring GitHub login. No-login automatic proposals and human reviewer tools are not yet live.

## Browse the knowledge base

| Information | File | Status |
| --- | --- | --- |
| Shared assignments and dependencies | [Assignments](data/assignments.json) | 55 active provisional Fall 2026 records; 3 old QBA quiz aggregates superseded; 0 reviewer-approved |
| Reading, videos, cases and chapter titles | [Reading & Prep](data/prep.json) | 104 provisional ENT/MGT/QBA items; most QBA modules have no separate prep dates |
| Baylor templates and useful tools | [Resource catalog](data/resources.json) | Candidate entries; check verification fields |
| Student tips and experience | [Lessons learned](data/lessons-learned.json) | Empty |
| Course- and assignment-level AI-use rules | [AI policies](data/ai-policies.json) | Three provisional ENT assignment-specific summaries; no verified permissions, MGT/QBA unknown |
| Class dates, travel and fall courses | [Program calendar](data/program-calendar.json) | 2026–2028 class-date highlights, Fall 2026 blocks, events and payment dates; subject to change |
| Urgent conflicts | [Open alerts](data/open-alerts.json) | None logged |
| Approved change history | [Changes](data/changes.json) | Empty |
| Knowledge revision | [Manifest](data/manifest.json) | Revision 0 |

## Automatic contributions from AI assistants

The [Cloudflare proposal intake prototype](cloudflare/README.md) supports one-time-connected AI assistants submitting suggestions through an MCP tool or an OpenAPI action, directly into a pending review queue. **The Worker is deployed but submission intake is deliberately disabled**. Live agent submission and review tooling are not yet tested; GitHub Issues remain the fallback while intake is closed.

## Owner-only Discord backup monitoring

The separate [backup watchdog Worker](watchdog/README.md) is deployed and scheduled daily. A **Production runtime** Discord webhook secret delivered a successful direct TEST message to the owner's private `backup-alerts` channel, and the temporary test endpoint was removed. **The first unattended scheduled health check, missing-backup scenario and disabled public URL still require owner verification.** The watchdog remains separate from the cohort submission Worker and private R2 backup data.

## Private backups and emergency shutdown

**Required before public AI submissions:** a private owner-only daily backup of the GitHub hub snapshot and D1 queue, seven days of restore points, backup failure monitoring, and a tested restore procedure. The [backup and recovery plan](docs/BACKUP-AND-RECOVERY.md) and [separate owner-only backup Worker source](backup/README.md) are published. The private R2 storage bucket has been created with an eight-day lifecycle rule, and a separate backup Worker has been deployed. After troubleshooting authorization and GitHub archive downloads, the owner verified the first **complete five-step manual backup Workflow**. Daily backup and watchdog schedules **confirmed active in Cloudflare**, and R2 object inspection, D1 schema restore, GitHub ZIP readability, and a direct Discord test have been verified. **First automatic end-to-end cycle, missing-backup scenario, D1 data-row restore and full-history archives remain unverified.** The GitHub ZIP provides a reconstructible daily file snapshot, not a full Git history/Issues archive; broader recovery is a future enhancement. The submission service now defaults to **paused**, with a server-side emergency stop for both MCP and REST clients. The public read-only hub remains available during an incident.

## Contribute

- [Report a change or suggest a resource](../../issues/new?template=proposal.yml) using the guided form (no need to select a GitHub issue type).
- [Change review process](docs/CHANGE-PROCESS.md) explains reports, duplicates, evidence, conflicts, overrides and later multi-reviewer access.
- [AI assistant onboarding](docs/AGENT-ONBOARDING.md) explains freshness checks and how to use personal progress separately.
- [Manual semester import guide](docs/SEMESTER-IMPORT.md) explains what material may be summarized for publication.
- [Architecture and roadmap](docs/ARCHITECTURE.md) explains GitHub and the proposed Cloudflare service.

## Important boundaries

- **No Canvas integrations, calendar feeds, API tokens, Duo workarounds, automated scraping, or logins.** Authorized people manually prepare the public-safe semester data.
- This repository is **public**. Never post personal student progress, contact details, grades, class rosters, private instructor communications, unpublished assessments, copyrighted cases/readings, screenshots of restricted course systems, Baylor employment information, or credentials.
- Link to authorized resources instead of reposting their files. Resource listings are not endorsements or blanket permission to use AI on assessed work.
- Every approved deadline change must distinguish a **presentation/event date** from a **submission deadline**. One changing does **not** imply the other changed.
- A suggestion is **not a verified correction**. Conflicting suggestions remain unresolved until supported by an appropriate source and reviewed. Multiple identical student reports are not independent proof.

## For AI assistants

Read [AGENTS.md](AGENTS.md). Before reporting coursework facts, fetch the latest manifest and relevant public records and disclose if you cannot check. Students should confirm important deadlines using official sources.
