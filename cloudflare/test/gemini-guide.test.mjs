import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import vm from "node:vm";

const root = new URL("../public/", import.meta.url);
const read = name => readFileSync(new URL(name, root), "utf8");
const page = read("guides/gemini.html");
const manual = read("guides/gemini-manual.html");
const prompt = read("downloads/EMBA-Gemini-Setup-Prompt.txt");
const permanent = read("downloads/EMBA-Agent-Instructions.txt");
const css = read("guides/guide.css");
const home = read("index.html");
const path = "/downloads/EMBA-Gemini-Setup-Prompt.txt";

test("Gemini has a 3-step accessible page and preserved manual", () => {
  assert.equal((page.match(/class="guide-step"/g) ?? []).length, 3);
  assert.match(page, /Baylor EMBA · 2028 Cohort/);
  assert.match(page, /Set up your EMBA assistant in Google Gemini/);
  assert.doesNotMatch(page, /\b(?:ChatGPT|Claude|Dallas)\b/);
  assert.match(page, /href="\/guides\/gemini-manual"/);
  assert.match(manual, /Full written Google Gemini setup guide/);
  assert.equal((manual.match(/class="guide-step"/g) ?? []).length, 6);
  assert.match(page, /<ol class="guide-steps guided-short">/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /<details class="prompt-disclosure">/);
  assert.match(css, /\.prompt-scroller\{[^}]*overflow-x:auto/);
  assert.match(home, /Set up Gemini \(guided\)/);
  assert.match(page, /November 2026/);
  assert.match(page, /Ask Gemini/);
});

test("Gemini copy button copies the exact same file as download and preview", async () => {
  assert.ok(page.includes('href="' + path + '" download'));
  assert.ok(page.includes('src="' + path + '"'));
  assert.ok(page.includes('fetch("' + path + '"'));
  let click;
  let written;
  const button={disabled:false,addEventListener(name,fn){assert.equal(name,"click"); click=fn;}};
  const status={textContent:""};
  const script=page.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script);
  vm.runInNewContext(script,{
    document:{getElementById(id){return id==="copy-setup"?button:status;}},
    navigator:{clipboard:{async writeText(s){written=s;}}},
    async fetch(url){assert.equal(url,path);return {ok:true,async text(){return prompt;}};}
  });
  await click();
  assert.equal(written,prompt);
  assert.match(status.textContent,/^Copied/);
  assert.equal(button.disabled,false);
});

test("Gemini onboarding preserves source-of-truth, privacy and valid tracker statuses", () => {
  assert.match(prompt,/STEP 4a: Get the EXACT permanent EMBA Agent Instructions/);
  assert.match(prompt,/EMBA-Agent-Instructions\.txt/);
  assert.match(prompt,/STEP 8: Wrap up/);
  assert.match(prompt,/Not started \(only when I confirm it\), In progress, Finished not submitted, Submitted, Blocked/);
  assert.match(prompt,/Never write "Complete"/);
  assert.match(prompt,/record_status "superseded_aggregate"/);
  assert.match(prompt,/manifest\.json/);
  assert.match(prompt,/open-alerts\.json/);
  assert.match(prompt,/TEST-001/);
  assert.match(prompt,/explicit permission/);
  assert.match(prompt,/read-only access test/);
  assert.match(prompt,/Google Sheets "Ask Gemini" side panel/);
  assert.match(prompt,/November 2026/);
  assert.match(permanent,/DALLAS EMBA \| PERSONAL AI PLANNING ASSISTANT/);
});
