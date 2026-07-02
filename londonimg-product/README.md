# 倫敦印象 商品頁文案 Skill

給同事用的 Claude skill：輸入商品資訊，依序自動產出 SHOPLINE 商品頁的
**A. 商品資訊（商品名稱中英雙語＋商品摘要促銷框）→ B. 商品描述（照教學頁 13 塊積木逐塊給文字）→ C. 商品頁設定（SEO 四欄：標題／簡介／關鍵字／描述性URL）**，
可直接貼進後台。

## 安裝（claude.ai 網頁／桌面 App）
1. 下載並解壓縮本資料夾（或下載 `londonimg-product.zip`）。
2. claude.ai → 設定 → **Capabilities / Skills** → 上傳該 skill（zip）→ 開啟。
   - 公司 Team/Enterprise 方案：由管理員上傳一次即可全團隊共用。

## 使用
對 Claude 說：**「幫 [商品名] 寫商品頁文案」**，例如
「幫 YU 360°無段支架手機殼 B67 寫商品頁文案，賣點是 360 支架、MagSafe、防摔，適用 iPhone 12–16」。
Claude 會依序產出可複製的各欄位。

## 內含
- `SKILL.md` — 主指示（觸發、流程、輸出）
- `reference/page-blocks.md` — 商品描述 13 塊積木與欄位（與教學頁同名同順序）
- `reference/seo-geo-rules.md` — 各欄位 SEO/GEO 寫法
- `reference/brand-voice.md` — 品牌語氣與定位
- `reference/shopline-output.md` — SHOPLINE 平台限制與輸出格式
- `reference/block-html-templates.md` — 各積木可貼 HTML 模板（教學頁原樣鏡像；只在使用者要 HTML 時載入）
