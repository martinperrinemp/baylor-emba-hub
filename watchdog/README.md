# Owner-only Backup Watchdog

This is a **third, separate Cloudflare Worker**, whose only purpose is to alert the owner via Discord if a daily private backup is missing or corrupt. It is **not** a new public interface, does not accept cohort submissions, and does not need a website or custom domain.

**Current setup (2026-10-11):** Owner has created a private Discord channel `#backup-alerts` with an incoming webhook, deployed `baylor-emba-backup-watchdog` with a private R2 binding, and configured `DISCORD_WEBHOOK_URL` as a **Production runtime Secret**. A one-off direct test **successfully delivered to Discord**, after fixing the initial mistake of placing the webhook in **Builds → Variables and secrets**, where runtime code cannot access it. The temporary direct test endpoint was removed and the GitHub Wrangler config now defines daily Cron `0 12 * * *`, with test mode disabled and `workers_dev=false`. **Owner must still confirm the new Cloudflare deployment is Ready and daily Cron appears, and verify the first real daily check on schedule.**

## How monitoring works
- Existing backup Workflow runs at `09:00 UTC` and writes `daily/YYYY-MM-DD/<timestamped run>/github-source.zip`, `d1-database.sql`, and `manifest.json`.
- Watchdog is configured in GitHub to run at **12:00 UTC daily** (07:00 CDT / 06:00 CST), leaving three hours for a backup to finish. The first live Cron and completed backup check remain to be verified in Cloudflare.
- It lists `manifest.json` files under today's UTC prefix, verifies `status: complete`, `created_utc`, matching run folder, both objects' byte sizes, and recalculates **SHA-256 for both objects**. Any valid full backup means healthy.
- If missing/invalid, it posts an owner-only Discord warning with no secrets, and records a private `watchdog/alerts/<date>-missing-backup.json` marker in R2 to suppress repeated alerts that same day. A healthy day remains silent.
- It supports `WATCHDOG_TEST_MODE=true` to send a clearly labeled **TEST** alert even when a backup is healthy. Test uses a different marker. Disable test mode before daily schedule. Discord webhook POST intentionally includes `allowed_mentions: {parse: []}` to prevent unexpected pings.
- If Discord returns an error, the Worker throws, logs failure, and **does not create a success marker**. An independent monitor-of-monitor is a recommended later hardening step.

## Operational verification

1. Confirm latest `baylor-emba-backup-watchdog` GitHub deployment in Cloudflare is **Ready** and the scheduled trigger shows **Daily / `0 12 * * *`**.
2. Confirm `workers.dev` URL and preview URLs are **disabled**, and the temporary test-only route has been removed from `src/index.mjs`. The runtime variable `WATCHDOG_TEST_MODE` must be `false`.
3. Confirm `DISCORD_WEBHOOK_URL` exists as a **Production runtime Secret** under Worker **Settings → Bindings / Variables and Secrets**, not only as a **build-time secret** under **Builds**. Never copy webhook value into GitHub or chat. Remove unneeded build-time duplicate secret when convenient.
4. After 09:00 UTC, verify a completed backup Workflow run. After 12:00 UTC, review Watchdog invocation logs: **healthy** days should generate no Discord alert; missing/failed backups should generate exactly one Discord message per UTC date.
5. The direct one-off test already succeeded in sending a Discord message, but a deliberate **isolated missing-backup scenario** and the first actual daily scheduled check are still outstanding. Do not alter/delete real production backup files to force failure.

## Private storage separation
The monitor's R2 binding allows its code to read objects and write only the small deduplication marker by convention. Cloudflare R2 Worker bindings do not provide per-object read-only permissions. The code is owner controlled, **has no public route** (`workers_dev=false` and `preview_urls=false`), and never sends backup contents to Discord. The proposal intake Worker has **no R2 backup binding**.

## Requirements still outstanding
- Worker was deployed and one-off Discord TEST delivery succeeded; the **new private daily schedule and first automatic health check remain to be confirmed**.
- A monitor-of-monitor is still recommended: if the monitor stops running entirely, its Discord message won't fire. A second, independent external signal can check that a daily watchdog heartbeat exists.
- The original database schema restore and GitHub ZIP readability passed, but full data-row restore and full Git history/Issues snapshots aren't yet proven.
- **Do not enable student submissions until the owner successfully tests monitoring and release gates.**

See [current project handoff](../docs/PROJECT-HANDOFF.md) and [backup monitoring design](../docs/BACKUP-MONITORING.md).
