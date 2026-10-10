-- Proposal-only queue. GitHub remains canonical.
CREATE TABLE IF NOT EXISTS proposals (
 id TEXT PRIMARY KEY,
 client_request_id TEXT UNIQUE,
 category TEXT NOT NULL,
 target_id TEXT NOT NULL,
 field TEXT NOT NULL,
 proposed_value TEXT NOT NULL,
 current_value TEXT,
 source_type TEXT NOT NULL,
 source_note TEXT NOT NULL DEFAULT '',
 status TEXT NOT NULL DEFAULT 'pending',
 submitted_at TEXT NOT NULL,
 reviewer_decision TEXT
);
CREATE INDEX IF NOT EXISTS proposals_target_pending_idx ON proposals(category,target_id,field,status);
CREATE TABLE IF NOT EXISTS submission_counters (
 fingerprint TEXT NOT NULL,
 date_utc TEXT NOT NULL,
 count INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY(fingerprint,date_utc)
);
