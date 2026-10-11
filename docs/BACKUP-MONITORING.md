# Backup health monitoring and owner alert design

**Status:** separate Discord watchdog Worker source and tests published at [watchdog/](../watchdog/README.md), but **not deployed**, webhook secret not configured, and alert delivery not tested. First complete manual GitHub+D1 backup succeeded, isolated D1 schema restored, ZIP opened, and user confirmed daily 09:00 UTC schedule visible in Cloudflare. First *automatic* run and notifications have not yet been observed.

## Acceptance criteria

- Daily backup runs at 09:00 UTC (04:00 CDT / 03:00 CST).
- By a practical cutoff after the scheduled run (configured goal: 12:00 UTC), an independent check confirms a **completed** `manifest.json` under the *current UTC date's* `daily/YYYY-MM-DD/` prefix in the private R2 bucket; the manifest identifies the D1 SQL and GitHub ZIP belonging to the same run.
- Never treat a partial ZIP or a previous day's completed manifest as a successful current-day backup.
- Check the manifest's `status=complete`, referenced object names, sizes, and optionally hashes against R2 objects. The backup Workflow itself already verifies readback and SHA-256 on write; the monitoring check must verify *freshness independently*.
- Notify **only the owner** when today's backup is missing/incomplete or a run is errored, including the check time in UTC, last known complete backup timestamp, and a Cloudflare dashboard link. Do not include sensitive data, API tokens, or private presigned URLs.
- Deliver a **test notification** and verify receipt. Re-test deliberately skipped schedule and deliberately failed backup scenarios before opening public submissions.
- Repeated failures should not produce an uncontrolled flood of alerts; implement daily idempotency/dedupe for a given failure state.
- Monitor failure of the monitoring schedule itself, if practical, through a separate external owner-controlled check. A monitor that stops running silently is not sufficient disaster detection.

## Implementation options (do not assume availability)

1. **Already checked:** owner searched Cloudflare **Alerts** for Workflow, with no suitable built-in alert type displayed.
2. **Selected:** add a **private, independent scheduled watchdog** (separate from the backup Workflow) that reads the private R2 bucket at 12:00 UTC after backup completion and sends an owner-only **Discord webhook alert** when no valid complete backup exists. Add only the permissions needed; never expose the R2 bucket to the cohort proposal Worker. For no personal email in a public repository, configure destination address as an encrypted secret or private Dashboard setting, not as a GitHub constant.
3. Cloudflare Workflow Event Subscriptions can identify `instance.errored` and `instance.completed` events through a Queue consumer. That adds components and may be unnecessary initially; it **does not replace** an independent missing-run check.
4. A temporary **owner manual check** of Workflow status can help during setup, but does **not meet** the automatic failure-alert requirement.

## Current next step

Owner has created a private Discord channel and incoming webhook, and the [watchdog](../watchdog/README.md) source is now in GitHub. **Next:** browser-only Git deployment from `/watchdog`, then save Discord URL as a Cloudflare **Secret** named `DISCORD_WEBHOOK_URL` (not in GitHub/chat). Perform a temporary controlled test alert and confirm receipt; then configure daily 12:00 UTC Cron Trigger. Keep public submissions disabled until tested.

**Security:** The owner-only R2 bucket must remain private. Public GitHub can contain code and documentation but no credential values, student progress, emails or private backup URLs.
