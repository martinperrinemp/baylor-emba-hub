# Set up your EMBA assistant in Claude

**Baylor EMBA · 2028 Cohort**

About 15 minutes. Do this on a laptop or desktop in Chrome.

By the end you'll have a private progress Sheet, a Claude Project named **EMBA Planner** that knows the cohort rules, and a connection to your Sheet with a verified save test.

## What you need

- A Claude account (paid Pro or higher recommended, Free supported)
- A Google account
- Chrome on a laptop or desktop, or the Claude Desktop app with its built-in browser enabled

No GitHub account, coding, or previous AI experience is needed.

**Why a paid plan?** Weekly planning can mean long chats. Higher usage limits make interruptions less likely. Free supports Projects and Google connectors; live Sheet editing is a beta feature that may not be available or reliable for every account. See [Claude plans and prices](https://claude.ai/pricing).

## Step 1: Make your private progress Sheet

Open [Make a copy of the class tracker](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy). Rename it **EMBA Personal Progress** before clicking **Make a copy**. In your copy, click **Share** and confirm **Restricted**.

**Check:** The **Progress** tab has **55 assignment rows**, with **Assignment · ID · Status · Last Updated**. Status and Last Updated are blank until confirmed. See **START HERE**. Use only **Not started** (when confirmed), **In progress**, **Finished not submitted**, **Submitted**, **Blocked**. Do not edit the class template.

## Step 2: Create your Claude Project

Open [Claude Projects](https://claude.ai/projects), click **+ New project**, name it **EMBA Planner**. On the [EMBA Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/#get-started) click **Copy full text** under Step 2, or copy the entire [instructions .txt file](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/downloads/EMBA-Agent-Instructions.txt). In your project select **Instructions → Set project instructions**, paste, and **Save instructions**.

**Check:** The instructions are saved inside **EMBA Planner**. Start every EMBA chat inside this project. The file is plain text, not software.

## Step 3: Connect Google

Open a new chat inside **EMBA Planner**. Click **+ → Connectors** and enable **Google Drive** and **Google Sheets** separately. Connect the Google account that owns your copy and approve its permissions. Drive searches/reads and Sheets enables editing.

**Check:** Both connectors are enabled. Claude can only access files available to the account you connected.

## Step 4: Open your Sheet in Claude

Paste **your own Sheet link** in the chat and send:

> Open this Google Sheet and read me the column headings on the Progress tab. Do not edit anything.

**Check:** The Sheet appears beside the chat in supported Chrome/Claude Desktop setups. If prompted, sign in with the same Google account. Confirm the four headings match Step 1. Otherwise verify the link; use **Open in Google** on the file card if no pane opens.

## Step 5: Test that saving works

Copy this exact test prompt:

> In MY private Google Sheet named EMBA Personal Progress, add one fictional row named “Test only” with ID TEST-001, then set Status to “In progress” and Last Updated to the current date and time. Read those two cells back and tell me if the edit really saved. Do not change any real assignments or the publicly shared class template.

**Check:** Approve the edit if prompted. Verify TEST-001 in your actual Sheet with Status and Last Updated filled in. In a **new chat in the same project**, ask “What is the status of TEST-001?” Claude should read it back. During the semester, always check the actual Sheet before trusting a “saved” claim.

## Step 6: Clean up and start planning

Delete the TEST-001 row, or ask Claude to. Then ask:

> What do I need to complete before our next class weekend? Check the latest EMBA Hub deadlines and readings. Use my private Sheet for confirmed progress, and flag any unverified dates.

**Check:** TEST-001 is gone. For real submissions tell Claude “I submitted the MGT 5311 Engagement Reflection,” and check the resulting Sheet edit. Your copied Sheet is a snapshot; it does **not** auto-sync. When new assignments appear on the Hub, ask Claude to add them.

## How Claude finds the current dates

The Hub home page loads its deadline cards with JavaScript. Claude might receive “Checking…” placeholders rather than actual records. It should read public source data directly, without executing JavaScript:

- [Assignment submission deadlines](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/assignments.json): submission_due_at; presentation_at where present.
- [Readings and preparation](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/prep.json): due_or_discuss_date is not necessarily a submission deadline.
- [Class schedule](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/program-calendar.json): session dates.
- [Publication state](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/manifest.json): current knowledge_revision.
- [Approved changes](https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/changes.json): published changes where available.

There is also a [Hub-hosted assignments JSON endpoint](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/api/public/assignments.json) as a fallback if Claude cannot access the raw GitHub file. These URLs expose public course data only; your personal Google Sheet remains private.

**Important:** The personal Sheet has assignment IDs and statuses, not dates. Match IDs to identify new or unmatched assignments. To determine whether a deadline changed, Claude needs a previously saved Hub snapshot or an actual change record; comparing against the status-only Sheet cannot reveal date changes. Most current assignment and prep records are provisional, so confirm with Canvas/instructors.

**Optional Claude project instruction addendum:**

> When planning my EMBA work, read current public source files directly: https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/assignments.json for due dates and https://raw.githubusercontent.com/martinperrinemp/baylor-emba-hub/main/data/prep.json for readings. Use program-calendar.json for class sessions, and manifest.json plus changes.json for publication and changes. Do not use "Checking..." placeholders on the Hub webpage as evidence. My private EMBA Personal Progress Sheet owns Status and Last Updated, not deadlines. Match IDs exactly, ask before adding or modifying rows, and never invent an update. A changed due date needs an earlier Hub version or an actual change record; do not claim to detect changes by comparing dates with my status-only Sheet. Mark provisional dates as unverified, and defer to Canvas and instructors.

**Check:** In a new chat inside EMBA Planner, ask: “From the current public assignments.json file, what is the next upcoming submission deadline? Give its title, Central time, and verification status. Do not use the Hub homepage’s loading text.” Claude should cite a real record rather than a placeholder.

## If something goes wrong

| Problem | Fix |
| --- | --- |
| Claude can't find the Sheet | Paste your private Sheet link instead of searching by name. |
| Sheet won't open beside chat | Use Chrome on a laptop/desktop, or **Open in Google** on the file card. |
| Claude says it can't edit | Enable **Google Sheets**, not just Drive, under **+ → Connectors**; otherwise edit manually. Claude can still help plan. |
| Asked to reconnect Google Drive | **Customize → Connectors**; disconnect and reconnect on next use. |
| Claude ignores cohort rules | Open a new chat inside **EMBA Planner**. |
| Claude can't open the Hub | Enable web search and ask Claude to use it. |

Live Sheet editing is a beta. Your private Sheet remains the source of truth. See [Claude's Google Workspace help](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors).

## Privacy and good habits

- Keep your private Sheet **Restricted**. It tracks statuses only, not grades, points, personal names, or private Canvas links.
- Never share your filled tracker with public GitHub or the correction form.
- On personal Claude plans, chats may be used for model improvement if allowed in privacy settings.
- Canvas, current syllabi, and instructors take precedence. **Unknown AI-use permission does not mean allowed.**

Independent, student-run resource for the Baylor EMBA, 2028 Cohort. Not operated by Baylor University.
