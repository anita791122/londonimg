# 商品描述各區塊 HTML 模板（產「可貼 HTML」時照這個用）

> ⚠️ 產出「可貼 HTML」時，**一律照下面對應區塊的模板複製**，只做兩件事：
> 1. 把每個 `✏️【文字欄位】`（英文小標／區塊標題／說明文字／情境N標題…）換成你產的文字。
> 2. **圖片佔位 `✏️【請貼上圖片網址（見「圖片取得方式」分頁）】` 保持不動。**
>
> **絕對不可自創版面、不可改圖片數量、不可加 font-family 等額外樣式。**
> 各區塊圖片數量是固定的：特色區① = **三張**方圖、特色區②③ = **兩張**、特色區④ = **圖文配對兩張**（各帶 figcaption）、使用情境 = 每個情境一張（模板 4 段，用不到就刪整段）、首屏 Hero／功能特色 = 一張背景圖。
> 區塊都不設 max-width（滿版，SHOPLINE 版位會自動限寬置中，見 shopline-output.md）。

---

## 影音實測
```html
<div style="padding:34px 0 10px">
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 16px;color:#c8502d;padding:0 12px">影音實測</h2>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px">
      <div style="flex:1 1 320px;min-width:0;margin:0 0 18px;text-align:center;display:flex;flex-direction:column">
        <b style="font-size:17px;display:block;max-width:335px;margin:0 auto">✏️【請填入影片1標題】</b>
        <p style="font-size:16px;color:#6b6b6b;line-height:1.5;margin:4px auto 12px;max-width:335px;padding:0 4px">✏️【請填入影片1說明文字】</p>
        <div style="margin-top:auto">
          ✏️【請貼上 YouTube 嵌入程式碼：影片→分享→嵌入→複製整段】
        </div>
      </div>
      <div style="flex:1 1 320px;min-width:0;margin:0 0 18px;text-align:center;display:flex;flex-direction:column">
        <b style="font-size:17px;display:block;max-width:335px;margin:0 auto">✏️【請填入影片2標題】</b>
        <p style="font-size:16px;color:#6b6b6b;line-height:1.5;margin:4px auto 12px;max-width:335px;padding:0 4px">✏️【請填入影片2說明文字】</p>
        <div style="margin-top:auto">
          ✏️【請貼上 YouTube 嵌入程式碼：影片→分享→嵌入→複製整段】
        </div>
      </div>
    </div>
  </div>
```

## 首屏 Hero 大圖
```html
<div style="position:relative;border-radius:18px;overflow:hidden;background:#0d0f0c;text-align:center;margin:6px 0 0">
    <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;display:block;border-radius:18px">
    <div style="position:absolute;left:0;right:0;top:0;height:55%;background:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0));z-index:1;pointer-events:none"></div>
    <div style="position:absolute;left:0;right:0;top:6%;padding:0 16px;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.4);z-index:2">
      <div style="display:inline-block;font-size:15px;font-weight:800;letter-spacing:3px;background:rgba(0,0,0,.5);padding:4px 11px;border-radius:6px;margin-bottom:10px">✏️【請填入品牌，例：YU】</div>
      <div style="font-size:clamp(28px,6vw,40px);font-weight:800;letter-spacing:1px;margin:0 0 5px">✏️【請填入主標題】</div>
      <p style="font-size:clamp(15px,3vw,20px);margin:0;letter-spacing:1px">✏️【請填入副標題（一句賣點）】</p>
    </div>
  </div>
```

## 定義句
```html
<div style="margin:22px 0 4px">
    <div style="background:#faf8f6;border-left:4px solid #c8502d;border-radius:0 12px 12px 0;padding:22px 26px">
      <p style="margin:0;color:#5b564d;font-size:clamp(16px,2.4vw,18px);line-height:1.9;text-align:left"><strong style="color:#1c1b19;font-weight:700">✏️【請填入：品牌＋商品全名】</strong>是一款內建<strong style="color:#1c1b19;font-weight:700">✏️【特色1】</strong>、支援 <strong style="color:#1c1b19;font-weight:700">✏️【特色2】</strong>、適用 <strong style="color:#1c1b19;font-weight:700">✏️【適用機型】</strong>（mini 除外）的<strong style="color:#1c1b19;font-weight:700">✏️【商品品類】</strong>，✏️【請填入一句話賣點】。</p>
    </div>
  </div>
```

