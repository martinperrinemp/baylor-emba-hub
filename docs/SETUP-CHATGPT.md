# Set up your EMBA assistant in ChatGPT

**Baylor EMBA · 2028 Cohort**

Use the [guided ChatGPT setup page](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/chatgpt) for beginner-friendly, one-action-at-a-time onboarding. If you prefer to follow written directions without a chat assistant, use the [full written ChatGPT setup guide](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/chatgpt-manual).

## The guided path

1. Make your own [private copy of the approved class tracker](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy), rename it **EMBA Personal Progress**, and check **Share → Restricted**. Never edit the public class template or share your filled tracker with classmates.
2. On the [ChatGPT setup page](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/guides/chatgpt), select **Copy setup prompt**. If copying isn't supported, download the same [EMBA-ChatGPT-Setup-Prompt.txt](../cloudflare/public/downloads/EMBA-ChatGPT-Setup-Prompt.txt). The button, download and prompt preview all use that single plain-text file.
3. Paste the prompt into a **new ordinary ChatGPT chat**, not into Project instructions. ChatGPT will walk through setup and wait for your replies (`done`, `stuck`, `back`).
4. ChatGPT will help you create a **private Project named EMBA Planner** and put the separate permanent [EMBA-Agent-Instructions.txt](../cloudflare/public/downloads/EMBA-Agent-Instructions.txt) into the Project's **Project settings → Instructions** field. These are different from the temporary setup prompt.
5. If available to your plan and account, connect **Google Drive** through Settings → Plugins (or Apps in some versions). Supported Google Docs/Sheets/Slides actions are available through Google Drive. Review OAuth permissions. **A connected account does not guarantee live Sheet edits**.
6. Provide only your private Sheet's URL in the private chat. Read its `START HERE` and `Progress` tabs. The starter has **55 assignment rows** under **Assignment | ID | Status | Last Updated**; later rows may exist. Blank progress means unconfirmed.
7. Only after explicit permission, test a fictional **TEST-001** row, reading back both `Status` and a real `Last Updated` timestamp. Verify it in a fresh EMBA Planner chat using the live Sheet, and test date retrieval against the public Hub. Ask permission before deleting the test row and verify the exact ID was removed.

## Academic and personal data boundaries

The **public GitHub catalog** supplies coursework details, while the **private Sheet** supplies personal progress, matched by exact assignment ID. The Sheet does **not** contain deadlines and cannot tell you whether a deadline changed. Canvas and instructors have final authority, and unverified Hub records must be flagged.

For dates without JavaScript, assistants should open [assignments.json](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/assignments.json), [prep.json](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/prep.json), [manifest.json](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/manifest.json), and [open-alerts.json](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/open-alerts.json). Ignore records marked `record_status=superseded_aggregate`; dates associated with class preparation are not automatically graded submission deadlines.

Allowed personal statuses: **Not started** (when confirmed), **In progress**, **Finished not submitted**, **Submitted**, **Blocked**. No grades, points, personal names or Canvas private links belong in the Sheet or public Hub. Never infer submissions. Never claim "saved" without rereading the live changed cells. If Google Drive access/write permissions aren't available, you can update your own Sheet manually and still use your Project for planning.

Resources: [OpenAI Projects](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) · [Google Drive app setup](https://help.openai.com/en/articles/10929079-google-drive-app-and-setup-in-chatgpt) · [Connected apps](https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt).

## QA prior to public rollout

Confirm the guided page shows 3 steps and is usable without JavaScript (except clipboard). On Free and at least one paid ChatGPT account, verify the actual Project UI, Google Drive availability, private read and optional write/read-back, a fresh Project chat's TEST-001 retrieval, its cleanup, and real Hub date retrieval. Do not treat a file preview, tool connection, or written prompt as evidence that live writing works. Note and use the manual fallback where necessary.

*Independent, student-run Baylor EMBA, 2028 Cohort resource. Not operated by Baylor University.*
