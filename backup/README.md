# Owner-only daily backup service (not deployed)

**This is NOT the public submission Worker.** It is a separate, private Cloudflare Worker + Workflow. It will eventually put a daily GitHub repository ZIP snapshot, complete D1 database SQL export, and read-back-verified SHA-256 manifest into the private R2 bucket `baylor-emba-private-backups`.

**Initial deployment is intentionally inert:** `schedules = []`, no external Worker route, and no `D1_EXPORT_TOKEN` yet. Do not turn on the schedule before configuring the secret and testing the restore. Cloudflare's [official D1-to-R2 Workflow example](https://developers.cloudflare.com/workflows/examples/backup-d1/) is the basis for export/poll/retry behavior.

## Browser-only setup
1. Cloudflare → Workers & Pages → Create application → Continue with GitHub → select `martinperrinemp/baylor-emba-hub`.
2. Worker name **`baylor-emba-daily-backup`**, root path **`/backup`**, deploy command **`npx wrangler deploy`**, build command blank.
3. Verify that `PRIVATE_BACKUPS` binds to `baylor-emba-private-backups`, and that no public routes/URLs are enabled. **Never bind R2 to `baylor-emba-proposals`.**
4. Create a separate **scoped Cloudflare API token with D1 export permission only** for the relevant account/database, using Cloudflare's current API token UI. Add it as a secret to the backup Worker named `D1_EXPORT_TOKEN`, never in public GitHub, chat, or screenshots. Never use a global API key.
5. Test the Workflow against the live D1 database and inspect the private R2 objects. Run a restore drill into an isolated new D1 database, and reconstruct a temporary repository from the stored archive.
6. Once tested, enable `schedules = ["0 9 * * *"]` in `backup/wrangler.toml` (09:00 UTC daily, 04:00 CDT or 03:00 CST), publish through GitHub, and verify at least one completed daily Workflow instance and `manifest.json` in R2.
7. Verify backup freshness daily and set up **owner-only notifications for missed/failed backups** before allowing cohort submissions. Scheduling the Workflow without monitoring is not a complete backup solution.

## Recovery details
Every successful run creates three private R2 objects under a timestamped `daily/YYYY-MM-DD/...` prefix:
- `github-source.zip`, pinned to an exact GitHub commit SHA.
- `d1-database.sql`, a full D1 schema + data export.
- `manifest.json` with timestamp, pinned commit SHA, D1 bookmark, byte counts, and SHA-256 checksums. The manifest is only written after both objects have been retrieved and verified.

**Limitations:** GitHub ZIP preserves the latest file state, not full Git commit history, GitHub issues/PRs, or Cloudflare secrets. If we need a genuinely complete archive of the Git history, we must add a separate Git bundle or mirror export. Current backup code rejects single objects above 25 MiB, and the R2 bucket's lifecycle is configured separately by the owner to expire after eight days. During D1 export, Cloudflare may briefly block database queries; this backup runs outside the active submission Worker.

## Launch gating
The owner has set the bucket to private with an eight-day lifecycle. **Backups are not yet running.** Keep `INTAKE_ENABLED=false` on the public Worker until the first backup is verified and restore testing plus failure monitoring are complete. Follow [Disaster recovery plan](../docs/BACKUP-AND-RECOVERY.md).
