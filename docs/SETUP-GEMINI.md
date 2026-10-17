# EMBA Assistant setup: Google Gemini (Google AI Pro)

**Suggested for students who want the most integrated Google Sheets experience.** A paid or eligible Google AI Pro subscription offers access to Gemini features in Google Workspace, but **Gemini chat/Gems and Gemini in Google Sheets are not identical**. The normal Gemini Gem conversation has not been independently shown to write directly to the tracker. Gemini in Sheets can propose and apply changes within the Sheet on eligible accounts. Verify the edit instead of assuming a background sync.

## Student offer (US)

[Claim the student Google AI Pro offer](https://gemini.google/us/students/) or [see Google eligibility rules](https://support.google.com/googleone/answer/17422238?hl=en).

As of October 2026, **eligible U.S. higher-education students** (including Baylor students who satisfy Google's criteria) can get **12 months of Google AI Pro at no cost**, through **December 31, 2026**. You need to verify enrollment (SheerID), use an eligible **personal Google account**, and provide a qualifying payment method. **Unless cancelled, the membership renews at Google's then-applicable paid price after the promotional year**. Check Google's terms before enrolling. This is a Google offer, **not a Baylor-specific guarantee**.

## Step 1: Make your own private progress tracker

1. Open the [Dallas EMBA Progress Tracker - Make a copy](https://docs.google.com/spreadsheets/d/1PmvyTZAUdKsK27lK45FF8lXPSCMwpctZ-Cuy4_17bwc/copy).
2. When Google's **Copy document / Make a copy** dialog appears, **rename the new file to `EMBA Personal Progress` before pressing Make a copy**. If you've already saved it, rename the file in Google Sheets now.
3. Open **Share** on your **own new copy** and make sure it is **Restricted/private**. Do not type personal progress into the publicly viewable class master.
4. In your copy, the **Progress** tab has `Assignment | ID | Status | Last Updated`; titles and IDs are already filled, statuses and timestamps are intentionally blank. **Blank means unconfirmed**, not “not started.”

## Step 2: Download the EMBA personality text file

Open [EMBA Agent Instructions (.txt)](../cloudflare/public/downloads/EMBA-Agent-Instructions.txt) and **copy its entire text**. This is *not* an executable app, plugin, spreadsheet or file you need to install on your computer. You'll **paste it into the assistant's custom instructions** in Step 3.

## Step 3: Set up your assistant in Gemini

For October 2026 Gemini, the closest equivalent to a ChatGPT/Claude Project is a **Gem**, which stores a reusable set of custom instructions. Google has announced that personal-account Gems will transition to **skills** beginning in November 2026, so the interface name may change.

1. Open [gemini.google.com](https://gemini.google.com/) in your browser, signed in to the Google account you want to use.
2. Open the sidebar → **Gems** (sometimes under Settings and help) → **New Gem**.
3. Name it **Dallas EMBA Planner**.
4. Paste the **entire EMBA-Agent-Instructions.txt text** into the Gem's **Instructions** field. This is the critical setup step. Do **not** paste the instructions into a mere title/description, and don't upload them to the public class Hub.
5. Optionally, under **Knowledge**, add a public Hub link or other resources allowed by your instructor. If you attach a Drive file as Knowledge, Gemini may use its latest version for reference, but **adding it as Knowledge does not grant reliable write access**.
6. Press **Save**. Start a chat with your new **Dallas EMBA Planner** Gem.
7. Ask: “Check the current Baylor EMBA Hub course calendar and assignment/prep lists. What should I finish before the next class weekend? Clearly flag provisional information.” Gemini needs live web/Workspace access for fresh checks; ask it to disclose failures.

## Step 4: Connect Google Workspace and test the progress Sheet

**Reading in Gemini Apps:** Google Workspace can be connected through Gemini's Connected Apps controls if the account/admin settings permit it. Sign in to the Google account that owns **your** `EMBA Personal Progress` Sheet. Ask your Gem to locate and read it. **This does not prove a Gem can edit it.**

**Editing in Google Sheets:** Open **your personal copied Sheet** on a desktop with an eligible Google AI/Workspace account. Use **Ask Gemini / Gemini in Sheets** in the top-right side panel. If your saved Gem is available in the Workspace side panel, select it there; otherwise use Gemini in Sheets directly while following the same EMBA instructions. Tell it:

> Find only the fictional `TEST-001` row in this personal Sheet (or add exactly one new fictional TEST-001 row). Set its Status to "In progress", update Last Updated, and show me the exact changed cells. Do not touch any real assignments.

When Gemini provides a change preview, **review it and click Apply if required**. Refresh the Sheet and confirm the Status and timestamp cells. Then try the same in a new conversation and see whether it can read the new values.

**Important platform distinction:** Google documents robust editing in the **Gemini in Sheets side panel**, not guaranteed autonomous editing of a Google Sheet from every standard Gem chat. If the ordinary Gem chat cannot update your Sheet, keep using the Gem for planning and the Sheets side panel for status edits. The two experiences are not interchangeable.

## Step 5: Start your weekly plan

In your saved Gem, try:

> Check the latest public Dallas EMBA Hub calendar, Fall course assignments, and readings. Read my own private `EMBA Personal Progress` Sheet if connected. Make a realistic 7/14-day checklist of work before the next class weekend. Keep personal status private, highlight the difference between finished and submitted, and distinguish exact Canvas deadlines from suggested early targets.

If Gemini cannot read your private Sheet from this chat, paste the relevant status rows or update them in Google Sheets first. Never claim a change saved if you haven't verified it.

## Study quality and privacy

- The shared Hub contains student-supplied, **provisional** metadata. Canvas, current syllabi and instructor messages are authoritative.
- **Do not share your copied Sheet with the class**. Only the empty master is publicly available.
- The tracker records progress **statuses only**, not grades, percentages or score calculations.
- Gemini in Sheets editing may depend on region, account type, subscription, administrator and feature availability.
- These steps describe Google features available in October 2026 and will need review when Gems become skills.

## Sources

- [Google: Using Gems](https://support.google.com/gemini/answer/15146780?hl=en)
- [Google: Connect Workspace to Gemini](https://support.google.com/gemini/answer/15229592?hl=en)
- [Google: Edit spreadsheets with Gemini in Sheets](https://support.google.com/docs/answer/16959434?hl=en)
- [Google: Perform actions in Sheets with Gemini](https://support.google.com/docs/answer/14356410?hl=en)
- [Google: Student AI offer and requirements](https://support.google.com/googleone/answer/17422238?hl=en)
