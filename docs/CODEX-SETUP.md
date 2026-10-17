# Connect the EMBA Hub to Codex Cloud

**Goal:** Use Codex to make and test code changes in the **existing** public GitHub repository. Keep the EMBA ChatGPT Project for decisions, reviews and the owner’s *private* schoolwork. You do **not** need to migrate chats, Google Sheets, Cloudflare credentials, or personal data into Codex.

## One-time setup (web browser, including mobile)

1. Open [Codex](https://chatgpt.com/codex) or select **Codex** from ChatGPT's sidebar. Sign in with your normal ChatGPT account. If Cloud tasks are missing, confirm that Codex Cloud is available on your plan/workspace.
2. In Codex, open **Environments** / **Manage Environments** and choose to **connect GitHub** if prompted. Approve the GitHub authorization yourself. Grant repository access to **`martinperrinemp/baylor-emba-hub`** (not all your repositories unless you intentionally want that).
3. **Create an environment** for `martinperrinemp/baylor-emba-hub`, using the default branch `main`. Suggested name: **Baylor EMBA Hub**. Start with default Cloud settings; don't add Cloudflare or Google tokens/secrets.
4. Confirm the environment can see root [AGENTS.md](../AGENTS.md), [ROADMAP.md](ROADMAP.md) and `cloudflare/package.json`. If the repository is missing, revisit GitHub's app/repository authorization or environment selection. ChatGPT's GitHub access does not by itself prove Codex Cloud has its own environment ready.
5. Start with the **read-only task** below, using **Ask** mode if offered. After its review, give Codex one small implementation task at a time. Use **Code** mode to create a branch and PR. Review the diff and tests before any merge; never allow an automatic production deployment without checking the Cloudflare pipeline.

**No desktop installation required:** Codex Cloud tasks run remotely and may be resumed from web/mobile. A local Codex CLI or IDE extension is optional, not required for this EMBA workflow.

## First task to paste into Codex (READ ONLY)

> You are working on `martinperrinemp/baylor-emba-hub`, our public student-led Baylor MBA in Dallas cohort hub. Read the applicable root `AGENTS.md`, the active `docs/ROADMAP.md`, `docs/CHANGE-PROCESS.md`, and inspect only the code relevant to changing approved course dates and showing approved changes in the public Hub. We want to add optional Discord notifications **only after an owner-approved and published change**. Review the existing GitHub Issues intake, `data/assignments.json`, `data/changes.json`, `data/manifest.json`, the Cloudflare public read API, and current tests. Propose the **smallest safe first coding PR**, with files to change, exact acceptance tests, and how to prevent duplicate Discord messages. Do not edit files, open a PR, deploy, change configuration, enable intake, connect external services or ask for secrets yet. Explain any blockers and stop for approval.

## The coding workflow after that review

- **Product direction:** Make feature decisions and priorities in our existing EMBA ChatGPT conversation; update `docs/ROADMAP.md` when decisions become accepted scope.
- **Implementation:** Give Codex an individual well-defined feature or fix. Read root `AGENTS.md` and relevant docs. Run checks: `cd cloudflare && npm test && npm run check` (as dependencies/environment permit), plus relevant data/schema and browser tests. Record any checks that cannot run.
- **Review:** Codex returns a GitHub PR with changed-file summary, tests, limitations and any security/deployment considerations. The owner reviews and explicitly approves before merge. **Cloudflare may deploy on merges to `main`**, so treat merging as a production-affecting step until verified.
- **Safety:** No private students' Sheets/grades, Canvas access, approved branding artwork, production secrets or Discord webhook values in code, prompts, repository, logs or public issues. Keep `INTAKE_ENABLED=false` until separate approved readiness checks are satisfied.
- **Continuity:** GitHub code/PRs, [project handoff](PROJECT-HANDOFF.md) and [roadmap](ROADMAP.md) carry decisions between ChatGPT and Codex. You can create a new task for each feature; don't fork or migrate repositories.

## Common setup blockers

- **Repo doesn't appear:** verify the correct GitHub login and that the Codex GitHub app/connection has permission for the *specific repository*; revisit environment setup.
- **Cloud task won't load:** try Codex from a browser or ChatGPT's Codex tab, sign out/in, and see if the workspace allows Cloud tasks.
- **Can't create a PR:** check repository permissions and whether the task ran in an environment allowed to write branches; do not give out personal tokens or bypass normal GitHub permissions.
- **Tests fail in Cloud:** record the exact missing dependency or command. Do not add production Cloudflare secrets just to make a test pass.
- **Need help on phone:** use the Codex Cloud web task, not a local desktop task. You can still discuss the PR and scope in ChatGPT.

**Official references:** [Using Codex with ChatGPT](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) · [Codex setup in GitHub](https://help.openai.com/en/articles/11390924) · [Codex repository guidance](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex)
