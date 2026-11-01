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
// 1b. 品類表：上面的 table() 只讀有 id 的列，這張沒有 id，要另外讀。每列剛好 3 題（7＋3＝最多 10 題），不跟其他商品那 7 題撞；
//     碰到電池、發熱、行車、法規的題，最右欄要標「有公司資料才答」
const SAFETY = /飛機|燙|邊充邊用|開車/;
const qLines = qmd.split('\n');
const catFrom = qLines.findIndex(l => l.startsWith('### 各品類多問的題目'));
if (catFrom < 0) bad.push('questions.md 找不到「### 各品類多問的題目」');
const cats = [];
for (let i = catFrom + 1; catFrom >= 0 && i < qLines.length && !/^##/.test(qLines[i]); i++) {
  const c = qLines[i].split('|').map(s => s.trim());
  if (c.length >= 4 && c[1] !== '品類' && !/^-+$/.test(c[1])) cats.push({ name: c[1], qs: c[2].split('／'), safe: (c[3] || '').split('／').filter(Boolean) });
}
if (cats.length < 5) bad.push(`品類表只讀到 ${cats.length} 列，格式可能改了`);
const otherQs = new Set([...Object.values(sections.other).map(r => r.q), ...G.trainQs('other').map(q => q.q)]);
cats.forEach(({ name, qs, safe }) => {
  if (qs.length !== 3) bad.push(`品類「${name}」有 ${qs.length} 題，要剛好 3 題`);
  qs.forEach(q => {
    if (!q.endsWith('？')) bad.push(`品類「${name}」的「${q}」不是問句：題目用「／」隔開`);
    if (otherQs.has(q)) bad.push(`品類「${name}」的「${q}」跟其他商品那 7 題撞了：會問兩次，工具也會提醒講了兩次`);
    if (SAFETY.test(q) && !safe.includes(q)) bad.push(`品類「${name}」的「${q}」碰到安全或法規，最右欄要標`);
  });
  safe.filter(q => !qs.includes(q)).forEach(q => bad.push(`品類「${name}」最右欄的「${q}」不在題目那一欄`));
});
if (!skill.includes('有公司資料才答') || !skill.includes('答不出資料')) bad.push('SKILL.md 少了「有公司資料才答」或「答不出資料記進沒回答」的規則');

