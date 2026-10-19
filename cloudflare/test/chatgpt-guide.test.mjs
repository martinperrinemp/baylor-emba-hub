import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import vm from "node:vm";

const publicRoot = new URL("../public/", import.meta.url);
const read = name => readFileSync(new URL(name, publicRoot), "utf8");
const page = read("guides/chatgpt.html");
const manual = read("guides/chatgpt-manual.html");
const prompt = read("downloads/EMBA-ChatGPT-Setup-Prompt.txt");
const projectInstructions = read("downloads/EMBA-Agent-Instructions.txt");
const css = read("guides/guide.css");
const home = read("index.html");

test("guided ChatGPT page is concise, accessible without JavaScript, and has a manual fallback", () => {
  assert.match(page, /Guided setup of your private EMBA study assistant/);
  assert.equal((page.match(/class="guide-step"/g) ?? []).length, 3);
  assert.match(page, /Baylor EMBA · 2028 Cohort/);
  assert.doesNotMatch(page, /\b(?:Claude|Gemini|Dallas)\b/i);
  assert.match(page, /href="\/guides\/chatgpt-manual"/);
  assert.match(manual, /Full written ChatGPT setup guide/);
  assert.match(manual, /Where ChatGPT finds deadlines/);
  assert.match(page, /<ol class="guide-steps guided-short">/);
  assert.match(page, /<noscript>|Download the \.txt file/);
  assert.match(page, /<details class="prompt-disclosure">/);
  assert.match(page, /aria-live="polite"/);
  assert.match(css, /\.prompt-scroller\{[^}]*overflow-x:auto/);
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(home, /Set up ChatGPT \(guided\)/);
});

test("copy button copies identical bytes from the downloadable prompt", async () => {
  const url = "/downloads/EMBA-ChatGPT-Setup-Prompt.txt";
  assert.ok(page.includes('href="' + url + '" download'));
  assert.ok(page.includes('src="' + url + '"'));
  assert.ok(page.includes('fetch("' + url + '"'));
  assert.match(prompt, /Reply 'done'/);
  assert.match(prompt, /I handle my own clicks/);
  assert.match(prompt, /Wait for an explicit "yes"/);
  assert.match(prompt, /TEST-001/);
  assert.match(prompt, /5\. CONNECT GOOGLE DRIVE TO CHATGPT/);
  assert.match(prompt, /8\. TEST A NEW CHAT AND THE HUB DATES/);
  assert.match(prompt, /Read the TEST-001 Status and Last Updated cells back immediately/i);
  assert.doesNotMatch(prompt, /connect Google Drive AND Google Sheets/);
  assert.match(prompt, /4a\. COPY THE EXACT INSTRUCTIONS/);
  assert.match(prompt, /4b\. SAVE PROJECT INSTRUCTIONS/);
  assert.match(prompt, /"back": confirm/);
  assert.match(prompt, /Google Drive app/);
  assert.match(projectInstructions, /raw\.githubusercontent\.com\/martinperrinemp\/baylor-emba-hub\/main\/data\/assignments\.json/);
  let click, written;
  const button = {disabled:false, addEventListener(event, listener) {
    assert.equal(event, "click"); click = listener;
  }};
  const status = {textContent:""};
  const script = page.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "copy script exists");
  vm.runInNewContext(script, {
    document: {getElementById(id) {return id === "copy-setup" ? button : status;}},
    navigator: {clipboard: {async writeText(s) {written=s;}}},
    async fetch(requested) {
      assert.equal(requested, url);
      return {ok:true,async text(){return prompt;}};
    }
  });
  await click();
  assert.equal(written, prompt);
  assert.match(status.textContent, /^Copied/);
  assert.equal(button.disabled, false);
});

test("ChatGPT notes use direct no-JavaScript data, never a placeholder", () => {
  assert.match(projectInstructions, /THE TWO SOURCES/);
  for (const dataFile of ["assignments.json", "prep.json", "program-calendar.json", "manifest.json", "changes.json"]) {
    assert.ok(projectInstructions.includes("/main/data/" + dataFile), dataFile);
  }
  assert.doesNotMatch(projectInstructions, /\[CODER/);
  assert.match(projectInstructions, /superseded_aggregate/);
  assert.match(projectInstructions, /Finished not submitted/);
  assert.match(projectInstructions, /Sheet has no date columns/);
  assert.match(projectInstructions, /read the cells back/);
});
