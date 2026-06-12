# 倫敦印象 商品頁文案 Skill

給同事用的 Claude skill：輸入商品資訊，自動產出 SHOPLINE 商品頁的
**SEO 後台四欄（標題／簡介／關鍵字／描述性URL）＋ 商品描述文案（定義句／段落標題／常見問答）**，
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
- `reference/seo-geo-rules.md` — 各欄位 SEO/GEO 寫法
- `reference/brand-voice.md` — 品牌語氣與定位
- `reference/shopline-output.md` — SHOPLINE 平台限制與輸出格式
