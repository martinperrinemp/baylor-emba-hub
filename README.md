# Baylor EMBA Cohort Knowledge Hub

**Unofficial, student-maintained resource. Not operated by or endorsed by Baylor University.**

This public repository gives the Dallas Executive MBA cohort and compatible AI assistants **one shared source** for approved coursework metadata, deadlines, resources, lessons learned, AI-use guidance, and change alerts. **Canvas, current course syllabi, and instructor communications are authoritative. Each student is responsible for independently verifying deadlines and submissions.**

> **Build status:** Foundation v0.1 (October 10, 2026). Shared data files, contribution workflow, tests, and a local conflict-reconciliation prototype are ready. The assignment catalog has **not** been populated or verified. Cloudflare agent-submission service **source code** is now published, but the service, reviewer logins, notifications, and AI review are **not deployed**.

## Browse the knowledge base

| Information | File | Status |
| --- | --- | --- |
| Shared assignments and dependencies | [Assignments](data/assignments.json) | Empty, awaiting authorized semester import |
| Baylor templates and useful tools | [Resource catalog](data/resources.json) | Candidate entries; check verification fields |
| Student tips and experience | [Lessons learned](data/lessons-learned.json) | Empty |
| Course- and assignment-level AI-use rules | [AI policies](data/ai-policies.json) | Unknown until verified |
| Urgent conflicts | [Open alerts](data/open-alerts.json) | None logged |
| Approved change history | [Changes](data/changes.json) | Empty |
| Knowledge revision | [Manifest](data/manifest.json) | Revision 0 |

## Automatic contributions from AI assistants

The [Cloudflare proposal intake prototype](cloudflare/README.md) supports one-time-connected AI assistants submitting suggestions through an MCP tool or an OpenAPI action, directly into a pending review queue. **It is source code only, not a live endpoint yet.** GitHub Issues remain the fallback until deployment and review tooling are tested.

## Private backups and emergency shutdown

**Required before public AI submissions:** a private owner-only daily backup of the full hub and D1 queue, seven days of restore points, backup failure monitoring, and a tested restore procedure. The [backup and recovery plan](docs/BACKUP-AND-RECOVERY.md) is documented; daily backup jobs and storage are **not deployed yet**. The submission service now defaults to **paused**, with a server-side emergency stop for both MCP and REST clients. The public read-only hub remains available during an incident.

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