## 特色區①
```html
<div style="padding:34px 4px">
    <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 10px">✏️【請填入區塊標題】</h2>
    <p style="text-align:center;color:#8a8377;font-size:clamp(16px,2.4vw,20px);line-height:1.5;max-width:46ch;margin:0 auto 16px">✏️【請填入說明文字】</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:10px">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 190px;min-width:0;margin:4px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 190px;min-width:0;margin:4px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 190px;min-width:0;margin:4px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>
  </div>
```

## 特色區②
```html
<div style="padding:34px 4px">
    <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 10px">✏️【請填入區塊標題】</h2>
    <p style="text-align:center;color:#8a8377;font-size:clamp(16px,2.4vw,20px);line-height:1.5;max-width:46ch;margin:0 auto 16px">✏️【請填入說明文字】</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:8px">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 240px;min-width:0;margin:5px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 240px;min-width:0;margin:5px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>
  </div>
```

## 特色區③
```html
<div style="padding:34px 4px">
    <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 10px">✏️【請填入區塊標題】</h2>
    <p style="text-align:center;color:#8a8377;font-size:clamp(16px,2.4vw,20px);line-height:1.5;max-width:46ch;margin:0 auto 16px">✏️【請填入說明文字】</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:8px">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 240px;min-width:0;margin:5px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 240px;min-width:0;margin:5px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>
  </div>
```

## 對照表
```html
<div style="padding:20px 4px 8px">
    <div style="position:relative;border-radius:18px;overflow:hidden">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;display:block;border-radius:18px">
      <div style="position:absolute;top:0;left:0;right:0;padding:6% 5% 0;text-align:center">
        <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
        <div style="color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.5);margin-bottom:14px">
          <span style="display:block;font-size:clamp(20px,4.5vw,24px);font-weight:800;line-height:1.2">✏️【請填入對照大標，例：一般款？升級款】<small>✏️【副標，例：(升級版)】</small>?</span>
          <span style="display:block;font-size:clamp(26px,6vw,34px);font-weight:800;line-height:1.2;margin-top:2px">✏️【請填入第二行大標】</span>
        </div>
        <table style="width:100%;border-collapse:separate;border-spacing:0;font-size:clamp(12px,2.5vw,20px);background:rgba(18,20,18,.5);border-radius:10px;overflow:hidden;color:#fff;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)">
          <thead><tr>
            <th style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.3);font-weight:800;text-align:left;width:38%"></th>
            <th style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.3);font-weight:800">✏️【欄1標題】</th>
            <th style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.3);font-weight:800">✏️【欄2標題】</th>
          </tr></thead>
          <tbody>
            <tr>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:left;font-weight:700">✏️【比較項目1】</td>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:center;color:#7fe0a3;font-weight:700">● ✏️【填結果】</td>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:center;color:#7fe0a3;font-weight:700">● ✏️【填結果】</td>
            </tr>
            <tr>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:left;font-weight:700">✏️【比較項目2】</td>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:center;color:#7fe0a3;font-weight:700">● ✏️【填結果】</td>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:center;color:#7fe0a3;font-weight:700">● ✏️【填結果】</td>
            </tr>
            <tr>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:left;font-weight:700">✏️【比較項目3】</td>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:center;color:#ff8f8f;font-weight:700">● ✏️【填結果】</td>
              <td style="padding:clamp(8px,1.8vw,16px) 8px;border:1px solid rgba(255,255,255,.2);text-align:center;color:#7fe0a3;font-weight:700">● ✏️【填結果】</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
```

## 版本卡片
```html
<div style="padding:34px 4px">
    <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 10px">✏️【請填入區塊標題，例：一般款 vs 升級款】</h2>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:10px">
      <figure style="flex:1 1 230px;min-width:0;margin:6px;border:1px solid #e7e3dc;border-radius:16px;overflow:hidden;position:relative">
        <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block">
        <span style="position:absolute;top:10px;left:10px;font-size:clamp(15px,3vw,20px);font-weight:700;padding:5px 12px;border-radius:8px;background:#efece6;color:#7a7367;box-shadow:0 1px 6px rgba(0,0,0,.18)">✏️【標籤1】</span>
        <figcaption style="padding:11px 13px"><b style="display:block;font-size:16px;margin-bottom:2px">✏️【卡片1標題】</b><small style="color:#8a8377;font-size:16px;line-height:1.5">✏️【卡片1說明】</small></figcaption>
      </figure>
      <figure style="flex:1 1 230px;min-width:0;margin:6px;border:1px solid #e7e3dc;border-radius:16px;overflow:hidden;position:relative">
        <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block">
        <span style="position:absolute;top:10px;left:10px;font-size:clamp(15px,3vw,20px);font-weight:700;padding:5px 12px;border-radius:8px;background:#e6f3ec;color:#2e7d52;box-shadow:0 1px 6px rgba(0,0,0,.18)">✏️【標籤2】</span>
        <figcaption style="padding:11px 13px"><b style="display:block;font-size:16px;margin-bottom:2px">✏️【卡片2標題】</b><small style="color:#8a8377;font-size:16px;line-height:1.5">✏️【卡片2說明】</small></figcaption>
      </figure>
    </div>
  </div>
```

