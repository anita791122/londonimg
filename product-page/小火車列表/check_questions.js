#!/usr/bin/env node
// 對齊檢查（11/18 第三版）：skill 寫的上限有沒有跟上架工具走散、第二版的東西有沒有留著。對不上就印出來、exit 1。
// 用法：node check_questions.js（改了工具的字數或題數上限、改了 SKILL.md 後跑；打包 zip 前一定跑）
// 這支是給維護的人用的，不進 zip。
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const here = __dirname;
const up = (...p) => path.join(here, '..', ...p);
const read = p => fs.readFileSync(p, 'utf8');
const G = require(up('上架工具', 'src', 'gen.js'));
const skill = read(path.join(here, 'SKILL.md'));
const readme = read(path.join(here, 'README.md'));

let fails = 0;
const ok = (cond, msg) => { console.log((cond ? '  ✓ ' : '  ✗ ') + msg); if (!cond) fails++; };

console.log('[1] 名稱和說明');
const fm = skill.match(/^---\n([\s\S]*?)\n---\n/);
const name = fm && (fm[1].match(/^name: (.+)$/m) || [])[1];
const desc = fm && (fm[1].match(/^description: (.+)$/m) || [])[1];
ok(name === 'londonimg-train-list', `name 是 londonimg-train-list（實際 ${name}）`);
ok(desc && desc.length <= 1024, `description 1024 字以內（實際 ${desc ? desc.length : 0}）`);

console.log('[2] 上限跟上架工具一樣');
// 每個數字都要在 SKILL.md 讀得到，而且每一處都一樣（同一個數字寫好幾處，改一處漏一處讀起來照樣通順）
const nums = re => [...skill.matchAll(re)].map(m => +m[1]);
const same = (list, want, what) => ok(list.length > 0 && list.every(n => n === want), `${what}：SKILL.md 寫 ${list.join('、') || '（讀不到）'}，工具是 ${want}`);
same(nums(/最多 (\d+) 題/g), G.FAQ_MAX, '題數上限');
same(nums(/題目 (\d+) 字/g), G.LIMIT.faqQ, '題目字數');
// 有型號的商品要留一格給美編自己加的適用機型：skill 寫的題數＝工具上限減 1
same(nums(/寫到 (\d+) 題就停/g), G.FAQ_MAX - 1, '有型號的商品題數（留一格給適用機型）');
same(nums(/回答 (\d+) 字/g), G.LIMIT.faqA, '回答字數');

console.log('[3] 沒有內部用語、沒有破折號');
const words = read(up('上架工具', 'build.js')).match(/PRIVATE_WORDS = \[(.*?)\]/)[1].match(/'([^']+)'/g).map(s => s.slice(1, -1));
ok(words.length > 5, `內部用語清單讀得到（${words.length} 個）`);
[['SKILL.md', skill], ['README.md', readme]].forEach(([f, t]) => {
  const hit = words.filter(w => t.includes(w));
  ok(hit.length === 0, `${f} 沒有內部用語` + (hit.length ? '：' + hit.join('、') : ''));
  ok(!t.includes('—'), `${f} 沒有破折號`);
});

console.log('[4] 第二版的東西沒有留著');
[['#train=', '帶入連結'], ['v=2', '第 2 版連結'], ['questions.md', '題目表'], ['tone-rules.md', '語氣規則複本'], ['固定題', '固定題'], ['短名', '短名'], ['先不放', '先不放']].forEach(([w, what]) =>
  ok(!skill.includes(w), `SKILL.md 沒有「${w}」（${what}，第三版拿掉了）`));
ok(!fs.existsSync(path.join(here, 'reference')) || fs.readdirSync(path.join(here, 'reference')).length === 0, 'reference/ 資料夾是空的或不在');

console.log('[5] 輸出格式');
ok(/```text\n有支架嗎？怎麼用？\n```\n\n```text\n有。/.test(skill), '兩個框框的範例在：題目一個框、回答一個框');
ok(skill.includes('> 共 N 題。每個框框右上角有複製鈕：題目貼進上架工具「選購前先看」的「問題」，回答貼進「回答」。格子不夠就按「＋ 再加一題」。') && /> 這些是從網頁讀來的，貼之前請看一下我們這款是不是也這樣。/.test(skill), '第一行和最後一行照抄的句子在，第一行整句對（按鈕和格子的名字跟工具一樣）');
const tf = read(up('上架工具', 'src', 'train-form.js'));
ok(tf.includes("'＋ 再加一題'") && tf.includes("'問題'") && tf.includes("'回答'") && tf.includes("'選購前先看'"), '第一行講到的「選購前先看」「問題」「回答」「＋ 再加一題」，工具上真的叫這個名字');
ok(/適用機型請自己在工具加一題/.test(skill), '有型號的商品：最後提醒美編自己加適用機型');
ok(/請美編把商品頁的文字貼過來，或傳商品圖的截圖/.test(skill), '讀不到網頁：請美編貼字或傳截圖');
// 範例題目、回答也要守自己定的字數（範例超過，模型會照著超過）
const ex = [...skill.matchAll(/```text\n([^\n]+)\n```/g)].map(m => m[1]);
ok(ex.length === 2 && G.width(ex[0]) <= G.LIMIT.faqQ && G.width(ex[1]) <= G.LIMIT.faqA, `框框範例的字數在上限內（${ex.map(G.width).join('、')}）`);

console.log('[6] zip（只提醒）');
const zip = up('listing-tool', 'londonimg-train-list.zip');
try {
  const list = execFileSync('unzip', ['-Z1', zip], { encoding: 'utf8' }).trim().split('\n');
  const inZip = execFileSync('unzip', ['-p', zip, 'londonimg-train-list/SKILL.md'], { encoding: 'utf8' });
  const files = list.filter(x => !x.endsWith('/'));
  console.log((inZip === skill && files.join() === 'londonimg-train-list/SKILL.md' ? '  ✓ ' : '  ! ') + `zip 裡是 ${files.join('、')}；SKILL.md ${inZip === skill ? '跟這裡一樣' : '跟這裡不一樣：還沒重新打包'}`);
} catch (e) { console.log('  ! 讀不到 zip：' + e.message.split('\n')[0]); }

console.log(fails ? `\n✗ ${fails} 項對不上` : '\n✓ 全部對得上');
process.exit(fails ? 1 : 0);
