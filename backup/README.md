# Owner-only daily backup service (deployed, not yet functional end-to-end)

**This is NOT the public submission Worker.** It is a separate, private Cloudflare Worker + Workflow. It will eventually put a daily GitHub repository ZIP snapshot, complete D1 database SQL export, and read-back-verified SHA-256 manifest into the private R2 bucket `baylor-emba-private-backups`.

**Live status as of October 10, 2026 (US Central):** Worker and Workflow deployed, no external Worker route, no scheduled execution. D1 export token has been installed as secret. First manual Workflow run succeeded on GitHub steps and failed at D1 export (**HTTP 401**); owner updated D1 token from Read to Edit. **A successful rerun is not yet confirmed.** Do not enable daily schedule before complete backup and restore testing. See [up-to-date build handoff](../docs/PROJECT-HANDOFF.md). Cloudflare's [official D1-to-R2 Workflow example](https://developers.cloudflare.com/workflows/examples/backup-d1/) is the basis for export/poll/retry behavior.

## Browser-only setup
1. **Completed:** Cloudflare → Workers & Pages → Create application → Continue with GitHub → select `martinperrinemp/baylor-emba-hub`.
2. **Completed:** Worker name **`baylor-emba-daily-backup`**, root path **`/backup`**, deploy command **`npx wrangler deploy`**, build command blank.
3. **R2 and Workflow bindings verified:** `PRIVATE_BACKUPS` binds to `baylor-emba-private-backups`; `DAILY_BACKUP` binds to `baylor-emba-backup-workflow`. Public routing is configured off; verify in runtime if needed. **Never bind R2 to `baylor-emba-proposals`.**
4. **Configured, but validation pending:** A scoped Cloudflare API token was added as backup Worker secret `D1_EXPORT_TOKEN`. The first D1 export failed HTTP 401. Owner subsequently updated its permission from D1 Read to D1 Edit. **Retry and verify**, never paste the token into public GitHub, chat, or screenshots.
5. **Next:** Retry Workflow, verify all five steps complete. The existing GitHub ZIP from the first run is only a partial backup. Then inspect the private R2 objects. Run a restore drill into an isolated new D1 database, and reconstruct a temporary repository from the stored archive.
6. Only after successful restore testing, add a scheduled trigger using a **Cloudflare-supported method** (for example, a cron-triggered Worker that creates Workflow instances). **Do not add `schedules = []` to `[[workflows]]`**; it caused deployment validation failure. Confirm scheduled execution in the active Cloudflare dashboard before claiming daily backups.
7. Verify backup freshness daily and set up **owner-only notifications for missed/failed backups** before allowing cohort submissions. Scheduling the Workflow without monitoring is not a complete backup solution.

## Recovery details
Every successful run creates three private R2 objects under a timestamped `daily/YYYY-MM-DD/...` prefix:
- `github-source.zip`, pinned to an exact GitHub commit SHA.
- `d1-database.sql`, a full D1 schema + data export.
- `manifest.json` with timestamp, pinned commit SHA, D1 bookmark, byte counts, and SHA-256 checksums. The manifest is only written after both objects have been retrieved and verified.

**Limitations:** GitHub ZIP preserves the latest file state, not full Git commit history, GitHub issues/PRs, or Cloudflare secrets. If we need a genuinely complete archive of the Git history, we must add a separate Git bundle or mirror export. Current backup code rejects single objects above 25 MiB, and the R2 bucket's lifecycle is configured separately by the owner to expire after eight days. During D1 export, Cloudflare may briefly block database queries; this backup runs outside the active submission Worker.

## Launch gating
The owner has set the bucket to private with an eight-day lifecycle. **Complete backups and daily schedules have not yet been confirmed.** Keep `INTAKE_ENABLED=false` on the public Worker until the first backup is verified and restore testing plus failure monitoring are complete. Follow [Disaster recovery plan](../docs/BACKUP-AND-RECOVERY.md).
