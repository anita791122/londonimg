# 倫敦印象 商品頁設定 Skill

給同事用的 Claude skill：輸入商品資訊，產出 SHOPLINE 後台「網路搜尋最佳化」的四欄：
**標題、簡介、關鍵字、描述性網址**，可以直接貼進後台。

2026-10-10 起只產這四欄。商品描述和商品摘要改用「上架工具」產生，這一版的文案由美編自己寫。

## 安裝（claude.ai 網頁／桌面 App）
1. 前置（只做一次）：**設定 Settings → 功能 Capabilities** → 開啟 **Code execution and file creation**。
2. **自訂 Customize → 技能 Skills** → 右上角 **Add** → **Upload a skill** → 上傳 `londonimg-product.zip`（整顆 zip，**不要解壓縮或改資料夾名**：資料夾名跟 skill 名稱不一致會上傳失敗）。
3. 回技能清單確認開關已開。**更新版本＝點該 skill 旁邊的「…」→ Delete 刪掉舊的 → 重新上傳新 zip**（skill 不會自動更新）。
   - 公司如果是 Team／Enterprise 方案：由**組織擁有者**在 **Organization settings → Skills** 上傳一次，全組織自動可用。

## 使用
對 Claude 說：**「幫 [商品名] 寫商品頁設定」**，例如
「幫 YU 360°無段支架手機殼 寫商品頁設定，賣點是 360 支架、MagSafe、防摔」。
有分機型的商品，把上架工具「商品摘要」分頁裡的「適用機型」那一行一起貼給 Claude。

## 內含
- `SKILL.md`：主指示（觸發、流程、輸出）
- `reference/seo-geo-rules.md`：四欄的寫法、適用機型的寫法、品類快查表、自我檢查清單
- `reference/brand-voice.md`：品牌語氣與定位（內部文件，不在公開下載包裡；有的話放進 `reference/`）
