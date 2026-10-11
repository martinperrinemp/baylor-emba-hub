# Owner-only backup service (first complete manual run verified; automation pending)

**This is NOT the public submission Worker.** It is a separate, private Cloudflare Worker + Workflow. It will eventually put a daily GitHub repository ZIP snapshot, complete D1 database SQL export, and read-back-verified SHA-256 manifest into the private R2 bucket `baylor-emba-private-backups`.

**Verified checkpoint (2026-10-11 02:42 UTC):** Separate backup Worker and Workflow are deployed with no public route and no recurring schedule. The owner confirmed a new manual Workflow instance completed **all five steps**: GitHub commit pin, GitHub ZIP archive/readback, D1 SQL export, SQL storage/readback, and completed backup manifest. Earlier attempts failed from D1 API authorization, unauthenticated GitHub access, and an unsupported redirect setting; these were fixed before the successful run. **Still pending:** inspect the completed run's three objects in the private R2 bucket, test an isolated restore, implement a daily schedule, verify failure alerting, and accumulate seven days of restore points. See [current project handoff](../docs/PROJECT-HANDOFF.md).

## Browser-only setup
1. **Completed:** Cloudflare → Workers & Pages → Create application → Continue with GitHub → select `martinperrinemp/baylor-emba-hub`.
2. **Completed:** Worker name **`baylor-emba-daily-backup`**, root path **`/backup`**, deploy command **`npx wrangler deploy`**, build command blank.
3. **R2 and Workflow bindings verified:** `PRIVATE_BACKUPS` binds to `baylor-emba-private-backups`; `DAILY_BACKUP` binds to `baylor-emba-backup-workflow`. Public routing is configured off; verify in runtime if needed. **Never bind R2 to `baylor-emba-proposals`.**
4. **Verified with a successful backup run:** The private Worker has both `D1_EXPORT_TOKEN` (Cloudflare D1 Edit permission) and `GITHUB_BACKUP_TOKEN` (repository-scoped GitHub Contents Read-only). Never publish token values or add them to the submission Worker.
5. **Next:** Open the private R2 bucket's `daily/2026-10-11/` folder and identify the completed-run timestamp containing all three files: `github-source.zip`, `d1-database.sql`, `manifest.json`. Verify this is the completed run, not a partial failed one. Perform an **isolated recovery drill** into a new D1 database and temporary GitHub file location without changing production.
6. Only after successful restore testing, add a scheduled trigger using a **Cloudflare-supported method** (for example, a cron-triggered Worker that creates Workflow instances). **Do not add `schedules = []` to `[[workflows]]`**; it caused deployment validation failure. Confirm scheduled execution in the active Cloudflare dashboard before claiming daily backups.
7. Verify backup freshness daily and set up **owner-only notifications for missed/failed backups** before allowing cohort submissions. Scheduling the Workflow without monitoring is not a complete backup solution.

## Recovery details
Every successful run creates three private R2 objects under a timestamped `daily/YYYY-MM-DD/...` prefix:
- `github-source.zip`, pinned to an exact GitHub commit SHA.
- `d1-database.sql`, a full D1 schema + data export.
- `manifest.json` with timestamp, pinned commit SHA, D1 bookmark, byte counts, and SHA-256 checksums. The manifest is only written after both objects have been retrieved and verified.

**Limitations:** GitHub ZIP preserves the latest file state, not full Git commit history, GitHub issues/PRs, or Cloudflare secrets. If we need a genuinely complete archive of the Git history, we must add a separate Git bundle or mirror export. Current backup code rejects single objects above 25 MiB, and the R2 bucket's lifecycle is configured separately by the owner to expire after eight days. During D1 export, Cloudflare may briefly block database queries; this backup runs outside the active submission Worker.

## Launch gating
The owner has set the bucket to private with an eight-day lifecycle. **One complete manually triggered backup was confirmed. Daily schedules, failure alerts, and restore tests are not yet confirmed.** Keep `INTAKE_ENABLED=false` on the public Worker until the first backup is verified and restore testing plus failure monitoring are complete. Follow [Disaster recovery plan](../docs/BACKUP-AND-RECOVERY.md).
