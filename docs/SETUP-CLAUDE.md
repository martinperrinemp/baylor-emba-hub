# Set up your EMBA assistant in Claude

**Start here:** [Dallas EMBA Cohort Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/#get-started). Follow these steps in a browser. Claude Projects keep your study assistant's rules together; Google Sheets editing uses an additional connection.

**You need:** a Google account and a Claude account. Use your own Google Sheet, not the class's blank master. You do **not** need a GitHub account.

## 1. Make your private progress Sheet

Open [Make a copy of the class tracker](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy). In Google's copy window, change the name to **EMBA Personal Progress**, then click **Make a copy**. Open your new file and check **Share**: access should be **Restricted**. You will see 55 assignment rows with blank Status cells.

## 2. Copy the assistant instructions

On the [EMBA Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/#get-started), under Step 2, click **Or copy full text**. That copies the assistant's personality and rules. Prefer a file instead? Download the [instruction .txt file](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/downloads/EMBA-Agent-Instructions.txt), open it, and copy all the text. It is **not** software to install.

## 3. Create a Claude Project and install the instructions

Open [Claude Projects](https://claude.ai/projects), sign in, and click **+ New Project**. Name it **EMBA Planner**. Inside the project, find **Set project instructions** (in the project's knowledge area). **Paste the copied text from Step 2** and choose **Save instructions**. Start a chat **inside this project**. Putting the text only in the Project description will not work.

## 4. Connect Google Drive AND Google Sheets

In the Claude chat, click **+** → **Connectors**. Turn on **Google Drive** to find your file and **Google Sheets** for live editing, if available. Sign in with the Google account that owns your copy and approve permissions. These are **separate connectors**, so Drive access by itself may only let Claude read.

## 5. Find your own copy

In your Project chat, ask: *“Find my Google Sheet EMBA Personal Progress and read the headings on its Progress tab. Do not edit.”* If needed, paste the link to **your private copied Sheet** into the chat; Claude can open supported Google Sheets in a side pane. Make sure you see the four headings, not somebody else's file.

## 6. Test the update

Use the fictional test prompt below. Claude may ask you to approve an edit. Verify TEST-001 in the actual Sheet, then start a **new Project chat** and ask for its saved status. For live editing, Claude currently supports its web file pane in **Chrome** (and supported Claude Desktop setups). If Google Sheets editing is missing, use your Sheet manually instead.

## 7. Start the weekly plan

Ask the weekly planning question below. Later, tell Claude when you've really submitted something; trust “saved” only after checking your private Sheet.

## Copy/paste test question

> In MY private Google Sheet named EMBA Personal Progress, add one fictional row named "Test only" with ID TEST-001, then set Status to "In progress" and Last Updated to the current date and time. Read those two cells back and tell me if the edit really saved. Do not change any real assignments or the publicly shared class template.

## First weekly planning question

> What do I need to complete before our next class weekend? Check the latest EMBA Hub deadlines and readings. Use my private Sheet for confirmed progress, and flag any unverified dates.

## If you get stuck

Claude Projects are available on Free, but live Sheet editing features can vary by account and beta rollout. The optional Claude sidebar inside Google Sheets is a different, paid-plan extension. You do not need to install that extension to try Claude's chat connectors. If connecting or updating fails, you can still ask for a plan and change your own Google Sheet manually. The assistant must not say “saved” unless it can read the new value back. **Canvas and instructors have the official deadlines.**

[Claude's official Google Workspace connection guide](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors) · [Return to EMBA Hub](https://baylor-emba-proposals.martin-perrine-mp.workers.dev/#get-started)

*Independent student-run tool, not a Baylor-operated service.*