// 2. 題數：手機殼每一級剛好 5 題；重量厚度排在最少的 5 題裡
const tiers = {};
Object.values(sections.case).forEach(r => { tiers[r.tier] = (tiers[r.tier] || 0) + 1; });
['5', '10', '15', '20'].forEach(t => eq(`手機殼標 ${t} 的題數`, tiers[t], 5));
eq('手機殼 size 幾題起問', (sections.case.size || {}).tier, '5');
eq('其他商品 o-size 幾題起問', (sections.other['o-size'] || {}).tier, '5');
// 3. 語氣規則是複本，要跟本尊一樣；§6 提醒字清單逐行要在 SKILL.md 裡
eq('tone-rules.md 跟 londonimg-product 那份', read(path.join(here, 'reference', 'tone-rules.md')) === read(up('londonimg-product', 'reference', 'tone-rules.md')), true);
const rules = read(up('londonimg-product', 'reference', 'seo-geo-rules.md'));
const sec6 = rules.split(/^## 6\./m)[1].split(/^## /m)[0].split('\n').filter(l => /^- [^：]+：/.test(l));
if (sec6.length < 5) bad.push(`§6 只讀到 ${sec6.length} 行，規則檔的格式可能改了`);
sec6.forEach(l => { if (!skill.includes(l)) bad.push(`SKILL.md 少了 §6 這一行：${l}`); });

// 4. 不問的題：每一張表的題目都不能碰紅線字。§6 的字從規則檔讀，其他的照 questions.md 開頭那條和 SKILL.md〈紅線〉列
const sec6Words = sec6.filter(l => /^- (絕對化詞|促銷字|口語|要附出處)：/.test(l)).flatMap(l => l.split('：')[1].split('、')).map(w => w.replace(/〇/g, '.').replace(/＃/g, '\\d'));
const FORBID = new RegExp([...sec6Words, '通過', '保固', '背板', '聚碳酸酯', '(^|[^A-Za-z])PC([^A-Za-z]|$)', '9\\s*H', '變黃', '發黃', '泛黃', '跌落', '公尺', '價格', '多少錢', '售價', '定價', '出貨', '到貨', '工作天'].join('|'), 'i');
const rowsAll = [...Object.values(table('## 不算在題數裡')), ...Object.values(sections.case), ...Object.values(sections.other)];
[...rowsAll.map(r => r.q), ...cats.flatMap(c => c.qs)].forEach(q => { const m = q.match(FORBID); if (m) bad.push(`題目「${q}」有不該問的字「${m[0]}」`); });
rowsAll.filter(r => SAFETY.test(r.q) && !(r.how || '').includes('有公司資料才答')).forEach(r => bad.push(`題目「${r.q}」碰到安全或法規，「怎麼答」要寫有公司資料才答`));

// 5. SKILL.md、questions.md 寫死的數字，從檔案讀出來跟工具比。n 是這句該出現幾次：改寫到讀不到也算對不上
function nums(file, text, re, want, n = 1) {
  const hits = [...text.matchAll(re)];
  if (hits.length !== n) bad.push(`${file} 的 /${re.source}/ 應該有 ${n} 處，讀到 ${hits.length} 處`);
  hits.forEach(m => want.forEach((w, i) => eq(`${file}「${m[0]}」`, Number(m[i + 1]), w)));
}
nums('SKILL.md', skill, /門檻是 (\d+) 字/g, [G.SENT_MIN]);
nums('SKILL.md', skill, /回答 (\d+) 字內/g, [G.LIMIT.faqA], 2);
nums('SKILL.md', skill, /問題和特色名稱 (\d+) 字內/g, [G.LIMIT.faqQ], 2);
nums('SKILL.md', skill, /比較每個版本一句，(\d+) 字內/g, [G.LIMIT.cmpLine]);
nums('SKILL.md', skill, /比較每句 (\d+) 字內/g, [G.LIMIT.cmpLine]);
nums('SKILL.md', skill, /特色 (\d+) 到 (\d+) 項/g, [G.FEATS_MIN, G.FEATS_MAX]);
nums('questions.md', qmd, /問滿 (\d+) 項/g, [G.FEATS_MIN]);
nums('questions.md', qmd, /最多 (\d+) 項/g, [G.FEATS_MAX]);
nums('questions.md', qmd, /工具要 (\d+) 到 (\d+) 項/g, [G.FEATS_MIN, G.FEATS_MAX]);
nums('questions.md', qmd, /不到 (\d+) 項/g, [G.FEATS_MIN]);
const otherN = Object.keys(sections.other).length;
nums('questions.md', qmd, /先問這 (\d+) 題/g, [otherN]);
nums('questions.md', qmd, /只問上面那 (\d+) 題/g, [otherN]);
nums('questions.md', qmd, /最多到 (\d+) 題/g, [otherN + 3]);

// 6. 追問表第一欄跟工具會擋的字逐字比，兩邊都不能多。不用 includes：「可以」會騙過「可」
const yes = G.YES_ONLY.source.replace(/^\^\(|\)\[.*$/g, '').split('|');
const followUp = skill.split('### 3. 回答太短')[1].split('### 4.')[0];
const asked = followUp.split('\n').filter(l => l.startsWith('|')).map(l => l.split('|')[1].trim()).filter(c => c !== '美編回' && !/^-+$/.test(c)).flatMap(c => c.split('、'));
yes.filter(w => !asked.includes(w)).forEach(w => bad.push(`工具會擋「${w}」，SKILL.md 的追問表沒有這個字`));
asked.filter(w => !yes.includes(w)).forEach(w => bad.push(`SKILL.md 的追問表有「${w}」，工具沒有擋這個字`));

// 7. 公開字掃描：這個資料夾之後會進公開的 zip
const words = read(up('上架工具', 'build.js')).match(/PRIVATE_WORDS = \[(.*?)\]/)[1].match(/'([^']+)'/g).map(s => s.slice(1, -1));
if (words.length < 10) bad.push(`內部用語清單只讀到 ${words.length} 個，build.js 的寫法可能改了`);
for (const f of ['SKILL.md', 'README.md', 'check_questions.js', 'reference/questions.md', 'reference/tone-rules.md']) {
  const t = read(path.join(here, f)), low = t.toLowerCase();
  words.forEach(w => { if (low.includes(w.toLowerCase())) bad.push(`${f} 有內部用語「${w}」`); });
  if (t.includes(String.fromCharCode(0x2014))) bad.push(`${f} 有破折號`);
}

// 8. 測出洞才加的規則：改寫到讀不到也算對不上。字句真的要改，這裡跟著改，不是拿掉
const MUST = ['這個數字或規格不寫進句子', '兩款都這樣', '改完的句子再對一次', '還有跟原廠或別款比的效能', '「跟原廠一樣快」', '回得不清楚', '不放進卡片', '工具會亮「太短」的句子：句子還是放在第 4 段', '標「太短」的句子、拿掉數字的句子還是要輸出', '顏色和選的題是工具自己組句', '支架選「沒有」不追問', '- 多講的：', '`questions.md`〈定案商品名〉', '全名對過〈定案商品名〉', '別牌配件能不能一起用', '這是量過的，還是公司資料', '比較題和第 2 條例外', '照留只用在沒碰到', '不含同一個商品的兩個版本', '沒提別牌，也沒講全部都可以，不算這條', '先對〈紅線〉', '問完範圍，回答還是太短'];
MUST.filter(w => !skill.includes(w)).forEach(w => bad.push(`SKILL.md 少了這條規則：${w}`));
if (!qmd.includes('紅線擋掉的不算項數')) bad.push('questions.md 少了這條規則：紅線擋掉的不算項數');
const toneLines = skill.split('\n').filter(l => /^6\. \*\*確定的程度/.test(l) || /^- \[ \] 美編的「應該」/.test(l));
if (toneLines.length !== 2) bad.push(`語氣字清單應該有 2 處，讀到 ${toneLines.length} 處`);
['應該', '大概', '好像', '聽說', '可能', '吧', '不確定'].forEach(w => toneLines.forEach(l => { if (!l.includes(`「${w}」`)) bad.push(`語氣字「${w}」不在這一行：${l.slice(0, 16)}`); }));
if (!toneLines.every(l => l.includes('這類'))) bad.push('語氣字清單要留「這類」兩個字：列出來的不是全部');
// 9. 定案商品名（六個系列）：表要讀得到，SKILL.md 舉例的那個名字要在表上
const nameFrom = qLines.indexOf('## 定案商品名'), finalNames = [];
for (let i = nameFrom + 1; nameFrom >= 0 && i < qLines.length && !/^##\s/.test(qLines[i]); i++) {
  const c = qLines[i].split('|').map(s => s.trim());
  if (c.length === 4 && c[1] !== '系列' && !/^-+$/.test(c[1])) finalNames.push(c[2]);
}
if (finalNames.length !== 6) bad.push(`定案商品名應該有 6 款，讀到 ${finalNames.length} 款`);
const named = skill.match(/定案名是『([^』]+)』/);
if (!named || !finalNames.includes(named[1])) bad.push('SKILL.md 舉例的定案名不在 questions.md 的表上');
// 10. SKILL.md 的問答範例，丟進工具的「貼上 skill 給的問答」要拆得開。格式走散了這裡會抓到
const exBlock = (skill.split('**4. 問答')[1] || '').match(/```text\n([\s\S]*?)```/);
if (!exBlock) bad.push('SKILL.md 找不到問答範例');
else {
  const st = { compare: '', cmp: {}, feats: [], faq: [], train: Object.assign(G.TRAIN0(), { name: '範例殼', set: 'case' }) };
  const rep = G.trainImport(st, exBlock[1], true);
  [rep.need, ...rep.manual, ...rep.diff].filter(Boolean).forEach(m => bad.push(`問答範例拆不開：${m}`));
  if (!rep.done.includes('比較') || !rep.done.some(x => /^商品特色/.test(x)) || !rep.done.includes('有哪些顏色？') || !rep.done.includes('有支架嗎？怎麼用？')) bad.push('問答範例要有比較、特色、顏色、支架，工具組句的格式才有被檢查到');
}

if (bad.length) { console.error(`對不上 ${bad.length} 處：`); bad.forEach(b => console.error('  ✗ ' + b)); process.exit(1); }
console.log(`對齊：手機殼 ${Object.keys(sections.case).length} 題（工具固定題 ${G.trainQs('case').length}）、其他商品 ${Object.keys(sections.other).length} 題（工具固定題 ${G.trainQs('other').length}）、品類表 ${cats.length} 列、追問字 ${asked.length} 個、語氣規則相同、§6 ${sec6.length} 行都在、內部用語 ${words.length} 個掃過 0 筆、定案商品名 ${finalNames.length} 款、問答範例工具拆得開`);
