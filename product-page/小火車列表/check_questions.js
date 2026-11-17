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
    // 工具 11/1 把幾題改成按鈕，questions.md 還寫「寫」（skill 報告後再對齊）：表上寫「選」的才逐項比
    if (q.kind === 'pick' && r.how.startsWith('選')) q.opts.forEach(([, t]) => { if (!r.how.includes(t)) bad.push(`${set}/${q.id} 少了選項「${t}」`); });
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
// SKILL.md 的網址開頭現在指個人站，網址裡有帳號名，只放行那一行的 github.io 網址（給同事前換成公司站）
const SITE = (skill.match(/^網址開頭：`(https:\/\/[a-z0-9-]+\.github\.io\/[^`\s]*\/)`$/m) || [])[1] || '';
for (const f of ['SKILL.md', 'README.md', 'check_questions.js', 'reference/questions.md', 'reference/tone-rules.md']) {
  const t = read(path.join(here, f)), low = (f === 'SKILL.md' ? t.replace(SITE, '') : t).toLowerCase();
  words.forEach(w => { if (low.includes(w.toLowerCase())) bad.push(`${f} 有內部用語「${w}」`); });
  if (t.includes(String.fromCharCode(0x2014))) bad.push(`${f} 有破折號`);
}

// 7b. 11/2 工具拿掉了貼上格子：skill 不能再叫美編去貼
['貼上 skill 給的問答', '拆進表單'].forEach(w => { [['SKILL.md', skill], ['reference/questions.md', qmd]].forEach(([f, s]) => { if (s.includes(w)) bad.push(`${f} 還叫人用拿掉的「${w}」`); }); });

// 8. 測出洞才加的規則：改寫到讀不到也算對不上。字句真的要改，這裡跟著改，不是拿掉
const MUST = ['這個數字或規格不寫進句子', '多問一句「兩款都這樣', '改完的句子再對一次', '還有跟原廠或別款比的效能', '「跟原廠一樣快」', '回得不清楚', '不放進卡片', '工具會亮「太短」的句子：句子還是放在第 4 段', '標「太短」的句子、拿掉數字的句子還是要輸出', '顏色和選的題是工具自己組句', '支架選「沒有」不追問', '- 多講的：', '`questions.md`〈定案商品名〉', '全名對過〈定案商品名〉', '別牌配件能不能一起用', '這是量過的，還是公司資料', '比較題和第 2 條例外', '照留只用在沒碰到', '不含同一個商品的兩個版本', '沒提別牌，也沒講全部都可以，不算這條', '先對〈紅線〉', '問完範圍，回答還是太短', '配件題講到磁吸，也問「兩款都這樣', '配件題講到磁吸的句子'];
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

// 11. 帶入連結：第 5 段要在；網址開頭只有一處（給同事前只改這裡）；換字表要齊；範例連結丟進工具解開，要等於第 4 段的範例
const sec5 = skill.split('**5. 帶入連結**')[1];
if (!sec5) bad.push('SKILL.md 少了第 5 段「帶入連結」');
else {
  if (!skill.includes('固定五段')) bad.push('SKILL.md 要寫固定五段');
  // 第 2 版的範例連結要示範原頁網址和圖網址：example.com 的假網址不算，其他的只能有網址開頭那一處
  const hosts = [...skill.matchAll(/https?:\/\/[^\s`)<>]+/g)].map(x => x[0]).filter(u => !/^https:\/\/([a-z0-9-]+\.)*example\.com\//.test(u));
  if (hosts.length !== 1) bad.push(`SKILL.md 的網址應該只有網址開頭那一處（example.com 的假網址不算），讀到 ${hosts.length} 處`);
  const base = skill.match(/^網址開頭：`(https:\/\/[^`\s]+\/)`$/m);
  if (!base) bad.push('SKILL.md 讀不到網址開頭那一行');
  const swap = [[' ', '%20', '半形空白'], ['%', '%25'], ['#', '%23'], ['&', '%26'], ['+', '%2B'], ['"', '%22'], ['<', '%3C'], ['>', '%3E'], ['(', '%28'], [')', '%29']];
  swap.forEach(([c, code, label]) => { if (!sec5.includes(`| ${label || '`' + c + '`'} | \`${code}\` |`)) bad.push(`換字表少了「${label || c}」換成 ${code}`); if (decodeURIComponent(code) !== c) bad.push(`換字表寫錯：${code} 解開不是「${c}」`); });
  ['行和行之間放 `%0A`', '結尾一定要有 `&end`', '`index.html` 和 `html`', '`long-image.html` 和 `long`', '`case`', '`other`', '連結打不開，回來跟我說，我再給一次連結', '還是打不開，就照對照表最右邊那欄', '連結解開就是第 4 段'].forEach(w => { if (!skill.includes(w)) bad.push(`SKILL.md 少了帶入連結的規則：${w}`); });
  const m = sec5.match(/\]\(網址開頭long-image\.html(#train=[a-z]+&set=[^)\s]*)\)/);
  if (!m) bad.push('SKILL.md 找不到範例連結');
  else if (exBlock) {
    const p = G.trainLinkParse(new URL('https://x.test/' + m[1]).hash);
    if (!p || p.problem) bad.push(`範例連結解不開：${p ? p.problem : '不是小火車連結'}`);
    else {
      if (p.text !== exBlock[1].replace(/\n$/, '')) bad.push('範例連結解開跟第 4 段的範例不一樣');
      if (p.page !== 'long' || p.set !== 'case' || p.name !== '範例殼') bad.push(`範例連結的頁面、題組或短名不對：${p.page}、${p.set}、${p.name}`);
    }
  }
}

// 11b. 讀網頁的連結（11/16 流程改版第 3 輪）：規則字要在；品類代號表要跟工具的品類一樣；範例連結丟進工具，要解得開、每張卡帶原文和出處、
//      數字卡預設不確定、品類放進品類那幾格、原頁網址的 & 有換回來。範例要示範到每一種行（T、O、S、U、X、R、I），格式走散才抓得到
const v2Sec = (sec5 || '').split('**讀網頁的連結（〈讀同款長條圖〉用）**')[1];
if (!v2Sec) bad.push('SKILL.md 第 5 段少了「讀網頁的連結」');
else {
  ['`v=2` 一定要有', '不用核對就放進語法', '`cat=`：其他商品才放', '`from=`：美編給的網址，照換字表換', '一定要換', '第一行 `T：`', '`O：` 原文、`S：` 出處、`U：` 圖網址', '出處不是網頁上的圖（規格分頁、美編傳的圖、美編貼的字），不寫 `U：`', '`X：` 先不放、`R：` 還讀到的、`I：` 讀不到的圖', '比較和顏色不寫', '讀網頁時不交上面五段', '講的那一行、程式碼框和照抄的那段', '連結下面的程式碼框，只放小括號裡那一段', '連結下面的程式碼框，放的就是上面小括號裡那一段'].forEach(w => { if (!v2Sec.includes(w)) bad.push(`讀網頁的連結少了這條規則：${w}`); });
  // 11/17：格式那兩格要對得上：程式碼框那一行，等於連結格式小括號裡那一段
  const fmtLink = (v2Sec.match(/\n\[打開上架工具，讀到的卡會自己放好\]\((網址開頭＋頁面#train=[^)\s]*)\)\n/) || [])[1];
  const fmtBox = (v2Sec.split('連結下面的程式碼框，只放小括號裡那一段：')[1] || '').match(/```text\n([^\n]*)\n```/);
  if (!fmtLink || !fmtBox) bad.push('讀網頁的連結：讀不到連結格式或程式碼框格式那一格');
  else if (fmtBox[1] !== fmtLink) bad.push(`讀網頁的連結：程式碼框格式跟連結小括號裡不一樣：「${fmtBox[1]}」／「${fmtLink}」`);
  if (!skill.includes('讀同款網頁時不交這五段')) bad.push('〈輸出〉開頭少了「讀同款網頁時不交這五段」');
  // 品類代號表：兩邊都不能多，名字也要跟 questions.md 品類表一樣
  const codeRows = (v2Sec.split('| 品類 | 代號 |')[1] || '').split('\n').map(l => l.match(/^\| ([^|]+?) \| `([a-z]+)` \|$/)).filter(Boolean).map(x => [x[1], x[2]]);
  const toolCats = G.TRAIN_CATS.map(c => [c.name, c.id]);
  if (codeRows.length < 5) bad.push(`品類代號表只讀到 ${codeRows.length} 列，格式可能改了`);
  toolCats.forEach(([n, id]) => { const r = codeRows.find(x => x[0] === n); if (!r) bad.push(`品類代號表少了工具的品類「${n}」`); else eq(`品類代號表「${n}」的代號`, r[1], id); });
  codeRows.filter(([n]) => !toolCats.some(c => c[0] === n)).forEach(([n]) => bad.push(`品類代號表的「${n}」工具沒有這個品類`));
  codeRows.filter(([n]) => !cats.some(c => c.name === n)).forEach(([n]) => bad.push(`品類代號表的「${n}」不在 questions.md 的品類表`));
  const m2 = v2Sec.match(/\]\(網址開頭long-image\.html(#train=[^)\s]*)\)/);
  const said = (v2Sec.match(/原頁網址是 `(https:[^`]+)`/) || [])[1];
  if (!m2) bad.push('SKILL.md 找不到讀網頁的範例連結');
  else {
    const h = new URL('https://x.test/' + m2[1]).hash, p = G.trainLinkParse(h);
    if (!p || p.problem) bad.push(`讀網頁的範例連結解不開：${p ? p.problem : '不是小火車連結'}`);
    else {
      if (p.v !== '2') bad.push(`讀網頁的範例連結不是第 2 版（v=${p.v || '沒有'}）`);
      if (p.set !== 'other' || !p.cat) bad.push(`讀網頁的範例要示範其他商品和品類：${p.set}、${p.cat || '沒有 cat'}`);
      if (!said || p.from !== said) bad.push(`讀網頁的範例連結解開，原頁網址是「${p.from}」，例子那句寫「${said || '讀不到'}」`);
      if (!/&/.test(p.from)) bad.push('讀網頁的範例原頁網址要有 &，才示範得到換字');
      const st = { compare: '', cmp: {}, feats: [], faq: [], train: G.TRAIN0() };
      const r = G.trainFromLink(st, h, true);
      [r.rep.need, ...r.rep.manual, ...r.rep.diff].filter(Boolean).forEach(x => bad.push(`讀網頁的範例連結進工具：${x}`));
      if (st.train.cat !== p.cat) bad.push(`讀網頁的範例連結：品類沒有放進工具（${st.train.cat || '空的'}）`);
      const w = G.trainWebList(st, true);
      if (w.length < 3) bad.push(`讀網頁的範例連結只帶進 ${w.length} 張核對卡`);
      w.filter(c => !c.web.src || !c.web.at).forEach(c => bad.push(`讀網頁的範例：「${c.q}」少了原文或出處`));
      if (!w.some(c => c.web.urls.length)) bad.push('讀網頁的範例要有一張帶圖網址的卡');
      if (!w.some(c => c.web.state === 'unsure')) bad.push('讀網頁的範例要有一張數字卡（工具預設不確定）');
      if (w.some(c => c.web.state === 'ok')) bad.push('讀網頁的範例：有卡一進工具就是「對」');
      const wb = st.web || {};
      [['seen', 'T'], ['hold', 'X'], ['more', 'R'], ['noimg', 'I']].forEach(([k, tag]) => { if (!wb[k] || !wb[k].length) bad.push(`讀網頁的範例少了 ${tag}： 那一種行`); });
      if (G.trainCards(st, true).length) bad.push('讀網頁的範例：還沒核對的卡就進了語法');
    }
  }
}

// 12. 讀同款長條圖（11/15 加，11/16 改成讀網址）：〈流程〉開頭要分流過去；這一節的規則改寫到讀不到也算對不上；寫死的項數跟工具比
const imgSec = (skill.split('\n## 讀同款長條圖\n')[1] || '').split(/^## /m)[0];
if (!imgSec) bad.push('SKILL.md 少了〈讀同款長條圖〉這一節');
else {
  const flowHead = (skill.split('\n## 流程\n')[1] || '').split('### 1. 先問這四件事')[0];
  if (!flowHead.includes('〈讀同款長條圖〉')) bad.push('〈流程〉開頭少了分流到〈讀同款長條圖〉那句');
  const IMG_MUST = ['整張長圖，小字可能漏', '看不清的字寫「（看不清）」，不猜', '不從照片裡的樣子推', '不寫「沒有字」', '適用機型也不用', '顏色不從圖和規格拿', '第 4、5 條不用', '字還是只能用美編講的」，那是美編自己回答時的規則', '確定的程度照原文', '對方賣場自己的東西不進卡片', '是我們賣的同一款，就照題目處理，不擋', '同一段字只算一次', '〈紅線〉照樣擋', '〈交出前逐條對〉只對這幾條',
    // 11/15 補：問答和商品特色不寫同一句（只加在讀圖這節）
    '兩張卡不能寫成同一句，也不能只差一兩個字', '特色那張：從特色名稱的角度講', '（跟題目那張同一句）', '問答和商品特色沒有同一句',
    // 11/16 補：好幾款並排的比較表整張先不放；版本是同一個賣場能選的規格，不算這條
    '好幾款並排的比較表（同牌別的型號，或別牌）：整張進「先不放」', '我們這款那一欄也不拿', '「版本」是我們同一個賣場能選的規格', '好幾款並排的比較表整張在「先不放」',
    // 11/16 改成讀網址：只開那一頁、看不到畫面算讀不到、規格分頁讀不到不寫沒有、先講這次讀到什麼、出處寫到美編找得到、讀不到不請美編傳圖
    '你不用傳圖，也不用貼規格', '只開這一頁：不搜尋、不開別頁', '記得以前對話裡的同款商品，也不拿來補', '要點開才有', '不寫「沒有規格」', '不從檔名、替代文字、網址猜內容', '先講清楚，不請美編傳圖', '美編在工具裡自己填，不請美編傳圖', '網頁：商品特色第 3 張圖', '- [ ] 只開了美編給的那一頁', '- [ ] 出處寫到美編打開頁面找得到',
    // 11/16 流程改版（第 3 輪）：核對搬進上架工具。對話裡不交草稿表；沒按「對」的卡工具不放；數字和別牌相容字工具預設不確定；
    // 只問三件事；顏色和比較不寫；每張卡帶原文、出處、圖網址；工具打開之後不重給連結（會把按好的核對洗掉）
    '題數、全名、有沒有兩個版本都不問', '連結的 `cat=` 用〈輸出〉第 5 段品類代號表的代號', '顏色和比較都不寫成卡', '記下它在頁面上的圖網址，放進連結的 `U：`', '不自己組、不改字。不是 https 開頭的不放',
    '不交草稿表，也不請美編在對話裡一列一列回', '只有美編按「對」的卡，工具才放進要複製的語法', '工具一開始放「不確定」：對過包裝或公司資料才按「對」', '「這次讀到」寫成 `T：`', '連結上面寫一行「這次讀到：」，跟 `T：` 同一句',
    '還是打不開：把卡列成一張表交', '表上面寫「這些卡還沒核對」', '不重給連結', '- [ ] 連結裡有 `T：` 那一行', '- [ ] 每張卡後面都有 `O：` 原文和 `S：` 出處', '照頁面抄的、https 開頭，沒有自己組或猜', '- [ ] 顏色、比較、適用機型沒有寫成卡', '- [ ] 連結有 `v=2`',
    // 11/17 補：B 真測在 claude.ai 網頁版，連結畫成普通字點不了；複製程式碼框的網址貼網址列才打開。所以連結下面一律附框框
    '連結下面放一個程式碼框，裡面只放同一條網址', '從網址開頭到 `&end`，一個字都不改', '每次給連結都這樣放，再給一次的時候也是', '- [ ] 連結下面有程式碼框，裡面是同一條網址',
    // 11/17 第 2 次補：B 重跑時 momo 的圖網址是 // 開頭，照「不是 https 開頭的不放」一張都沒放。// 開頭的補 https: 再放，http: 還是不放。
    // 同一題幾處講法相反（規格「附專用黏膠」、圖「僅含保護殼」），卡片沒提醒：最後一行 S： 後面接一句，工具會顯示在出處那行
    '頁面上的網址開頭是 `//`', '前面補 `https:` 再放，後面的字一個都不改', '`http:` 開頭的還是不放', '頁面上是 `//` 開頭的，前面補了 `https:` 放進去，沒有漏掉',
    '每一處的 `O：` `S：` 都照寫', '最後一行 `S：` 的後面接「這幾個出處講法不同，請對實物或包裝確認。」', '- [ ] 用到的幾處講法相反的卡，最後一行 `S：` 後面有「這幾個出處講法不同，請對實物或包裝確認。」'];
  IMG_MUST.filter(w => !imgSec.includes(w)).forEach(w => bad.push(`〈讀同款長條圖〉少了這條規則：${w}`));
  // 照抄給美編的兩段要在引用框裡，不然模型會改寫
  ['> 先問三件事：', '> 再請你給我同款商品的網址', '> 點上面的連結，上架工具會打開，讀到的卡都放好了', '> 點上面的連結，上架工具會打開，讀到的卡都放好了。連結點不了的話，複製上面框框裡的整段，貼到瀏覽器的網址列，一樣會打開。', '> - 對：我們這款也是這樣。只有按「對」的卡會放進要複製的語法。', '> 連結打不開，回來跟我說，我再給一次連結。'].forEach(w => { if (!imgSec.includes(w)) bad.push(`〈讀同款長條圖〉照抄的那段少了：${w}`); });
  if (!skill.includes('讀圖寫的卡，另外對〈讀同款長條圖〉最後那份')) bad.push('〈交出前逐條對〉少了指到〈讀同款長條圖〉那句');
  // 11/16 第 3 輪：草稿表拿掉了（核對搬進工具）。還留著就是兩套做法並存，模型會照舊叫美編在對話裡勾
  ['| # | 題目 | 原文（逐字） |', '每一列回「對」'].forEach(w => { if (imgSec.includes(w)) bad.push(`〈讀同款長條圖〉還有舊的草稿表做法：${w}`); });
}
// 11/16：開頭那段要寫明網頁只開美編給的那一頁
if (!(skill.split('\n## 流程\n')[0] || '').includes('網頁只開美編給的那一頁')) bad.push('開頭少了「網頁只開美編給的那一頁」那句');
nums('SKILL.md', skill, /特色最多寫 (\d+) 項/g, [G.FEATS_MAX]);
nums('SKILL.md', skill, /讀到的不到 (\d+) 項/g, [G.FEATS_MIN]);

if (bad.length) { console.error(`對不上 ${bad.length} 處：`); bad.forEach(b => console.error('  ✗ ' + b)); process.exit(1); }
console.log(`對齊：手機殼 ${Object.keys(sections.case).length} 題（工具固定題 ${G.trainQs('case').length}）、其他商品 ${Object.keys(sections.other).length} 題（工具固定題 ${G.trainQs('other').length}）、品類表 ${cats.length} 列、追問字 ${asked.length} 個、語氣規則相同、§6 ${sec6.length} 行都在、內部用語 ${words.length} 個掃過 0 筆、定案商品名 ${finalNames.length} 款、問答範例工具拆得開、範例連結解開相同、讀網頁的範例連結進工具每張卡都要核對、品類代號 ${G.TRAIN_CATS.length} 類對得上、讀同款長條圖的規則都在`);