## 特色區④
```html
<div style="padding:34px 4px">
    <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 10px">✏️【請填入區塊標題】</h2>
    <p style="text-align:center;color:#8a8377;font-size:clamp(16px,2.4vw,20px);line-height:1.5;max-width:46ch;margin:0 auto 16px">✏️【請填入說明文字】</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:8px">
      <figure style="flex:1 1 250px;min-width:0;margin:7px">
        <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;display:block">
        <figcaption style="margin-top:10px;text-align:center;color:#8a8377;font-size:16px;line-height:1.5">✏️【請填入圖1圖說】</figcaption>
      </figure>
      <figure style="flex:1 1 250px;min-width:0;margin:7px">
        <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;display:block">
        <figcaption style="margin-top:10px;text-align:center;color:#8a8377;font-size:16px;line-height:1.5">✏️【請填入圖2圖說】</figcaption>
      </figure>
    </div>
  </div>
```

## 使用情境
```html
<div style="padding:34px 4px">
    <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;text-align:center;margin-bottom:8px">✏️【英文小標】</div>
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 10px">✏️【請填入區塊標題】</h2>

    <div style="display:flex;flex-wrap:wrap;flex-direction:row-reverse;align-items:center;margin:18px 0">
      <div style="flex:1 1 280px;min-width:0;margin:8px">
        <div style="font-size:14px;font-weight:800;letter-spacing:2px;color:#c2502e">情境 01</div>
        <h3 style="font-size:clamp(20px,3.5vw,22px);font-weight:800;margin:6px 0 8px">✏️【情境1標題】</h3>
        <p style="color:#4a463f;font-size:clamp(16px,2.4vw,20px);line-height:1.5;margin:0">✏️【情境1說明】</p>
      </div>
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 280px;min-width:0;margin:8px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>

    <div style="display:flex;flex-wrap:wrap;align-items:center;margin:18px 0">
      <div style="flex:1 1 280px;min-width:0;margin:8px">
        <div style="font-size:14px;font-weight:800;letter-spacing:2px;color:#c2502e">情境 02</div>
        <h3 style="font-size:clamp(20px,3.5vw,22px);font-weight:800;margin:6px 0 8px">✏️【情境2標題】</h3>
        <p style="color:#4a463f;font-size:clamp(16px,2.4vw,20px);line-height:1.5;margin:0">✏️【情境2說明】</p>
      </div>
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 280px;min-width:0;margin:8px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>

    <div style="display:flex;flex-wrap:wrap;flex-direction:row-reverse;align-items:center;margin:18px 0">
      <div style="flex:1 1 280px;min-width:0;margin:8px">
        <div style="font-size:14px;font-weight:800;letter-spacing:2px;color:#c2502e">情境 03</div>
        <h3 style="font-size:clamp(20px,3.5vw,22px);font-weight:800;margin:6px 0 8px">✏️【情境3標題】</h3>
        <p style="color:#4a463f;font-size:clamp(16px,2.4vw,20px);line-height:1.5;margin:0">✏️【情境3說明】</p>
      </div>
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 280px;min-width:0;margin:8px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>

    <div style="display:flex;flex-wrap:wrap;align-items:center;margin:18px 0">
      <div style="flex:1 1 280px;min-width:0;margin:8px">
        <div style="font-size:14px;font-weight:800;letter-spacing:2px;color:#c2502e">情境 04</div>
        <h3 style="font-size:clamp(20px,3.5vw,22px);font-weight:800;margin:6px 0 8px">✏️【情境4標題】</h3>
        <p style="color:#4a463f;font-size:clamp(16px,2.4vw,20px);line-height:1.5;margin:0">✏️【情境4說明】</p>
      </div>
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="flex:1 1 280px;min-width:0;margin:8px;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block">
    </div>
  </div>
```

