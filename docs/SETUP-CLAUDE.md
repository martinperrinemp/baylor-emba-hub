# EMBA Assistant setup: Claude

**For students using Claude, including Free accounts.** Claude's Projects are available on Free plans, but Google Workspace read/write and editing options can differ depending on account, interface and enabled connectors. This workflow has **not yet passed an independent Claude Free write-and-readback pilot**.

## Before you start
- Open the [public EMBA Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/).
- [Make a private copy of the class blank Google Sheet](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy). Call your copy **EMBA Personal Progress**. Never edit/share the cohort's view-only template.
- [Get the EMBA Agent Instructions](../cloudflare/public/downloads/EMBA-Agent-Instructions.txt).

## Setup
1. Open Claude and create a **private EMBA Project**. Paste the full downloaded instructions into the Project's custom instructions. If instructions or project knowledge are unavailable, paste them into your private planning conversation.
2. Give Claude the public Hub URL. It should consult shared calendar, readings and assignments for weekly planning; flag records it cannot retrieve or verify.
3. Enable available **Google Workspace / Google Drive / Google Sheets** connectors through Claude's chat tools or connector settings as supported by your account. Log in with the Google account that owns YOUR copy. Google Drive file browsing and live Google Sheets editing may use separate connectors. Features may be in beta and may be disabled on some accounts.
4. Ask Claude to locate your own private **EMBA Personal Progress** Google Sheet and **read only** the first few Progress rows. Check that it found YOUR copy.
5. **Test editing with a fictional TEST-only row.** Ask to update both status and Last Updated, then read it back. Start a brand-new chat inside the same Project, read it again and confirm persistence. If an edit action isn't available, do not assume Claude made changes.
6. Use the [common prompt pack](../cloudflare/public/downloads/EMBA-Common-Prompts.txt): "What must I do before class this weekend?" and "I submitted [assignment]—update and verify my private tracker."

## If live Sheet editing is unavailable
Use Claude to plan from the Hub and from a **manual private status list**. You can edit your own Google Sheet directly and paste relevant status rows into the conversation. Alternatively, keep an ongoing Progress chat with an occasional explicitly saved private checkpoint in Project knowledge. This manual fallback should be stated clearly; it is **not** automatic read/write.

## Notes for a safe pilot
- Claude Free Projects are available, but limits apply. As of the current official Claude help, Google Workspace connectors are generally available to Claude users; **direct editing in a typical Free Project chat still needs an actual test**. The *Claude sidebar extension inside Google Sheets* is a distinct offering, which may require a paid plan; do not conflate the sidebar with the chat connector.
- Never store grades, scores, personal teammates, or restricted Canvas material in the public Hub.
- Only state that a Sheet was saved after a verified read-back, and don't mistake **Finished, not submitted** for **Submitted**.
- Respect source freshness, current Canvas instructions, and course AI policies.
