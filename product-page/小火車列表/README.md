# 小火車列表 Skill

問美編商品的問題，把回答寫成完整句子，輸出問答給上架工具用。

現在只放本機，還沒打包、沒有發給同事。

## 內含
- `SKILL.md`：流程、寫法、紅線、輸出格式、交出前的檢查
- `reference/questions.md`：題目、問到第幾題、貼到工具哪一格
- `reference/tone-rules.md`：語氣規則，`londonimg-product/reference/tone-rules.md` 的複本。要改去改本尊，再複製過來
- `check_questions.js`：對齊檢查，不進 zip

## 怎麼試
在 Claude Code 從專案根目錄開對話，說：

> 照 `交付物/product-page/小火車列表/SKILL.md`，幫我做某商品的小火車。

## 題目有兩份，怎麼對齊
工具的固定題在 `上架工具/src/gen.js` 的 `TRAIN_Q`（畫面由 `src/train-form.js` 畫）。skill 的題目在 `reference/questions.md`。

做法是一支檢查：`node check_questions.js`。對不上就列出來、exit 1。下面這些事之後要跑，打包 zip 前也一定要跑：
- 改了 `TRAIN_Q`、選項、字數門檻
- 改了語氣規則（`tone-rules.md`）
- 改了提醒字清單（`seo-geo-rules.md` §6）

它查的是：固定題的問句一字不差；skill 自己加的題目 id 用 `c-`／`o-` 開頭、問句不跟固定題撞；手機殼每一級 5 題；題目裡沒有紅線字；太短、字數、特色項數的數字跟工具一樣；語氣規則和 §6 一樣；沒有內部用語和破折號。

它不查的：skill 自己加的題目問得好不好，SKILL.md 的追問句和紅線句寫得對不對。

## 打包前要做
- 工具加「貼上 skill 給的問答」格子，再改 SKILL.md〈輸出〉最後那段。現在是一題一題手動貼
- `name` 是 `londonimg-train-list`（skill 名稱只能用小寫英數和連字號）。zip 裡的資料夾要改成同名，資料夾名跟 skill 名稱不一致會上傳失敗
- zip 不帶 `check_questions.js`
- 給同事看的句子（追問、紅線提示、自己加的題目）還沒跑去 AI 味，發之前跑
