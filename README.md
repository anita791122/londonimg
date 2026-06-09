# Londonimg — SHOPLINE 商品頁交付物

倫敦印象（londonimg.tw）SHOPLINE 商品頁優化的網頁交付物與共用樣式。

## 內容

| 檔案 | 說明 |
|------|------|
| `yu-pdp.css` | 商品描述全站共用樣式（v1 舊系統 + v2 新系統）。可經 jsDelivr 載入。 |
| `b67-description-inline.html` | B67 商品描述 — 全 inline style 版（描述欄位直接貼，免外部 CSS）。 |
| `b67-description-css-separated.html` | B67 商品描述 — CSS 分離響應式版（A. CSS 放主題／B. HTML 貼描述）。 |
| `b67-product-page-guide.html` | 給同事的商品頁建置教學頁（三分頁：設定／語法／圖片取得；含一鍵複製填空語法）。 |
| `b67-product-page-prototype.html` | B67 商品頁改版對照原型。 |
| `LandingPage_prototype.html` | 首頁完整原型。 |
| `londonimg_optimization_handbook.html` / `londonimg_homepage_audit.html` | 優化報告。 |
| `images/`, `prototype-assets/` | 原型用素材。 |

## 透過 jsDelivr 載入 yu-pdp.css

本 repo 為 **public**，在 SHOPLINE「頁首自訂程式碼」加入：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/anita791122/londonimg@main/yu-pdp.css">
```

> 改檔後 jsDelivr 快取最長約 12 小時；可打 git tag 或用 purge.jsdelivr.net 強制刷新。
> ⚠️ 用 jsDelivr，不要用 GitHub raw（MIME 類型會錯）。

## 注意

- 原型內的商品、價格、評價皆為**示意資料**。
- 商品描述 HTML 的圖片用 SHOPLINE 圖床網址；套用到其他商品時替換 `src` 即可。
