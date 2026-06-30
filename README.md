# Londonimg — SHOPLINE 商品頁建置教學

倫敦印象（londonimg.tw）SHOPLINE 商品頁建置的同事教學頁與 Claude Skill。

## 內容

| 檔案 | 說明 |
|------|------|
| `index.html` | 入口頁（GitHub Pages 根網址）。 |
| `product-page-guide.html` | 給同事的商品頁建置教學頁（六分頁：Claude Skill／圖片取得／商品資訊／商品頁語法 14 區塊 ✏️ 填空一鍵複製／頁面設定／301 轉址）。 |
| `londonimg-product.zip` ‧ `londonimg-product/` | 給 claude.ai 用的商品頁 skill（壓縮檔＋原始檔）。 |
| `yu-pdp.css` | 商品描述共用樣式（選用）。可經 jsDelivr 載入。 |

> 其餘草稿、原型與報告（商品描述各版、原型頁、優化報告、素材）僅保留在本機、不托管於 GitHub。

## GitHub Pages

- 入口：<https://anita791122.github.io/londonimg/>
- 教學頁：<https://anita791122.github.io/londonimg/product-page-guide/product-page-guide.html>

## 透過 jsDelivr 載入 yu-pdp.css

本 repo 為 **public**，在 SHOPLINE「頁首自訂程式碼」加入：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/anita791122/londonimg@main/yu-pdp.css">
```

> 改檔後 jsDelivr 快取最長約 12 小時；可打 git tag 或用 purge.jsdelivr.net 強制刷新。
> ⚠️ 用 jsDelivr，不要用 GitHub raw（MIME 類型會錯）。
