# Baylor EMBA Cohort Knowledge Hub

**Unofficial, student-maintained resource. Not operated by or endorsed by Baylor University.**

This public repository gives the Dallas Executive MBA cohort and compatible AI assistants **one shared source** for approved coursework metadata, deadlines, resources, lessons learned, AI-use guidance, and change alerts. **Canvas, current course syllabi, and instructor communications are authoritative. Each student is responsible for independently verifying deadlines and submissions.**

> **Build status (Oct 13, 2026):** **Read-only classmate landing page LIVE, visually verified on Android (owner screenshot October 13, 2026).** The existing `baylor-emba-proposals` Worker hosts a responsive public hub and a read-only public GitHub data endpoint, while **`INTAKE_ENABLED=false`** keeps automatic proposals paused. The owner has verified a manual full backup, an isolated D1 schema restore, readable GitHub ZIP, a daily backup and Watchdog schedule, and a Discord test message. **First unattended backup/watchdog cycle and missing-backup alert are not yet verified.** The hub now includes **40 provisional Fall 2026 assignment/deadline candidates, 46 provisional ENT/MGT Reading & Prep items, and three source-attributed provisional ENT AI-use notes** imported from the student-prepared semester materials; **none are independently verified against current official instructions**, and shared knowledge revision remains 0. See the [fast pilot checklist](docs/FAST-PILOT.md) and [live project handoff](docs/PROJECT-HANDOFF.md).

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
| Shared assignments and dependencies | [Assignments](data/assignments.json) | 40 provisional Fall 2026 dates imported; 0 officially verified |
| Reading, videos, cases and chapter titles | [Reading & Prep](data/prep.json) | 46 provisional ENT/MGT items; preparation dates do not necessarily represent graded due dates |
| Baylor templates and useful tools | [Resource catalog](data/resources.json) | Candidate entries; check verification fields |
| Student tips and experience | [Lessons learned](data/lessons-learned.json) | Empty |
| Course- and assignment-level AI-use rules | [AI policies](data/ai-policies.json) | Three provisional ENT assignment-specific summaries; no verified permissions, MGT/QBA unknown |
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
