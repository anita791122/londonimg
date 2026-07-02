# 倫敦印象 商品頁文案 Skill

給同事用的 Claude skill：輸入商品資訊，依序自動產出 SHOPLINE 商品頁的
**A. 商品資訊（商品名稱中英雙語＋商品摘要促銷框）→ B. 商品描述（照教學頁 13 塊積木逐塊給文字）→ C. 商品頁設定（SEO 四欄：標題／簡介／關鍵字／描述性URL）**，
可直接貼進後台。

## 安裝（claude.ai 網頁／桌面 App・2026-07 現行介面）
1. 前置（只做一次）：**設定 Settings → 功能 Capabilities** → 開啟 **Code execution and file creation**。
2. **自訂 Customize → 技能 Skills** → 點「＋」→ **Create skill** → **Upload a skill** → 上傳 `londonimg-product.zip`（整顆 zip、**不要解壓縮或改資料夾名**——資料夾名與 skill 名稱不一致會上傳失敗）。
3. 回技能清單確認開關已開。**更新版本＝點該 skill 旁「…」→ Delete 刪舊 → 重新上傳新 zip**（skill 不會自動更新）。
   - 公司 Team/Enterprise：由**組織擁有者**在 **Organization settings → Skills → Organization skills →「＋ Add」** 上傳一次，全組織自動可用（成員在「自訂 → 技能」的**組織技能**區看到、預設開啟、只能開關不能刪）。

## 使用
對 Claude 說：**「幫 [商品名] 寫商品頁文案」**，例如
「幫 YU 360°無段支架手機殼 B67 寫商品頁文案，賣點是 360 支架、MagSafe、防摔，適用 iPhone 12–16」。
**全店任何品類都適用**（玻璃貼、鏡頭貼、行動電源、快充線／快充頭、AirPods 殼、Watch 錶帶、iPad、掛繩、支架、車用配件…），照樣講商品名＋賣點即可。
Claude 會依序產出可複製的各欄位。

## 內含
- `SKILL.md` — 主指示（觸發、流程、輸出）
- `reference/page-blocks.md` — 商品描述 13 塊積木與欄位（與教學頁同名同順序）
- `reference/seo-geo-rules.md` — 各欄位 SEO/GEO 寫法
- `reference/brand-voice.md` — 品牌語氣與定位
- `reference/shopline-output.md` — SHOPLINE 平台限制與輸出格式
- `reference/block-html-templates.md` — 各積木可貼 HTML 模板（教學頁原樣鏡像；只在使用者要 HTML 時載入）
