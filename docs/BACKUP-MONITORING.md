# Backup health monitoring and owner alert design

**Status:** design requirement, not yet enabled. First complete manual GitHub+D1 backup succeeded, isolated D1 schema restored, ZIP opened, and user confirmed daily 09:00 UTC schedule visible in Cloudflare. First *automatic* run and notifications have not yet been observed.

## Acceptance criteria

- Daily backup runs at 09:00 UTC (04:00 CDT / 03:00 CST).
- By a practical cutoff after the scheduled run (suggest 11:00 UTC), an independent check confirms a **completed** `manifest.json` under the *current UTC date's* `daily/YYYY-MM-DD/` prefix in the private R2 bucket; the manifest identifies the D1 SQL and GitHub ZIP belonging to the same run.
- Never treat a partial ZIP or a previous day's completed manifest as a successful current-day backup.
- Check the manifest's `status=complete`, referenced object names, sizes, and optionally hashes against R2 objects. The backup Workflow itself already verifies readback and SHA-256 on write; the monitoring check must verify *freshness independently*.
- Notify **only the owner** when today's backup is missing/incomplete or a run is errored, including the check time in UTC, last known complete backup timestamp, and a Cloudflare dashboard link. Do not include sensitive data, API tokens, or private presigned URLs.
- Deliver a **test notification** and verify receipt. Re-test deliberately skipped schedule and deliberately failed backup scenarios before opening public submissions.
- Repeated failures should not produce an uncontrolled flood of alerts; implement daily idempotency/dedupe for a given failure state.
- Monitor failure of the monitoring schedule itself, if practical, through a separate external owner-controlled check. A monitor that stops running silently is not sufficient disaster detection.

## Implementation options (do not assume availability)

1. Check Cloudflare **Alerts** for a supported Workflow-related error notification with **email delivery**. Alert types depend on account and plan. This might cover *errored Workflow instances*, but would not on its own prove a daily backup was not triggered at all.
2. Add a **private, independent scheduled heartbeat check** (separate monitor from the backup Workflow) that reads the private R2 bucket after scheduled completion and sends owner-only email via a verified Cloudflare Email Service binding or another approved notification provider. Add only the permissions needed; never expose the R2 bucket to the cohort proposal Worker. For no personal email in a public repository, configure destination address as an encrypted secret or private Dashboard setting, not as a GitHub constant.
3. Cloudflare Workflow Event Subscriptions can identify `instance.errored` and `instance.completed` events through a Queue consumer. That adds components and may be unnecessary initially; it **does not replace** an independent missing-run check.
4. A temporary **owner manual check** of Workflow status can help during setup, but does **not meet** the automatic failure-alert requirement.

## Current next step

Ask the owner to open **Cloudflare → Alerts → Create an Alert** and inspect the available types, specifically any suitable Workflow failure alert. Do not create an unrelated Pages deployment alert. If no supported Workflow type is present, use a custom R2 freshness monitor with a verified notification method; test before public submission intake is enabled.

**Security:** The owner-only R2 bucket must remain private. Public GitHub can contain code and documentation but no credential values, student progress, emails or private backup URLs.