## 功能特色
```html
<div style="position:relative;border-radius:18px;overflow:hidden;background:#0d0f0c;text-align:center;margin:24px 0">
    <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;display:block;border-radius:18px">
    <div style="position:absolute;left:0;right:0;top:0;height:70%;background:linear-gradient(to bottom,rgba(0,0,0,.55),rgba(0,0,0,0));z-index:1;pointer-events:none"></div>
    <div style="position:absolute;left:0;right:0;top:7%;padding:0 8%;text-align:center;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.5);z-index:2">
      <div style="font-size:14px;font-weight:800;letter-spacing:3px;margin-bottom:4px">✏️【請填入小標】</div>
      <div style="font-size:clamp(26px,5.5vw,34px);font-weight:800;margin:0 0 12px;line-height:1.2">✏️【請填入大標】</div>
      <p style="font-size:clamp(13px,2.6vw,20px);line-height:1.6;margin:3px 0">✏️【特色1】</p>
      <p style="font-size:clamp(13px,2.6vw,20px);line-height:1.6;margin:3px 0">✏️【特色2】</p>
      <p style="font-size:clamp(13px,2.6vw,20px);line-height:1.6;margin:3px 0">✏️【特色3】</p>
    </div>
  </div>
```

## 適用機型
```html
<div style="padding:34px 4px">
    <div style="display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,56px);margin:0 auto">
      <div style="flex:1 1 200px;min-width:0;text-align:center">
        <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;margin-bottom:8px">✏️【英文小標】</div>
        <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;line-height:1.35;margin:0">適用機型</h2>
      </div>
      <div style="flex:2 1 360px;min-width:0">
        <table style="width:100%;border-collapse:separate;border-spacing:0;font-size:clamp(14px,2.4vw,18px);border:1px solid #e7e3dc;border-radius:12px;overflow:hidden">
      <thead><tr>
        <th style="padding:12px 14px;background:#faf8f6;text-align:left;font-weight:800;border-bottom:1px solid #e7e3dc">機型</th>
        <th style="padding:12px 14px;background:#faf8f6;text-align:center;font-weight:800;border-bottom:1px solid #e7e3dc;width:96px">相容</th>
      </tr></thead>
      <tbody>
        <tr><td style="padding:11px 14px;border-bottom:1px solid #efeae3">✏️【請填入相容機型，例：iPhone 16 全系列】</td><td style="padding:11px 14px;text-align:center;color:#2e9d6e;font-weight:700;border-bottom:1px solid #efeae3">✅</td></tr>
        <tr><td style="padding:11px 14px;border-bottom:1px solid #efeae3">✏️【請填入相容機型】</td><td style="padding:11px 14px;text-align:center;color:#2e9d6e;font-weight:700;border-bottom:1px solid #efeae3">✅</td></tr>
        <tr><td style="padding:11px 14px">✏️【請填入不相容機型，例：各系列 mini】</td><td style="padding:11px 14px;text-align:center;color:#d2541f;font-weight:700">❌</td></tr>
      </tbody>
        </table>
      </div>
    </div>
  </div>
```

## 規格
```html
<div style="padding:34px 4px">
    <div style="display:flex;flex-wrap:wrap;gap:clamp(20px,4vw,56px);margin:0 auto">
      <div style="flex:1 1 200px;min-width:0;text-align:center">
        <div style="font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c2502e;margin-bottom:8px">✏️【英文小標】</div>
        <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;line-height:1.35;margin:0">規格</h2>
      </div>
      <div style="flex:2 1 360px;min-width:0">
        <div style="display:flex;gap:20px;padding:16px 2px;border-top:1px solid #e2ddd3;font-size:clamp(14px,2.4vw,17px);line-height:1.6"><span style="flex:0 0 96px;color:#1c1b19;font-weight:700">✏️【規格項目，例：材質】</span><span style="color:#5b564d">✏️【請填入內容】</span></div>
        <div style="display:flex;gap:20px;padding:16px 2px;border-top:1px solid #e2ddd3;font-size:clamp(14px,2.4vw,17px);line-height:1.6"><span style="flex:0 0 96px;color:#1c1b19;font-weight:700">✏️【規格項目】</span><span style="color:#5b564d">✏️【請填入內容】</span></div>
        <div style="display:flex;gap:20px;padding:16px 2px;border-top:1px solid #e2ddd3;font-size:clamp(14px,2.4vw,17px);line-height:1.6"><span style="flex:0 0 96px;color:#1c1b19;font-weight:700">✏️【規格項目】</span><span style="color:#5b564d">✏️【請填入內容】</span></div>
        <div style="border-top:1px solid #e2ddd3"></div>
      </div>
    </div>
  </div>
```

