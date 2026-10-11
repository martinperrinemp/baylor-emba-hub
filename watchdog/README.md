# Owner-only Backup Watchdog (source built, not deployed)

This is a **third, separate Cloudflare Worker**, whose only purpose is to alert the owner via Discord if a daily private backup is missing or corrupt. It is **not** a new public interface, does not accept cohort submissions, and does not need a website or custom domain.

**Current setup:** Owner has created a private Discord server/channel `#backup-alerts` and an incoming webhook. No webhook URL is stored in GitHub. The watchdog Worker, Discord secret, test notification and daily schedule are **not deployed or verified yet**.

## How monitoring works
- Existing backup Workflow runs at `09:00 UTC` and writes `daily/YYYY-MM-DD/<timestamped run>/github-source.zip`, `d1-database.sql`, and `manifest.json`.
- Watchdog is intended to run at **12:00 UTC daily** (07:00 CDT / 06:00 CST), leaving three hours for a backup to finish. The cron is deliberately **absent** in the initial configuration.
- It lists `manifest.json` files under today's UTC prefix, verifies `status: complete`, `created_utc`, matching run folder, both objects' byte sizes, and recalculates **SHA-256 for both objects**. Any valid full backup means healthy.
- If missing/invalid, it posts an owner-only Discord warning with no secrets, and records a private `watchdog/alerts/<date>-missing-backup.json` marker in R2 to suppress repeated alerts that same day. A healthy day remains silent.
- It supports `WATCHDOG_TEST_MODE=true` to send a clearly labeled **TEST** alert even when a backup is healthy. Test uses a different marker. Disable test mode before daily schedule. Discord webhook POST intentionally includes `allowed_mentions: {parse: []}` to prevent unexpected pings.
- If Discord returns an error, the Worker throws, logs failure, and **does not create a success marker**. An independent monitor-of-monitor is a recommended later hardening step.

## Browser-only deployment: one step at a time

1. In Cloudflare **Workers & Pages → Create application → Continue with GitHub**, select `martinperrinemp/baylor-emba-hub`.
2. Name the Worker exactly **`baylor-emba-backup-watchdog`**; choose **Advanced settings → Path: `/watchdog`**, blank build command, deploy command `npx wrangler deploy`.
3. Verify deployment **Ready** and Settings → Bindings contains **`PRIVATE_BACKUPS` → `baylor-emba-private-backups`**. It must **not** have a D1 database binding, GitHub token, Cloudflare API token, or cohort submit token.
4. Open **Settings → Runtime variables and secrets → Add variable**. Set type **Secret**, name `DISCORD_WEBHOOK_URL` and paste the Discord webhook URL directly into Cloudflare. Never paste it into a chat, GitHub Issue, or public file. You should see only the secret name when saved.
5. **Test alert delivery before activating daily monitoring.** Temporarily modify the Wrangler config in GitHub to set `WATCHDOG_TEST_MODE = "true"` and add a temporary short-lived `[triggers] crons = ["*/5 * * * *"]`; deploy and wait for one Cron event. Confirm the Discord test alert reached your private channel and only one test notification was sent. Inspect Cloudflare Worker logs if not. **After test, immediately** change `WATCHDOG_TEST_MODE` back to `false` and replace temporary cron with `[triggers] crons = ["0 12 * * *"]`; redeploy. All changes are normal GitHub commits.
6. Check after 12:00 UTC on the following day that the scheduled Worker ran, and that no warning was sent when a completed backup exists. Test a missing-backup case with a **separate isolated test configuration** (e.g. a simulated nonexistent date) before opening cohort submissions. Never delete or corrupt the actual R2 backup to force a failure.
7. Ensure Discord app notifications are enabled on the owner's phone and verify a test notification appears. Avoid creating alerts in shared cohort channels.

## Private storage separation
The monitor's R2 binding allows its code to read objects and write only the small deduplication marker by convention. Cloudflare R2 Worker bindings do not provide per-object read-only permissions. The code is owner controlled, **has no public route** (`workers_dev=false` and `preview_urls=false`), and never sends backup contents to Discord. The proposal intake Worker has **no R2 backup binding**.

## Requirements still outstanding
- This Worker has **not been deployed** and no alert has been delivered yet.
- A monitor-of-monitor is still recommended: if the monitor stops running entirely, its Discord message won't fire. A second, independent external signal can check that a daily watchdog heartbeat exists.
- The original database schema restore and GitHub ZIP readability passed, but full data-row restore and full Git history/Issues snapshots aren't yet proven.
- **Do not enable student submissions until the owner successfully tests monitoring and release gates.**

See [current project handoff](../docs/PROJECT-HANDOFF.md) and [backup monitoring design](../docs/BACKUP-MONITORING.md).
