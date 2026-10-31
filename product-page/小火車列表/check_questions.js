#!/usr/bin/env node
// 對齊檢查：skill 的題目和寫法數字，有沒有跟上架工具、語氣規則走散。對不上就印出來、exit 1。
// 用法：node check_questions.js（改了工具的固定題、語氣規則、提醒字清單後跑；打包 zip 前一定跑）
// 這支是給維護的人用的，不進 zip。
const fs = require('fs');
const path = require('path');

const here = __dirname;
const up = (...p) => path.join(here, '..', ...p);
const read = p => fs.readFileSync(p, 'utf8');
const G = require(up('上架工具', 'src', 'gen.js'));
const skill = read(path.join(here, 'SKILL.md'));
const qmd = read(path.join(here, 'reference', 'questions.md'));

const bad = [];
const eq = (what, a, b) => { if (a !== b) bad.push(`${what}：skill 這邊是「${a}」，來源是「${b}」`); };

// 把 questions.md 某一節底下的表格讀成 {id: {tier, q, how}}（只讀 id 那一欄有值的列）
function table(heading) {
  const lines = qmd.split('\n');
  const from = lines.indexOf(heading);
  if (from < 0) { bad.push(`questions.md 找不到「${heading}」`); return {}; }
  const out = {};
  for (let i = from + 1; i < lines.length && !/^##\s/.test(lines[i]); i++) {
    const c = lines[i].split('|').map(s => s.trim());
    if (c.length >= 6 && c[2] !== 'id' && /^[a-z][a-z-]*$/.test(c[2])) out[c[2]] = { tier: c[1], q: c[3], how: c[4] };
  }
  return out;
}
const sections = { case: table('## 手機殼'), other: table('## 其他商品') };

// 1. 固定題：工具有的每一題都要在表上，問句一字不差；工具沒有的題目，id 要有 c-／o- 前綴，問句不能跟固定題撞
for (const set of ['case', 'other']) {
  const rows = sections[set], qs = G.trainQs(set);
  qs.forEach(q => {
    const r = rows[q.id];
    if (!r) { bad.push(`${set} 少了工具的固定題 ${q.id}「${q.q}」`); return; }
    eq(`${set}/${q.id} 問句`, r.q, q.q);
    if (q.kind === 'pick') q.opts.forEach(([, t]) => { if (!r.how.includes(t)) bad.push(`${set}/${q.id} 少了選項「${t}」`); });
  });
  const fixed = new Set(qs.map(q => q.id)), texts = new Set(qs.map(q => q.q));
  Object.entries(rows).forEach(([id, r]) => {
    if (fixed.has(id)) return;
    if (!/^[co]-/.test(id)) bad.push(`${set}/${id} 工具沒有這題，id 要用 c- 或 o- 開頭`);
    if (texts.has(r.q)) bad.push(`${set}/${id} 問句跟固定題撞了：工具會提醒講了兩次`);
  });
}
// 2. 題數：手機殼每一級剛好 5 題；重量厚度排在最少的 5 題裡
const tiers = {};
Object.values(sections.case).forEach(r => { tiers[r.tier] = (tiers[r.tier] || 0) + 1; });
['5', '10', '15', '20'].forEach(t => eq(`手機殼標 ${t} 的題數`, tiers[t], 5));
eq('手機殼 size 幾題起問', (sections.case.size || {}).tier, '5');
eq('其他商品 o-size 幾題起問', (sections.other['o-size'] || {}).tier, '5');
// 3. 不問的題：題目裡不能出現紅線字（比「不放進題目」那一行之後的表格）
const qText = [...Object.values(sections.case), ...Object.values(sections.other)].map(r => r.q).join('\n');
(qText.match(/保固|軍規|9\s*H|背板材質|\bPC\b|價格|出貨|到貨/g) || []).forEach(w => bad.push(`題目裡有不該問的字「${w}」`));

// 4. SKILL.md 寫死的數字和追問的字，跟工具一樣
eq('太短的門檻', G.SENT_MIN, 12);
eq('回答字數', G.LIMIT.faqA, 90);
eq('問題字數', G.LIMIT.faqQ, 30);
eq('比較字數', G.LIMIT.cmpLine, 30);
eq('特色最少', G.FEATS_MIN, 3);
eq('特色最多', G.FEATS_MAX, 5);
const yes = G.YES_ONLY.source.replace(/^\^\(|\)\[.*$/g, '').split('|');
const followUp = skill.split('### 3. 回答太短')[1].split('### 4.')[0];
yes.forEach(w => { if (!followUp.includes(w)) bad.push(`工具會擋「${w}」，SKILL.md 的追問表沒有這個字`); });

// 5. 語氣規則是複本，要跟本尊一樣；§6 提醒字清單逐行要在 SKILL.md 裡
eq('tone-rules.md 跟 londonimg-product 那份', read(path.join(here, 'reference', 'tone-rules.md')) === read(up('londonimg-product', 'reference', 'tone-rules.md')), true);
const rules = read(up('londonimg-product', 'reference', 'seo-geo-rules.md'));
const sec6 = rules.split(/^## 6\./m)[1].split(/^## /m)[0].split('\n').filter(l => /^- [^：]+：/.test(l));
if (sec6.length < 5) bad.push(`§6 只讀到 ${sec6.length} 行，規則檔的格式可能改了`);
sec6.forEach(l => { if (!skill.includes(l)) bad.push(`SKILL.md 少了 §6 這一行：${l}`); });

// 6. 公開字掃描：這個資料夾之後會進公開的 zip
const words = read(up('上架工具', 'build.js')).match(/PRIVATE_WORDS = \[(.*?)\]/)[1].match(/'([^']+)'/g).map(s => s.slice(1, -1));
if (words.length < 10) bad.push(`內部用語清單只讀到 ${words.length} 個，build.js 的寫法可能改了`);
for (const f of ['SKILL.md', 'README.md', 'check_questions.js', 'reference/questions.md', 'reference/tone-rules.md']) {
  const t = read(path.join(here, f)), low = t.toLowerCase();
  words.forEach(w => { if (low.includes(w.toLowerCase())) bad.push(`${f} 有內部用語「${w}」`); });
  if (t.includes(String.fromCharCode(0x2014))) bad.push(`${f} 有破折號`);
}

if (bad.length) { console.error(`對不上 ${bad.length} 處：`); bad.forEach(b => console.error('  ✗ ' + b)); process.exit(1); }
console.log(`對齊：手機殼 ${Object.keys(sections.case).length} 題（工具固定題 ${G.trainQs('case').length}）、其他商品 ${Object.keys(sections.other).length} 題（工具固定題 ${G.trainQs('other').length}）、語氣規則相同、§6 ${sec6.length} 行都在、內部用語 ${words.length} 個掃過 0 筆`);