## 常見 QA
```html
<div style="padding:34px 4px">
    <h2 style="font-size:clamp(24px,5vw,40px);font-weight:800;text-align:center;line-height:1.35;margin:0 0 24px;color:#c8502d">常見 QA</h2>

    <div style="background:#faf8f6;border-left:4px solid #c8502d;border-radius:0 10px 10px 0;padding:18px 18px 18px 16px;margin:0 0 14px">
      <p style="font-size:clamp(16px,2.6vw,20px);font-weight:700;line-height:1.5;margin:0 0 8px;color:#1a1a1a"><span style="display:inline-block;background:#c8502d;color:#fff;font-size:clamp(12px,2vw,14px);font-weight:700;border-radius:6px;padding:2px 8px;margin-right:8px;vertical-align:2px">Q</span>✏️【請填入問題1】</p>
      <p style="font-size:clamp(14px,2.4vw,18px);color:#6b6b6b;line-height:1.65;margin:0">✏️【請填入答案1】</p>
    </div>

    <div style="background:#faf8f6;border-left:4px solid #c8502d;border-radius:0 10px 10px 0;padding:18px 18px 18px 16px;margin:0 0 14px">
      <p style="font-size:clamp(16px,2.6vw,20px);font-weight:700;line-height:1.5;margin:0 0 8px;color:#1a1a1a"><span style="display:inline-block;background:#c8502d;color:#fff;font-size:clamp(12px,2vw,14px);font-weight:700;border-radius:6px;padding:2px 8px;margin-right:8px;vertical-align:2px">Q</span>✏️【請填入問題2】</p>
      <p style="font-size:clamp(14px,2.4vw,18px);color:#6b6b6b;line-height:1.65;margin:0">✏️【請填入答案2】</p>
    </div>

    <div style="background:#faf8f6;border-left:4px solid #c8502d;border-radius:0 10px 10px 0;padding:18px 18px 18px 16px;margin:0 0 14px">
      <p style="font-size:clamp(16px,2.6vw,20px);font-weight:700;line-height:1.5;margin:0 0 8px;color:#1a1a1a"><span style="display:inline-block;background:#c8502d;color:#fff;font-size:clamp(12px,2vw,14px);font-weight:700;border-radius:6px;padding:2px 8px;margin-right:8px;vertical-align:2px">Q</span>✏️【請填入問題3】</p>
      <p style="font-size:clamp(14px,2.4vw,18px);color:#6b6b6b;line-height:1.65;margin:0">✏️【請填入答案3】</p>
    </div>

    <div style="background:#faf8f6;border-left:4px solid #c8502d;border-radius:0 10px 10px 0;padding:18px 18px 18px 16px;margin:0 0 14px">
      <p style="font-size:clamp(16px,2.6vw,20px);font-weight:700;line-height:1.5;margin:0 0 8px;color:#1a1a1a"><span style="display:inline-block;background:#c8502d;color:#fff;font-size:clamp(12px,2vw,14px);font-weight:700;border-radius:6px;padding:2px 8px;margin-right:8px;vertical-align:2px">Q</span>✏️【請填入問題4】</p>
      <p style="font-size:clamp(14px,2.4vw,18px);color:#6b6b6b;line-height:1.65;margin:0">✏️【請填入答案4】</p>
    </div>

    <div style="background:#faf8f6;border-left:4px solid #c8502d;border-radius:0 10px 10px 0;padding:18px 18px 18px 16px;margin:0">
      <p style="font-size:clamp(16px,2.6vw,20px);font-weight:700;line-height:1.5;margin:0 0 8px;color:#1a1a1a"><span style="display:inline-block;background:#c8502d;color:#fff;font-size:clamp(12px,2vw,14px);font-weight:700;border-radius:6px;padding:2px 8px;margin-right:8px;vertical-align:2px">Q</span>✏️【請填入問題5】</p>
      <p style="font-size:clamp(14px,2.4vw,18px);color:#6b6b6b;line-height:1.65;margin:0 0 8px">✏️【請填入答案5-第1段】</p>
      <p style="font-size:clamp(14px,2.4vw,18px);color:#6b6b6b;line-height:1.65;margin:0">✏️【請填入答案5-第2段】</p>
    </div>
  </div>
```

