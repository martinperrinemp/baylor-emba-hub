# EMBA Cohort Hub | Active roadmap

**Updated: October 17, 2026.** The Hub is an unofficial, student-led resource for the Baylor MBA in Dallas Class of 2028. It will become an **AI-first cohort resource center**: assistants plan each student's week from shared public sources and the student's own private progress Sheet; the website emphasizes announcements, useful contributions, and student benefits.

**Platform update (October 20, 2026):** The owner tested both ChatGPT and Claude end-to-end in the specified onboarding setups; Claude Free also worked. Gemini is **unsupported** after failed live academic data retrieval and unreliable private Google Sheet updates. The public Hub promotes ChatGPT and Claude only; the old Gemini page displays an unsupported notice. Gemini documentation is kept for historical reference, not recommended to students. Independently verify coursework dates against Canvas; the published Fall records remain provisional and `knowledge_revision` remains 0. The GitHub correction form remains available, and Cloudflare proposal intake is paused.

## Priority roadmap

| Priority | Initiative | What success looks like |
| --- | --- | --- |
| **1 (pilot underway)** | **Finish real-student onboarding and academic QA** | Two or three classmates follow a guide unaided, keep their Google Sheet private, and get a useful 7/14-day plan. Check upcoming 2–4 weeks against Canvas and verify mobile links, permissions and test edits. |
| **2 (next build)** | **Deadline change approvals + optional Discord alerts** | A classmate submits a GitHub Issue; owner verifies an instructor change and approves a versioned assignment update with old/new dates and source note. Hub and AI-readable `data/changes.json` reflect the approved update; an opt-in **cohort** Discord channel posts one confirmed alert. |
| **3** | **Cohort Tips & Resources knowledge base** | Students propose practical study tips, tools and links; owner reviews and publishes source-attributed, topic/course-tagged records for the website and AI. |
| **4** | **Student Deals & Benefits** | A separate AI-readable listing includes offer link, eligibility, discount/benefit, checked-on and expiry dates, renewal caveats, and clear active/expired/unverified status. Members can propose deals for owner review. |
| **5** | **Reorganize the homepage** | Order: **Get Started → Announcements & Discord → Tips & Resources → Student Deals → Academic Reference → Submit a Contribution**. Move dense class/reading/assignment lists lower, but keep public files and source-aware AI access. |
| **6 (before Spring 2027)** | **Semester rollover** | Reuse this Hub/repository. Import new syllabi and course dates, publish a new blank progress Sheet, preserve old terms, and give each student a new semester-specific AI Project/Gem. |

## Submission and safety principles

- Use the [existing GitHub Issue form](../.github/ISSUE_TEMPLATE/proposal.yml) for change reports, useful resources and lessons during the pilot; it requires a GitHub account. Reports **never update approved records automatically**. Owner verifies official evidence and approves meaningful changes before publishing.
- Later provide a no-GitHub submission form, but the existing Cloudflare queue stays **`INTAKE_ENABLED=false`** until private backup, access control, spam handling and recovery tests pass. Do not expose production keys or introduce automatic publishing.
- An approved deadline update preserves the assignment ID, changes the exact date field (submission vs presentation), records previous/new values and revision in `data/changes.json`, and records unresolved credible conflicts in `data/open-alerts.json`. Student completion statuses remain in their own private Sheets.
- A dedicated **cohort Discord alerts channel** is optional. Its secret must be separate from any operations/backup Discord webhook. Notify only for owner-approved significant changes; suppress duplicates and disclose delivery failures.
- Publish only shareable cohort knowledge: no grades, roster, private progress, protected Canvas links, copyrighted readings, private professor messages or personal details without permission.
- Deals must cite their official source, flag expired eligibility, and disclose possible subscription renewals. AI assistants should be able to read all approved public sections; a Project does not automatically watch for changes.

## Codex workflow

We are adopting **Codex Cloud for coding** while this EMBA ChatGPT Project remains the planning/review workspace. Connect the same GitHub repository using [Codex setup instructions](CODEX-SETUP.md). Codex reads root [AGENTS.md](../AGENTS.md), this roadmap and relevant docs. Build **one scoped feature at a time**, run tests, and create a PR for review. **Do not auto-merge, deploy, enable intake, or change production credentials.** No need to migrate conversation histories or grant Codex access to students' private Google Sheets.

**First candidate Codex task:** inspect and propose the smallest safe owner-approved deadline-change publication and Discord notification implementation, preserving the existing GitHub Issues path and disabled Cloudflare intake. Start with a read-only assessment, not production changes.

## Later, only if proven useful

Automated course-change detection, non-GitHub user intake, course-resource search, recurring digests, more reviewers, and advanced semester import tooling. Avoid student accounts or central progress databases without a demonstrated need.

**Historical implementation notes:** [Roadmap snapshot](ROADMAP-HISTORY-2026-10-17.md) · [Operations handoff](PROJECT-HANDOFF.md) · [Change approval process](CHANGE-PROCESS.md).
