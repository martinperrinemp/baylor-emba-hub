# Connect your own AI assistant

No particular AI platform is required. Different products have different abilities to read public GitHub and to retain progress; verify capabilities rather than assuming them.

1. Give your AI the public repository URL and the text in [`AGENTS.md`](../AGENTS.md). Some agents can retrieve live files; others need manual uploads or copy/paste.
2. Ask it to fetch `data/manifest.json`, `data/open-alerts.json`, and the relevant course files, including `data/assignments.json` and `data/prep.json`, **fresh** before deadline or preparation advice. Both catalogs currently contain student-organized provisional leads, not official confirmations.
3. Keep individual assignment completion, grades, study notes, calendars, and `last_seen_shared_revision` in your own **private** record. Do not put personal progress in this public repository.
4. For "what changed?", provide your last successfully seen revision or let a capable agent compare its private revision to `data/changes.json`.
5. If the assistant cannot access current files, it must disclose that limitation. Verify important dates in Canvas or instructor communication yourself.
6. For a proposed change, use a GitHub Issue in the public hub while omitting personally identifying or restricted evidence. The Cloudflare submission Worker exists but is **paused**; classmate write actions are not yet enabled.

[Generic private progress template](../templates/personal/progress.template.json) can be copied into a new **private** repository. Do not fork the public hub into a private repository and expect GitHub forks to synchronize confidential progress.

## Starter prompt
> Use the Baylor EMBA Cohort Knowledge Hub as an unofficial, student-maintained reference. Read AGENTS.md and fetch the current manifest, open alerts, assignments, prep readings, and applicable AI-policy records before giving deadline or AI-tool advice. Warn clearly when a record is unverified or when you cannot fetch the latest data. Official course instructions outrank the hub. My private completion status is separate; do not assume anything is submitted until I tell you.
