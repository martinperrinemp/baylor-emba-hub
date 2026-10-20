import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";

const root = new URL("../public/", import.meta.url);
const publicRead = path => readFileSync(new URL(path, root), "utf8");
const catalogRead = path => JSON.parse(readFileSync(new URL("../../data/" + path, import.meta.url), "utf8"));
const prep = catalogRead("prep.json").records;
const assignments = catalogRead("assignments.json").records;
const calendar = catalogRead("program-calendar.json");
const agent = publicRead("downloads/EMBA-Agent-Instructions.txt");
const upgrade = publicRead("downloads/EMBA-Reading-Upgrade.txt");
const chatgpt = publicRead("downloads/EMBA-ChatGPT-Setup-Prompt.txt");
const claude = publicRead("downloads/EMBA-Claude-Setup-Prompt.txt");

test("reading catalog has unique stable IDs and all three Fall courses represented", () => {
  assert.equal(prep.length, 104);
  assert.equal(new Set(prep.map(r => r.id)).size, prep.length);
  assert.ok(prep.every(r => r.id && r.title && r.course_id && r.module));
  assert.deepEqual([...new Set(prep.map(r => r.course_id))].sort(), ["ENT 5342","MGT 5311","QBA 5330"]);
  assert.equal(assignments.filter(a => a.record_status !== "superseded_aggregate").length, 55);
  assert.ok(calendar.class_dates.some(c => c.start_date === "2026-11-13"));
});

test("permanent and upgrade instructions preserve separate tabs and consent-based sync", () => {
  assert.match(agent, /START HERE, Progress .*and Reading & Prep/);
  assert.match(agent, /READING & PREP COMPLETION/);
  assert.match(agent, /Not started .*In progress, Done, and Blocked/);
  assert.match(agent, /FUTURE ASSIGNMENT AND READING RECONCILIATION/);
  assert.match(agent, /AT EACH PLANNING REQUEST, NOT IN BACKGROUND/);
  assert.match(agent, /BEFORE inserting any missing rows/);
  assert.match(agent, /re-read the exact inserted rows/);
  assert.match(agent, /NEXT class weekend/);
  assert.match(agent, /superseded_aggregate/);
  assert.match(agent, /not automatically update student-owned copies/);
  assert.match(upgrade, /Progress: Assignment \| ID \| Status \| Last Updated/);
  assert.match(upgrade, /Reading & Prep: Reading & Prep \| ID \| Status \| Last Updated/);
  assert.match(upgrade, /NEVER change any associated submission\/assignment status/);
  assert.match(upgrade, /does not run scheduled jobs|there are no automatic background alerts/);
});

test("existing ChatGPT and Claude setups gain reading checks without losing assignments", () => {
  for (const prompt of [chatgpt, claude]) {
    assert.match(prompt, /Reading & Prep/);
    assert.match(prompt, /104/);
    assert.match(prompt, /Done/);
    assert.match(prompt, /TEST-001/);
    assert.match(prompt, /Last Updated/);
    assert.match(prompt, /approval|permission/);
  }
  assert.match(chatgpt, /Three tabs: START HERE, Progress, and Reading & Prep/);
  assert.match(claude, /three tabs: START HERE, Progress, and Reading & Prep/);
});

test("Hub and supported platform guides link the additive upgrade", () => {
  for (const page of ["index.html","guides/chatgpt.html","guides/claude.html"]) {
    assert.match(publicRead(page), /EMBA-Reading-Upgrade\.txt/);
  }
  assert.match(publicRead("index.html"), /55 assignment IDs and 104 Reading &amp; Prep IDs/);
  assert.match(publicRead("index.html"), /Gemini: Unsupported for now/);
});
