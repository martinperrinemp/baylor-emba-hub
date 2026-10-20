# Set up your EMBA assistant in Google Gemini

**Baylor EMBA · 2028 Cohort**

Start with the [guided Gemini setup page](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/gemini), matching the three-step ChatGPT/Claude experience. For an independent walkthrough, use the [full written six-step Gemini guide](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/gemini-manual).

## Guided student flow

1. Open the approved [blank tracker copy link](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy), name the personal copy **EMBA Personal Progress**, and make sure Share says **Restricted**. Never edit the class template.
2. At the [Gemini guide](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/gemini), click **Copy setup prompt**. The button, expandable preview and **Download the .txt file** all read the same static [EMBA-Gemini-Setup-Prompt.txt](../cloudflare/public/downloads/EMBA-Gemini-Setup-Prompt.txt). There is no second hard-coded copy.
3. Paste the setup prompt into a regular new Gemini chat at [gemini.google.com](https://gemini.google.com). It guides the student **one action at a time**, responding to `done`, `stuck`, `back`, `copied`, and questions. It is temporary onboarding text, **not** permanent instructions.
4. With the guide, connect **Google Workspace** to the same Google account that owns the private Sheet, confirming any requested permissions. Check read-only access to **Progress** (Assignment | ID | Status | Last Updated). The template starts with 55 active records. A different count alone is not a wrong file.
5. Create a private Gemini **Gem** called **EMBA Planner**, using the **entire, unchanged** [EMBA-Agent-Instructions.txt](../cloudflare/public/downloads/EMBA-Agent-Instructions.txt) as its permanent Instructions. If supported, attach only the student's own Sheet from Google Drive under Gem **Knowledge → Add files → Add from Drive**. Do not replace the approved instructions with a shorter Gemini-generated set. If Gemini rejects the full text for a character limit, the guided assistant offers an explicit fallback: save the exact full file privately as Gem Knowledge plus a short instruction pointing to it, and verify the Knowledge attachment. This fallback does not constitute a verified identical installation of long instructions. Attaching Drive Knowledge may require enabling Google Keep Activity; explain that choice rather than changing the student's setting.
6. Start a new Gem chat to verify private status retrieval, then test actual assignments from the public Hub JSON files. Ignore superseded aggregate entries, mark provisional dates as unverified and confirm deadlines in Canvas.
7. Explain that a Gem reading a spreadsheet does **not** prove it can write to it. Students can manually update their private Sheet, or if their account supports it, use the **Ask Gemini** side panel inside Google Sheets on desktop to review and apply an edit. A fictional `TEST-001` add/readback/delete test is strictly optional and requires explicit student permission. Do not write or delete any real rows during setup.

## Current Gemini product caveat

Google's [Gem migration notice](https://support.google.com/gemini/answer/18560919) says custom Gems for personal accounts begin transitioning to **Skills** in **November 2026**; work/school accounts transition later. Since menus and Knowledge support may change, the onboarding prompt instructs Gemini to ask the user what is visible and adapt to verified controls. Do not promise Skills identical behavior before it is actually available.

Official help: [Create and manage Gems](https://support.google.com/gemini/answer/15146780) · [Gemini in Google Sheets](https://support.google.com/docs/answer/14356410) · [Gemini privacy](https://support.google.com/gemini/answer/13594961).

## Data ownership, access and release checks

The private student Sheet contains **statuses only**, not deadlines, grades, classmate names or Canvas private links. Allowed status values: **Not started** (only if confirmed), **In progress**, **Finished not submitted**, **Submitted**, **Blocked**. Blank means *unconfirmed*, not *late*. Student reports of finished do not mean submitted. Status + real Last Updated are both required for a saved update.

The publicly readable `data/assignments.json`, `data/prep.json`, `data/program-calendar.json`, `data/manifest.json` and `data/open-alerts.json` are the data sources when accessible; the JavaScript-loaded Hub placeholders are not evidence of dates. Canvas/syllabus/instructor override them. No public Hub, external service, or other student may receive a student's private Sheet.

Test the three-step guide on desktop and mobile without JavaScript except the Copy button, test the clipboard/download/preview against the exact same file, ensure the manual guide works, and use real Gemini Free and paid accounts to test Gem creation, permission prompts, Drive-backed Knowledge, live reads, optional Sheets editing, and manual fallback. Do not declare untested account capabilities verified.

*Independent, student-maintained cohort resource. Not operated by Baylor University.*
