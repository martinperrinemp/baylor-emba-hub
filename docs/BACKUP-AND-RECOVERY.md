# Owner-only backup, containment, and recovery plan

**Status: REQUIRED BEFORE PUBLIC SUBMISSIONS, NOT YET DEPLOYED OR VERIFIED.** This is an architectural commitment and runbook, not evidence that any backups have been created. Only the repository owner can administer and restore private backups. Public cohort reviewers receive no credentials to backup storage.

## Goals and scope

- Create **at least one successful, integrity-checked backup every 24 hours** and maintain **at least seven daily restore points**, covering the most recent week.
- Put backups in a **private Cloudflare R2 bucket**, without an R2 public domain, public access, or a binding available to the public intake Worker. Set owner-only IAM/API credentials. Prefer an independently permissioned **backup-only Worker/Workflow** with scheduled execution; do not give submission clients any backup privileges.
- Back up **all recoverable state needed to rebuild**, not just pending suggestions:
  1. The canonical GitHub hub: approved coursework JSON, agent rules, code, schemas, documentation, and release/version identifiers. A repo ZIP gives a snapshot, **not Git commit history, Issues, pull requests or repository settings**. For a full recovery, additionally archive Git history (`git bundle` or mirror), issue/PR metadata where used, and a safe configuration manifest.
  2. D1 database **schema and data**: proposed submissions, deduplication information, review decisions, audit trails, reviewer roles if/when stored there, and other application data added later. Avoid unencrypted local exports, and never include tokens or passwords.
  3. Deployment configuration and migration version (without secrets). Keep credentials in the owner's separate secure credential management and **rotate/recreate them on restore**.
- Backup artifacts carry a creation UTC time, repository commit SHA, database schema version/bookmark when available, file sizes and cryptographic digests. Every run checks they can be read back. Check daily success and **alert the owner on failed or missed backup runs**.
- A successful backup must be confirmed **before accepting outside submissions**, and backup restore must be tested with an isolated temporary environment before cohort rollout.

## Cloudflare recovery options and retention

- **D1 Time Travel** provides point-in-time recovery, typically **7 days on Workers Free or 30 days on Workers Paid**, with no separate schedule. This is useful for fine-grained recovery, but **does not replace independent owner-only copies**. Check account capability before relying on it: https://developers.cloudflare.com/d1/reference/time-travel/
- D1 supports SQL exports for full schema/data. An export can be used to restore a separate, new D1 database in a controlled recovery. See https://developers.cloudflare.com/d1/best-practices/import-export-data/
- Cloudflare documents an export-to-R2 approach for automated backups; prefer that or an equivalent tested scheduled Cloudflare Workflow. Exporting through Cloudflare's D1 API may temporarily affect D1 availability, so schedule for low-traffic periods and monitor outcomes.
- Configure R2 lifecycle expiration to **eight days** as a safety buffer for retaining at least seven daily recovery points even if one run is late. R2 deletes lifecycle-expired objects asynchronously; don't promise an exact count or precise deletion hour. For actual seven-day retention policies, delete excess only *after* verifying enough safe restore points exist. https://developers.cloudflare.com/r2/buckets/object-lifecycles/
- Maintain an owner-visible inventory of backups, last successful timestamp and integrity test result **outside the public intake path**. Cloudflare account compromise could still affect backup storage in that same account. For stronger isolation, move copies to a separate owner-only account/provider later.

## Emergency stop: disable intake without losing the read-only knowledge hub

The public submission Worker MUST default **closed** unless `INTAKE_ENABLED` explicitly equals the string `true`. The server-side guard is in `cloudflare/src/queue.mjs`; it applies to **both MCP and REST** submissions and runs before any queue write.

1. Change `INTAKE_ENABLED` to `false` in Cloudflare and deploy that configuration; check an attempted submission now returns a paused response, **with no database row created**. If that is not available, disable the Worker route/deployment.
2. Rotate or revoke the shared **submission-only** token if the link/token may have been leaked. This prevents new writes from existing connectors; students may need to reconnect after reopening. Never publish tokens in GitHub.
3. The separate GitHub Issue fallback is **not** controlled by the Worker switch. If actively spammed, temporarily disable GitHub Issues in repository settings or restrict issue access; keep approved data readable.
4. Preserve an incident copy of the current queue for investigation. Review likely abusive records, source identity evidence, and latest clean revision. A noisy queue is not by itself evidence that the approved GitHub data was changed.
5. If only unapproved proposals are spammed, **quarantine/reject them**; avoid reverting legitimate submissions or approved changes unnecessarily.
6. For actual canonical compromise, restore a clean repo snapshot **using a new corrective commit** (do not force-push away useful audit history). Rebuild database in isolation from a verified private snapshot or use D1 point-in-time recovery at a carefully chosen checkpoint. Restoring D1 over the current instance can lose more recent legitimate events; preserve and reconcile them first.
7. Verify integrity, published deadline revisions, open alerts, private review history, and the new token before enabling intake again. Notify the cohort of material corrections once notifications are operational.

## Recovery acceptance tests before launch

- [ ] Private R2 bucket is owner-only; the submission Worker has **no access** to it.
- [ ] Daily automated backup executes on schedule, records checksums, verifies reads and sends failure notifications.
- [ ] Seven full-day recovery points exist (verify after seven days; initial launch requires a tested successful first backup).
- [ ] A clean GitHub revision **and full Git history** can be recovered without relying on the compromised repository.
- [ ] D1 schema/data and reviewer decisions can be restored to a new isolated D1 instance.
- [ ] Swapping `INTAKE_ENABLED` to `false` blocks both REST and MCP writes while leaving read-only public GitHub resources available.
- [ ] Rotated tokens invalidate existing submission access.
- [ ] An intentionally conflicting/spam report is isolated without changing approved data.
- [ ] A complete simulated rollback and re-open process has been performed and documented.

**This runbook is safe to publish** because it describes controls, not secret keys, bucket identifiers, exact access grants or private backup locations. Owner-only implementation details belong in the owner's protected deployment configuration.
