import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";

const root = new URL("../public/", import.meta.url);
const read = name => readFileSync(new URL(name, root), "utf8");
const page = read("guides/gemini.html");
const home = read("index.html");
const css = read("styles.css");
const chatgpt = read("guides/chatgpt.html");
const claude = read("guides/claude.html");
const geminiManual = read("guides/gemini-manual.html");

test("Hub promotes only tested ChatGPT and Claude onboarding", () => {
  assert.match(home, /Set up ChatGPT \(guided\)/);
  assert.match(home, /Set up Claude \(guided\)/);
  assert.match(home, /Gemini: Unsupported for now/);
  assert.doesNotMatch(home, /href="\/guides\/gemini(?:\.html)?"/);
  assert.doesNotMatch(home, /Set up Gemini \(guided\)/);
  assert.doesNotMatch(home, /Google AI Pro at no cost/);
  assert.match(css, /\.setup-guide-actions \.platform-note/);
});

test("Old Gemini URL clearly warns rather than starting unsupported onboarding", () => {
  assert.match(page, /<h1>Gemini is currently unsupported<\/h1>/);
  assert.match(page, /could not reliably access current public assignment data/);
  assert.match(page, /private Google Sheet/);
  assert.match(page, /href="\/guides\/chatgpt"/);
  assert.match(page, /href="\/guides\/claude"/);
  assert.doesNotMatch(page, /Copy setup prompt/);
  assert.doesNotMatch(page, /EMBA-Gemini-Setup-Prompt\.txt/);
  assert.doesNotMatch(page, /<ol class="guide-steps/);
  assert.match(page, /Canvas, syllabi and instructor communications take priority/);
});

test("Working onboarding instructions and archived Gemini manual remain accessible", () => {
  assert.match(chatgpt, /EMBA-ChatGPT-Setup-Prompt\.txt/);
  assert.match(claude, /EMBA-Claude-Setup-Prompt\.txt/);
  assert.match(geminiManual, /Full written Google Gemini setup guide/);
  assert.match(read("downloads/EMBA-Gemini-Setup-Prompt.txt"), /EMBA Planner/);
});
