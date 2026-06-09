# _tools

## gen_doc.py — 重新產生「給同事的教學頁」

把 `b67-description-inline.html`（單一真實來源）自動拆成 12 個區塊，
產出 `b67-product-page-guide.html`（三分頁教學頁：設定／語法／圖片取得，
每塊含白話說明＋真實預覽＋一鍵複製的「✏️ 填空語法」）。

### 用法

```bash
cd 交付物/_tools
python3 gen_doc.py
```

會覆寫上一層的 `b67-product-page-guide.html`。

### 何時要重跑

只要改了 `b67-description-inline.html`（新增/調整區塊、文案、圖片），
就重跑一次，教學頁的預覽與填空語法會自動同步。

> 路徑用腳本所在位置推算，不寫死絕對路徑；整個 repo 搬到別處也能跑。
> 若改了區塊的真實文案，記得同步更新 gen_doc.py 裡 `edits` 的對應字串（填空替換靠精準字串比對）。
