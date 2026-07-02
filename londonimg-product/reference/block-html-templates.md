# 商品描述各積木 HTML 模板（產「可貼 HTML」時照這個用）

> 本檔＝教學頁「商品頁語法」各積木**複製語法的原樣鏡像**（v3・SHOPLINE 實測安全）。教學頁改版時要重新同步。
>
> ⚠️ 產出「可貼 HTML」時，**一律照下面對應積木（對應版型）的模板複製**，只做一件事：
> 把文字類 `✏️【…】`（英文小標／區塊標題／主標題／說明文字…）換成你產的文字。
> **圖片網址、圖片說明（alt，如 ✏️【這張圖的說明】）、YouTube 嵌入網址、貼文／商品連結等佔位一律照模板原樣保留**（各積木佔位字不同，別改寫、別統一、別加序號；alt 由同事換圖時自填）。
> **兩個例外要直接代入**：① SNS 的 `✏️【@你的IG帳號】`＝`@london_apple`、`✏️【你的 IG 網址】`＝`https://www.instagram.com/london_apple/`（貼文網址與圖片仍留佔位）；② 收尾 CTA 兩顆按鈕的網址佔位——使用者已給商品網址就代入「完整網址＋#sl-product-image」（兩處同值），未知才保留佔位並提醒補填。
>
> **絕對不可自創版面、不可改任何 style、不可加 font-family。**（唯一可改的非 ✏️ 文字：收尾 CTA 按鈕字樣「回上方選你的機型・立即加入購物車」——商品無「選機型」情境時可改成合適字句，只改字、不動樣式。）
> 要增減卡片／列／圖：照模板內註解，複製或刪「一整段」（整個 `<div>`／`<a>`／`<figure>`）。
>
> ⚠️ SHOPLINE 商品描述欄會濾掉：`<style>`、`<script>`、`<svg>`、`<details>`、`data:` URI、CSS `gap`、CSS `aspect-ratio`——模板已全部避開（間距用 margin、等比框用 `padding-bottom` 比例盒、圖示用外部 PNG），**不要改回這些寫法**。單位用 px／clamp，不用 rem。
> 滿版積木（情境 橫圖壓文／棋盤格／多圖橫移／加價購／SNS 橫滑列）最外層的 `width:100vw;left:50%;margin-left:-50vw` 是滿版設定，原樣保留。
> 連結不可用 `href="#"`（SHOPLINE 有 `<base href="/">` 會導去首頁），一律填完整網址。

---

## 01 Hero（直圖壓文） — 版本 A：有品牌（主標上方有品牌小框，例 YU）

```html
<!-- ✏️ 版本 A（有品牌）：圖片換 src 網址、文字填【】。長長的 style="…" 不要動。 -->
<!-- Hero 直圖壓文（版本 A：有品牌） -->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:24px 0 4px">
    <div style="position:relative;overflow:hidden;background:#0d0f0c">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;display:block">
      <div style="position:absolute;left:0;right:0;top:0;height:58%;background:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0));z-index:1;pointer-events:none"></div>
      <div style="position:absolute;left:0;right:0;top:7%;text-align:center;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.4);padding:0 16px;z-index:2">
        <span style="display:inline-block;font-size:15px;font-weight:700;letter-spacing:3px;background:rgba(0,0,0,.36);border:1px solid rgba(255,255,255,.25);padding:5px 13px;border-radius:6px;margin:0 0 12px">✏️【品牌，例：YU】</span>
        <div style="font-size:clamp(30px,7vw,63px);font-weight:700;letter-spacing:1px;line-height:1.05;margin:0 0 8px">✏️【主標題，例：All-in-One】</div>
        <p style="font-size:clamp(16px,3vw,23px);margin:0;letter-spacing:.5px">✏️【副標題（一句賣點）】</p>
      </div>
    </div>
  </div>
</div>
```

## 01 Hero（直圖壓文） — 版本 B：無品牌（沒有品牌小框，只有主標＋副標）

```html
<!-- ✏️ 版本 B（無品牌）：圖片換 src 網址、文字填【】。長長的 style="…" 不要動。 -->
<!-- Hero 直圖壓文（版本 B：無品牌） -->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:24px 0 4px">
    <div style="position:relative;overflow:hidden;background:#0d0f0c">
      <img src="✏️【請貼上圖片網址（見「圖片取得方式」分頁）】" alt="✏️【請填入這張圖的內容說明】" style="width:100%;display:block">
      <div style="position:absolute;left:0;right:0;top:0;height:58%;background:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0));z-index:1;pointer-events:none"></div>
      <div style="position:absolute;left:0;right:0;top:7%;text-align:center;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.4);padding:0 16px;z-index:2">
        <div style="font-size:clamp(30px,7vw,63px);font-weight:700;letter-spacing:1px;line-height:1.05;margin:0 0 8px">✏️【主標題，例：All-in-One】</div>
        <p style="font-size:clamp(16px,3vw,23px);margin:0;letter-spacing:.5px">✏️【副標題（一句賣點）】</p>
      </div>
    </div>
  </div>
</div>
```

## 02 重點 icon 列

```html
<!-- ✏️ 改這裡：圖示換 src、文字填【】。長長的 style="…" 不要動。 -->
<!-- 重點 icon 列 -->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:clamp(16px,4vw,28px) 0;text-align:center">
    <div style="display:flex;flex-wrap:wrap;justify-content:center">

      <!-- ↓↓ 一個圖示（要多一個：整段 div 複製貼在後面，建議 3～4 個）↓↓ -->
      <div style="flex:1 1 140px;margin:14px 6px;text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;background:#f4f4f4;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <img src="✏️【請貼上線條圖示網址（PNG，見「圖片取得方式」分頁）】" alt="" width="34" height="34" style="display:block">
        </div>
        <div style="font-size:clamp(16px,2vw,19px);font-weight:600;color:#1a1a1a;margin:0 0 5px">✏️【圖示標題，例：360° 環繞支架】</div>
        <div style="font-size:15px;color:#8a8a8a;line-height:1.5">✏️【第一行說明】<br>✏️【第二行說明】</div>
      </div>
      <!-- ↑↑ 一個圖示 ↑↑ -->

      <!-- ↓↓ 一個圖示（要多一個：整段 div 複製貼在後面，建議 3～4 個）↓↓ -->
      <div style="flex:1 1 140px;margin:14px 6px;text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;background:#f4f4f4;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <img src="✏️【請貼上線條圖示網址】" alt="" width="34" height="34" style="display:block">
        </div>
        <div style="font-size:clamp(16px,2vw,19px);font-weight:600;color:#1a1a1a;margin:0 0 5px">✏️【圖示標題】</div>
        <div style="font-size:15px;color:#8a8a8a;line-height:1.5">✏️【第一行說明】<br>✏️【第二行說明】</div>
      </div>
      <!-- ↑↑ 一個圖示 ↑↑ -->

      <!-- ↓↓ 一個圖示（要多一個：整段 div 複製貼在後面，建議 3～4 個）↓↓ -->
      <div style="flex:1 1 140px;margin:14px 6px;text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;background:#f4f4f4;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <img src="✏️【請貼上線條圖示網址】" alt="" width="34" height="34" style="display:block">
        </div>
        <div style="font-size:clamp(16px,2vw,19px);font-weight:600;color:#1a1a1a;margin:0 0 5px">✏️【圖示標題】</div>
        <div style="font-size:15px;color:#8a8a8a;line-height:1.5">✏️【第一行說明】<br>✏️【第二行說明】</div>
      </div>
      <!-- ↑↑ 一個圖示 ↑↑ -->

      <!-- ↓↓ 一個圖示（要多一個：整段 div 複製貼在後面，建議 3～4 個）↓↓ -->
      <div style="flex:1 1 140px;margin:14px 6px;text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;background:#f4f4f4;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <img src="✏️【請貼上線條圖示網址】" alt="" width="34" height="34" style="display:block">
        </div>
        <div style="font-size:clamp(16px,2vw,19px);font-weight:600;color:#1a1a1a;margin:0 0 5px">✏️【圖示標題】</div>
        <div style="font-size:15px;color:#8a8a8a;line-height:1.5">✏️【第一行說明】<br>✏️【第二行說明】</div>
      </div>
      <!-- ↑↑ 一個圖示 ↑↑ -->

    </div>
  </div>
</div>
```

## 03 影音

```html
<!-- ✏️ 改這裡：影片換 src 網址、文字填【】。長長的 style="…" 不要動。 -->
<!-- 影音實測（橫滑影片牆·直式 9:16）-->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:clamp(16px,4vw,28px) 0;text-align:center">
    <div style="font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 14px">✏️【英文小標，例：In Action】</div>
    <h2 style="font-size:clamp(22px,3.4vw,32px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;margin:0 0 16px">✏️【區塊標題，例：影音實測】</h2>
    <div style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;justify-content:safe center;margin:0 -20px;padding:0 20px 4px">

      <!-- ↓↓ 一支影片（要多一支：整段 div 複製貼在後面）↓↓ -->
      <div style="flex:0 0 clamp(220px,70vw,300px);min-width:0;margin:0 12px;scroll-snap-align:center;text-align:center">
        <div style="font-size:clamp(16px,2vw,20px);font-weight:600;color:#1a1a1a;line-height:1.3;min-height:1.6em;margin:0 0 12px">✏️【影片標題（可英＋中，中間用 br 換行）】</div>
        <div style="position:relative;width:100%;padding-bottom:177.78%;overflow:hidden;background:#000">
          <iframe src="✏️【YouTube 嵌入網址：影片→分享→嵌入→複製網址】" title="影片" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;display:block" loading="lazy"></iframe>
        </div>
      </div>
      <!-- ↑↑ 一支影片 ↑↑ -->

      <!-- ↓↓ 一支影片（要多一支：整段 div 複製貼在後面）↓↓ -->
      <div style="flex:0 0 clamp(220px,70vw,300px);min-width:0;margin:0 12px;scroll-snap-align:center;text-align:center">
        <div style="font-size:clamp(16px,2vw,20px);font-weight:600;color:#1a1a1a;line-height:1.3;min-height:1.6em;margin:0 0 12px">✏️【影片標題】</div>
        <div style="position:relative;width:100%;padding-bottom:177.78%;overflow:hidden;background:#000">
          <iframe src="✏️【YouTube 嵌入網址】" title="影片" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;display:block" loading="lazy"></iframe>
        </div>
      </div>
      <!-- ↑↑ 一支影片 ↑↑ -->

    </div>
  </div>
</div>
```

## 04 特色區（標題＋多圖）

```html
<!-- ✏️ 改這裡：圖片換 src、文字填【】。長長的 style="…" 不要動。 -->
<!-- 特色區（標題＋多圖）-->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:clamp(16px,4vw,28px) 0 16px;text-align:center">
    <div style="font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 14px">✏️【英文小標，例：Stable Stand】</div>
    <h2 style="font-size:clamp(22px,3.4vw,32px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;margin:0">✏️【區塊標題，例：360° 環繞支架 ‧ 持久耐用】</h2>
    <p style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5;margin:6px auto 0;">✏️【一句說明】</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:14px">

      <!-- ↓↓ 一張方圖（要多一張：整段 div 複製貼在後面）↓↓ -->
      <div style="flex:1 1 200px;margin:6px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上方形圖片網址（見「圖片取得方式」分頁）】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>
      <!-- ↑↑ 一張方圖 ↑↑ -->

      <div style="flex:1 1 200px;margin:6px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上方形圖片網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:1 1 200px;margin:6px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上方形圖片網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

    </div>
  </div>
</div>
```

## 05 情境 橫圖壓文 — 版本 A：文字左上（圖片暗部在「左上」時用）

```html
<!-- ✏️ 版本 A（文字左上）：背景圖換 src、文字填【】。長長的 style="…" 不要動。 -->
<!-- 情境 橫圖壓文 A：文字左上（圖片暗部在「左上」的圖用這個）｜滿版·width:100vw 設定不要動 -->
<div style="position:relative;width:100vw;left:50%;margin-left:-50vw;overflow:hidden;background:#f4f4f4">
  <div style="position:relative;width:100%;height:clamp(400px,56.25vw,720px)">
    <img src="✏️【請貼上橫式情境大圖網址（見「圖片取得方式」分頁）】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(0,0,0,.58),rgba(0,0,0,.12) 44%,rgba(0,0,0,0) 66%);pointer-events:none"></div>
  </div>
  <div style="position:absolute;top:0;left:0;right:0;bottom:0">
    <div style="max-width:1080px;margin:0 auto;padding:0 20px;height:100%;position:relative">
      <div style="position:absolute;left:20px;top:clamp(18px,5vw,48px);text-align:left;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.45)">
        <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 8px">✏️【英文小標，例：Everyday】</div>
        <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;line-height:1.2;margin:0;color:#fff">✏️【情境大標，例：解放雙手，生活更自在】</h2>
        <p style="font-size:clamp(16px,2vw,18px);line-height:1.5;margin:8px 0 0;color:rgba(255,255,255,.92)">✏️【一句說明】</p>
      </div>
    </div>
  </div>
</div>
```

## 05 情境 橫圖壓文 — 版本 B：文字左下（圖片暗部在「下方」時用）

```html
<!-- ✏️ 版本 B（文字左下）：背景圖換 src、文字填【】。長長的 style="…" 不要動。 -->
<!-- 情境 橫圖壓文 B：文字左下（圖片暗部在「下方」的圖用這個）｜滿版·width:100vw 設定不要動 -->
<div style="position:relative;width:100vw;left:50%;margin-left:-50vw;overflow:hidden;background:#f4f4f4">
  <div style="position:relative;width:100%;height:clamp(400px,56.25vw,720px)">
    <img src="✏️【請貼上橫式情境大圖網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to top,rgba(0,0,0,.78),rgba(0,0,0,.28) 38%,rgba(0,0,0,0) 68%);pointer-events:none"></div>
  </div>
  <div style="position:absolute;top:0;left:0;right:0;bottom:0">
    <div style="max-width:1080px;margin:0 auto;padding:0 20px;height:100%;position:relative">
      <div style="position:absolute;left:20px;bottom:clamp(18px,5vw,44px);text-align:left;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.5)">
        <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 8px">✏️【英文小標，例：Features】</div>
        <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;line-height:1.2;margin:0;color:#fff">✏️【情境大標／可放產品全名，例：YU 360° 無段支架手機殼】</h2>
        <p style="font-size:clamp(16px,2vw,18px);line-height:1.5;margin:8px 0 0;color:rgba(255,255,255,.92)">✏️【一句說明】</p>
      </div>
    </div>
  </div>
</div>
```

## 06 棋盤格（圖文各半） — 版本 A：無英文小標（純中文標題）

```html
<!-- ✏️ 版本 A（無英文小標）：圖片換 src、文字填【】。長長的 style="…" 不要動。 -->
<!-- 棋盤格 版本 A：無英文小標（純中文標題）｜滿版·width:100vw 設定不要動 -->
<div style="padding:clamp(16px,4vw,28px) 0;position:relative;width:100vw;left:50%;margin-left:-50vw">
      <!-- ↓↓ 一列（圖右文左（加了 row-reverse））｜要反向就加／移除 flex-direction:row-reverse ↓↓ -->
      <div style="display:flex;flex-wrap:wrap;align-items:center;margin:0 0 clamp(0px,calc((768px - 100vw)*99),44px);flex-direction:row-reverse">
        <div style="flex:1 1 384px;min-width:0">
          <div style="position:relative;width:100%;padding-bottom:66.67%;overflow:hidden;background:#f4f4f4">
            <img src="✏️【請貼上橫式情境圖網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          </div>
        </div>
        <div style="flex:1 1 384px;min-width:0;box-sizing:border-box;padding:clamp(28px,5vw,56px);text-align:left">
          <h3 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.3;margin:0 0 12px">✏️【標題，例：隨身自拍神器】</h3>
          <p style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5;margin:0">✏️【說明文字】</p>
        </div>
      </div>
      <!-- ↑↑ 一列 ↑↑ -->

      <!-- ↓↓ 一列（圖左文右）｜要反向就加／移除 flex-direction:row-reverse ↓↓ -->
      <div style="display:flex;flex-wrap:wrap;align-items:center;margin:0 0 clamp(0px,calc((768px - 100vw)*99),44px)">
        <div style="flex:1 1 384px;min-width:0">
          <div style="position:relative;width:100%;padding-bottom:66.67%;overflow:hidden;background:#f4f4f4">
            <img src="✏️【請貼上橫式情境圖網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          </div>
        </div>
        <div style="flex:1 1 384px;min-width:0;box-sizing:border-box;padding:clamp(28px,5vw,56px);text-align:left">
          <h3 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.3;margin:0 0 12px">✏️【標題，例：變身增高支架】</h3>
          <p style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5;margin:0">✏️【說明文字】</p>
        </div>
      </div>
      <!-- ↑↑ 一列 ↑↑ -->
</div>
```

## 06 棋盤格（圖文各半） — 版本 B：有英文小標（每列多一行英文小標）

```html
<!-- ✏️ 版本 B（有英文小標）：圖片換 src、文字填【】。長長的 style="…" 不要動。 -->
<!-- 棋盤格 版本 B：有英文小標（每列加一行橘色英文小標）｜滿版·width:100vw 設定不要動 -->
<div style="padding:clamp(16px,4vw,28px) 0;position:relative;width:100vw;left:50%;margin-left:-50vw">
      <!-- ↓↓ 一列（圖左文右）｜要反向就加／移除 flex-direction:row-reverse ↓↓ -->
      <div style="display:flex;flex-wrap:wrap;align-items:center;margin:0 0 clamp(0px,calc((768px - 100vw)*99),44px)">
        <div style="flex:1 1 384px;min-width:0">
          <div style="position:relative;width:100%;padding-bottom:66.67%;overflow:hidden;background:#f4f4f4">
            <img src="✏️【請貼上橫式情境圖網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          </div>
        </div>
        <div style="flex:1 1 384px;min-width:0;box-sizing:border-box;padding:clamp(28px,5vw,56px);text-align:left">
          <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 10px">✏️【英文小標，例：MagSafe】</div>
          <h3 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.3;margin:0 0 12px">✏️【標題，例：內建強效 MagSafe 磁吸圈】</h3>
          <p style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5;margin:0">✏️【說明文字】</p>
        </div>
      </div>
      <!-- ↑↑ 一列 ↑↑ -->

      <!-- ↓↓ 一列（圖右文左（加了 row-reverse））｜要反向就加／移除 flex-direction:row-reverse ↓↓ -->
      <div style="display:flex;flex-wrap:wrap;align-items:center;margin:0 0 clamp(0px,calc((768px - 100vw)*99),44px);flex-direction:row-reverse">
        <div style="flex:1 1 384px;min-width:0">
          <div style="position:relative;width:100%;padding-bottom:66.67%;overflow:hidden;background:#f4f4f4">
            <img src="✏️【請貼上橫式情境圖網址】" alt="✏️【這張圖的說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          </div>
        </div>
        <div style="flex:1 1 384px;min-width:0;box-sizing:border-box;padding:clamp(28px,5vw,56px);text-align:left">
          <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 10px">✏️【英文小標，例：Drop Protection】</div>
          <h3 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.3;margin:0 0 12px">✏️【標題，例：四角氣墊 × 鏡頭墊高防摔】</h3>
          <p style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5;margin:0">✏️【說明文字】</p>
        </div>
      </div>
      <!-- ↑↑ 一列 ↑↑ -->
</div>
```

## 07 多圖橫移（方形滑塊） — 版本 A：有標題

```html
<!-- ✏️ 多圖橫移（版本 A：有標題）：每張圖換 src、填說明；增減圖就複製／刪整張 <div>。長長的 style="…" 不要動。 -->
<!-- 多圖橫移（版本 A：有標題）｜滿版·width:100vw 設定不要動 -->
<div style="position:relative;width:100vw;left:50%;margin-left:-50vw;overflow-x:clip">
  <div style="padding:clamp(16px,4vw,28px) 0">
    <!-- 標題（不需要就把這段整個刪掉）-->
    <div style="max-width:1080px;margin:0 auto;padding:0 24px 4px">
      <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 8px">✏️【英文小標，例：Gallery】</div>
      <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.2;margin:0">✏️【標題，例：多角度實拍，細節看得更清楚】</h2>
      <p style="font-size:clamp(16px,2vw,18px);color:#6E6E73;line-height:1.5;margin:8px 0 0">左右滑看更多 →</p>
    </div>
    <!-- 橫滑列：每張正方形圖＝一個 <div>（想增減就複製／刪一整張）-->
    <div style="display:flex;flex-wrap:nowrap;overflow-x:auto;padding:18px 24px 14px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch">

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

    </div>
  </div>
</div>
```

## 07 多圖橫移（方形滑塊） — 版本 A-2：有標題＋可連結圖（整張圖可點，連到商品／系列頁）

```html
<!-- ✏️ 多圖橫移（版本 A-2：有標題＋可連結圖）：每張圖換 src、填說明、填 <a href> 的連結網址；增減圖就複製／刪整張 <a>。長長的 style="…" 不要動。 -->
<!-- 多圖橫移（版本 A-2：有標題＋可連結圖·整張圖可點）｜滿版·width:100vw 設定不要動 -->
<div style="position:relative;width:100vw;left:50%;margin-left:-50vw;overflow-x:clip">
  <div style="padding:clamp(16px,4vw,28px) 0">
    <!-- 標題（不需要就把這段整個刪掉）-->
    <div style="max-width:1080px;margin:0 auto;padding:0 24px 4px">
      <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 8px">✏️【英文小標，例：Gallery】</div>
      <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.2;margin:0">✏️【標題，例：多角度實拍，細節看得更清楚】</h2>
      <p style="font-size:clamp(16px,2vw,18px);color:#6E6E73;line-height:1.5;margin:8px 0 0">左右滑看更多 →</p>
    </div>
    <!-- 橫滑列：每張圖都是連結（整張可點）；某張不想連，把它的 <a …>…</a> 換回 <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">…</div> 即可 -->
    <div style="display:flex;flex-wrap:nowrap;overflow-x:auto;padding:18px 24px 14px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch">

      <a href="✏️【要連到的完整網址，例：https://www.londonimg.tw/products/xxx】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px;text-decoration:none;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </a>

      <a href="✏️【要連到的完整網址，例：https://www.londonimg.tw/products/xxx】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px;text-decoration:none;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </a>

      <a href="✏️【要連到的完整網址，例：https://www.londonimg.tw/products/xxx】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px;text-decoration:none;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </a>

      <a href="✏️【要連到的完整網址，例：https://www.londonimg.tw/products/xxx】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px;text-decoration:none;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </a>

      <a href="✏️【要連到的完整網址，例：https://www.londonimg.tw/products/xxx】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px;text-decoration:none;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </a>

      <a href="✏️【要連到的完整網址，例：https://www.londonimg.tw/products/xxx】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px;text-decoration:none;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </a>

    </div>
  </div>
</div>
```

## 07 多圖橫移（方形滑塊） — 版本 B：只有照片（無標題、無備注、無連結）

```html
<!-- ✏️ 多圖橫移（版本 B：只有照片）：每張圖換 src、填說明；增減圖就複製／刪整張 <div>。長長的 style="…" 不要動。 -->
<!-- 多圖橫移（版本 B：只有照片·無標題無備注）｜滿版·width:100vw 設定不要動 -->
<div style="position:relative;width:100vw;left:50%;margin-left:-50vw;overflow-x:clip">
  <div style="padding:clamp(16px,4vw,28px) 0">
    <!-- 橫滑列：每張正方形圖＝一個 <div>（想增減就複製／刪一整張）-->
    <div style="display:flex;flex-wrap:nowrap;overflow-x:auto;padding:4px 24px 14px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch">

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

      <div style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:14px">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f4f4f4">
          <img src="✏️【請貼上正方形圖片網址】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
        </div>
      </div>

    </div>
  </div>
</div>
```

## 08 版本比較 — ① 對比合成圖（把差異畫進圖裡）

```html
<!-- ✏️ 版本比較 ① 對比合成圖：把差異畫進這張圖·不用 HTML 表格。長長的 style="…" 不要動。 -->
<!-- 版本比較 ① 對比合成圖｜置中·max-width 1080 -->
<div style="max-width:1080px;margin:0 auto;padding:clamp(16px,4vw,28px) 20px">
  <div style="position:relative;overflow:hidden">
    <img src="✏️【請貼上「對比合成圖」網址（把一般款／進化款差異畫進圖裡）】" alt="✏️【對比圖說明】" style="width:100%;display:block">
    <!-- 圖上疊字（圖裡已含標題就把這段刪掉）-->
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0) 32%);pointer-events:none"></div>
    <div style="position:absolute;top:0;left:0;right:0;padding:clamp(20px,5%,44px) clamp(16px,5%,40px) 0;text-align:center">
      <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 12px;text-shadow:0 1px 8px rgba(0,0,0,.5)">✏️【英文小標，例：Compare】</div>
      <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#fff;line-height:1.2;margin:0;text-shadow:0 1px 12px rgba(0,0,0,.55)">✏️【問句標題，例：一般款？進化 3.0？】</h2>
      <p style="font-size:clamp(16px,2vw,18px);line-height:1.5;margin:8px 0 0;color:rgba(255,255,255,.92);text-shadow:0 1px 10px rgba(0,0,0,.5)">✏️【一句，例：差別在哪呢？】</p>
    </div>
  </div>
</div>
```

## 08 版本比較 — ② 選哪款 2 卡

```html
<!-- ✏️ 版本比較 ② 選哪款 2 卡：換圖填字；超過 2 版本複製一整個 <figure>。長長的 style="…" 不要動。 -->
<!-- 版本比較 ② 選哪款 2 卡｜置中·max-width 1080 -->
<div style="max-width:1080px;margin:0 auto;padding:clamp(16px,4vw,28px) 20px;text-align:center">
  <div style="font-size:clamp(11px,1.4vw,15px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 14px">✏️【英文小標，例：Two Versions】</div>
  <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;line-height:1.2;margin:0 0 24px">✏️【標題，例：一般款 vs 3.0 超進化】</h2>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;text-align:left">

    <!-- 版本卡 1 -->
    <figure style="flex:1 1 300px;min-width:0;margin:0 8px 16px;border:1px solid #ededed;overflow:hidden;position:relative;background:#fff">
      <div style="position:relative;width:100%;padding-bottom:75%;overflow:hidden">
        <img src="✏️【版本 1 圖片網址】" alt="✏️【版本 1 圖片說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
      </div>
      <span style="position:absolute;top:12px;left:12px;font-size:15px;font-weight:600;padding:5px 12px;border-radius:8px;background:#efece6;color:#7a7367">✏️【版本 1 標籤，例：一般款】</span>
      <figcaption style="padding:15px 16px">
        <b style="display:block;font-size:clamp(16px,2.1vw,20px);font-weight:600;margin-bottom:6px">✏️【適合誰 → 選這款，例：要追劇、視訊免手扶 → 選支架款】</b>
        <span style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5">✏️【這個版本的說明】</span>
      </figcaption>
    </figure>

    <!-- 版本卡 2 -->
    <figure style="flex:1 1 300px;min-width:0;margin:0 8px 16px;border:1px solid #ededed;overflow:hidden;position:relative;background:#fff">
      <div style="position:relative;width:100%;padding-bottom:75%;overflow:hidden">
        <img src="✏️【版本 2 圖片網址】" alt="✏️【版本 2 圖片說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
      </div>
      <span style="position:absolute;top:12px;left:12px;font-size:15px;font-weight:600;padding:5px 12px;border-radius:8px;background:#e6f3ec;color:#2e7d52">✏️【版本 2 標籤，例：3.0 超進化】</span>
      <figcaption style="padding:15px 16px">
        <b style="display:block;font-size:clamp(16px,2.1vw,20px);font-weight:600;margin-bottom:6px">✏️【適合誰 → 選這款，例：要極致輕薄、雙向都能吸 → 選雙向吸款】</b>
        <span style="color:#6E6E73;font-size:clamp(16px,2vw,18px);line-height:1.5">✏️【這個版本的說明】</span>
      </figcaption>
    </figure>

  </div>
</div>
```

## 09 加價購

> **不輸出 HTML**。此塊全店共用（固定 15 項加購商品、所有商品頁同一組），HTML 很長且會統一更新——請同事**直接到教學頁「加價購」積木一鍵複製**貼上即可，skill 不要自己產。

## 10 收尾 CTA（文字為給 Google 的內容）

```html
<!-- ✏️ 改這裡：背景圖換 src、文字填【】、兩個按鈕網址填一樣。長長的 style="…" 不要動。 -->
<!-- 收尾 CTA（情境背景圖＋總結＋回購買區按鈕）-->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="position:relative;overflow:hidden;color:#fff;height:clamp(500px,103vw,1071px)">
    <img src="✏️【請貼上情境大圖網址（見「圖片取得方式」分頁）】" alt="✏️【這張圖的內容說明】" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.5) 200px,rgba(0,0,0,0) 360px);pointer-events:none"></div>
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;padding:clamp(28px,5vw,56px) 24px">
      <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:700;letter-spacing:.5px;line-height:1.5;margin:0;color:#fff;text-shadow:0 1px 14px rgba(0,0,0,.6)">✏️【總結大標，例：一個殼搞定】<br>✏️【副標，例：追劇・視訊・防摔・磁吸】</h2>
      <p style="font-size:clamp(16px,2vw,19px);line-height:1.5;margin:0 auto 26px;color:rgba(255,255,255,.94);text-shadow:0 1px 12px rgba(0,0,0,.6)">✏️【一句描述：品牌＋核心賣點＋適用機型】</p>
      <!-- 桌機版按鈕（疊在圖上·窄螢幕自動收合）-->
      <div style="overflow:hidden;max-height:clamp(0px,calc((100vw - 1023px)*99),140px)">
        <a href="✏️【你商品的完整網址＋#sl-product-image，例：https://www.londonimg.tw/products/xxx#sl-product-image】" style="display:inline-block;background:linear-gradient(135deg,#ff8a3d,#fe5226 55%,#f5391a);color:#fff;font-weight:800;font-size:clamp(16px,2vw,20px);letter-spacing:1px;padding:15px 40px;border-radius:999px;text-decoration:none;box-shadow:0 8px 22px rgba(254,82,38,.5)">回上方選你的機型・立即加入購物車</a>
      </div>
    </div>
  </div>
  <!-- 手機版按鈕（圖外下方·寬螢幕自動收合）·網址填跟上面一樣 -->
  <div style="overflow:hidden;text-align:center;max-height:clamp(0px,calc((1025px - 100vw)*99),140px);padding:clamp(0px,calc((1025px - 100vw)*99),24px) 0 clamp(0px,calc((1025px - 100vw)*99),10px)">
    <a href="✏️【同上：你商品的完整網址＋#sl-product-image】" style="display:inline-block;background:linear-gradient(135deg,#ff8a3d,#fe5226 55%,#f5391a);color:#fff;font-weight:800;font-size:clamp(16px,2vw,20px);letter-spacing:1px;padding:15px 40px;border-radius:999px;text-decoration:none;box-shadow:0 8px 22px rgba(254,82,38,.45)">回上方選你的機型・立即加入購物車</a>
  </div>
</div>
```

## 11 規格

```html
<!-- ✏️ 改這裡：文字填【】。長長的 style="…" 不要動。 -->
<!-- 規格（左標右表）-->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:clamp(20px,4vw,32px) 0 clamp(12px,3vw,20px);border-top:1px solid #ededed">
    <div style="display:flex;flex-wrap:wrap;align-items:flex-start">
      <div style="flex:1 1 200px;min-width:0;margin:0 clamp(0px,4vw,40px) 14px 0">
        <div style="font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 8px">Specs</div>
        <h2 style="font-size:clamp(22px,3.4vw,32px);font-weight:600;letter-spacing:.5px;margin:0;color:#1a1a1a">規格</h2>
      </div>
      <div style="flex:2 1 360px;min-width:0">

        <!-- ↓↓ 一列規格（要多一列：整段 div 複製貼在後面）↓↓ -->
        <div style="display:flex;padding:15px 2px;border-top:1px solid #ededed;font-size:clamp(16px,2.1vw,19px);line-height:1.5">
          <span style="flex:0 0 92px;font-weight:600;margin-right:20px">✏️【項目，例：材質】</span>
          <span style="color:#6E6E73">✏️【內容，例：TPU＋PC 複合】</span>
        </div>
        <!-- ↑↑ 一列規格 ↑↑ -->

        <div style="display:flex;padding:15px 2px;border-top:1px solid #ededed;font-size:clamp(16px,2.1vw,19px);line-height:1.5">
          <span style="flex:0 0 92px;font-weight:600;margin-right:20px">✏️【項目】</span>
          <span style="color:#6E6E73">✏️【內容】</span>
        </div>

        <div style="display:flex;padding:15px 2px;border-top:1px solid #ededed;font-size:clamp(16px,2.1vw,19px);line-height:1.5">
          <span style="flex:0 0 92px;font-weight:600;margin-right:20px">✏️【項目】</span>
          <span style="color:#6E6E73">✏️【內容】</span>
        </div>

        <div style="border-top:1px solid #ededed"></div>
      </div>
    </div>
  </div>
</div>
```

## 12 QA

```html
<!-- ✏️ 改這裡：文字填【】。長長的 style="…" 不要動。 -->
<!-- 常見 QA（卡片式平鋪 FAQ）-->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:clamp(12px,3vw,20px) 0 clamp(20px,5vw,40px)">
    <div style="text-align:center;margin:0 0 22px">
      <div style="font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 12px">FAQ</div>
      <h2 style="font-size:clamp(22px,3.4vw,32px);font-weight:600;letter-spacing:.5px;color:#1a1a1a;margin:0">常見問題</h2>
    </div>
    <div style="margin:0 auto">

      <!-- ↓↓ 一則問答（要多一則：整段 div 複製貼在後面，建議 4～6 則）↓↓ -->
      <div style="background:#f7f6f4;border-radius:10px;padding:14px 16px;margin:0 0 9px">
        <p style="font-size:clamp(16px,2.1vw,18px);font-weight:600;line-height:1.45;margin:0 0 5px;color:#1a1a1a"><span style="display:inline-block;background:#fe5226;color:#fff;font-size:12px;font-weight:700;border-radius:5px;padding:1px 7px;margin-right:7px;vertical-align:1px">Q</span>✏️【問題】</p>
        <p style="font-size:16px;color:#6E6E73;line-height:1.5;margin:0">✏️【答案】</p>
      </div>
      <!-- ↑↑ 一則問答 ↑↑ -->

      <!-- ↓↓ 一則問答（要多一則：整段 div 複製貼在後面，建議 4～6 則）↓↓ -->
      <div style="background:#f7f6f4;border-radius:10px;padding:14px 16px;margin:0 0 9px">
        <p style="font-size:clamp(16px,2.1vw,18px);font-weight:600;line-height:1.45;margin:0 0 5px;color:#1a1a1a"><span style="display:inline-block;background:#fe5226;color:#fff;font-size:12px;font-weight:700;border-radius:5px;padding:1px 7px;margin-right:7px;vertical-align:1px">Q</span>✏️【問題】</p>
        <p style="font-size:16px;color:#6E6E73;line-height:1.5;margin:0">✏️【答案】</p>
      </div>
      <!-- ↑↑ 一則問答 ↑↑ -->

      <!-- ↓↓ 一則問答（要多一則：整段 div 複製貼在後面，建議 4～6 則）↓↓ -->
      <div style="background:#f7f6f4;border-radius:10px;padding:14px 16px;margin:0">
        <p style="font-size:clamp(16px,2.1vw,18px);font-weight:600;line-height:1.45;margin:0 0 5px;color:#1a1a1a"><span style="display:inline-block;background:#fe5226;color:#fff;font-size:12px;font-weight:700;border-radius:5px;padding:1px 7px;margin-right:7px;vertical-align:1px">Q</span>✏️【問題】</p>
        <p style="font-size:16px;color:#6E6E73;line-height:1.5;margin:0">✏️【答案】</p>
      </div>
      <!-- ↑↑ 一則問答 ↑↑ -->

    </div>
  </div>
</div>
```

## 13 SNS 社群圖牆

> 教學頁此塊標「施工中」，但語法可用。IG 帳號固定 `@london_apple`；只放真實照片。


```html
<!-- ✏️ 改這裡：每張卡片換圖片 src（建議 300×300 正方圖）、貼文網址、@帳號。長長的 style="…" 不要動。 -->
<!-- SNS 社群圖牆（IG 風格·一排左右滑·方形照片 300×300·圖＋@帳號·右上角 IG 小圖示·點圖連到貼文）-->
<div style="max-width:1080px;margin:0 auto;padding:0 20px">
  <div style="padding:clamp(16px,4vw,28px) 0">
    <div style="text-align:center;margin:0 0 14px">
      <div style="font-size:clamp(11px,1.4vw,13px);font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#fe5226;margin:0 0 10px">✏️【英文小標，例：As Seen On IG】</div>
      <h2 style="font-size:clamp(21px,3.4vw,35px);font-weight:700;letter-spacing:.5px;color:#1a1a1a;margin:0">✏️【區塊標題，例：大家都這樣用】</h2>
      <a href="✏️【你的 IG 網址】" target="_blank" rel="noopener" style="font-size:16px;color:#fe5226;text-decoration:none;font-weight:600;display:inline-block;margin:10px 0 0">追蹤 ✏️【@你的IG帳號】 看更多 →</a>
    </div>
    <div style="display:flex;flex-wrap:nowrap;overflow-x:auto;margin:0 -20px;padding:4px 20px 12px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch">

      <!-- ↓↓ 一張圖卡（要多一張：整段 a 複製貼在後面·想放幾張都行、多的就左右滑）↓↓ -->
      <a href="✏️【貼文網址；不需要連結：把 href=".." 刪掉、開頭 a 改成 div、結尾 /a 改成 /div】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:12px;text-decoration:none;color:inherit;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f7f7f7;border-radius:8px">
          <img src="✏️【請貼上方形圖片網址·建議 300×300】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border:2px solid #fff;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.45);z-index:2;pointer-events:none"><div style="position:absolute;top:3px;left:3px;width:8px;height:8px;border:2px solid #fff;border-radius:50%"></div><div style="position:absolute;top:2px;right:2px;width:3px;height:3px;background:#fff;border-radius:50%"></div></div>
        </div>
        <div style="font-size:13px;color:#6E6E73;margin:6px 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">✏️【@你的IG帳號】</div>
      </a>
      <!-- ↑↑ 一張圖卡 ↑↑ -->

      <a href="✏️【貼文網址；不連結就改成 div】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:12px;text-decoration:none;color:inherit;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f7f7f7;border-radius:8px">
          <img src="✏️【請貼上方形圖片網址·建議 300×300】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border:2px solid #fff;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.45);z-index:2;pointer-events:none"><div style="position:absolute;top:3px;left:3px;width:8px;height:8px;border:2px solid #fff;border-radius:50%"></div><div style="position:absolute;top:2px;right:2px;width:3px;height:3px;background:#fff;border-radius:50%"></div></div>
        </div>
        <div style="font-size:13px;color:#6E6E73;margin:6px 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">✏️【@你的IG帳號】</div>
      </a>

      <a href="✏️【貼文網址；不連結就改成 div】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:12px;text-decoration:none;color:inherit;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f7f7f7;border-radius:8px">
          <img src="✏️【請貼上方形圖片網址·建議 300×300】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border:2px solid #fff;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.45);z-index:2;pointer-events:none"><div style="position:absolute;top:3px;left:3px;width:8px;height:8px;border:2px solid #fff;border-radius:50%"></div><div style="position:absolute;top:2px;right:2px;width:3px;height:3px;background:#fff;border-radius:50%"></div></div>
        </div>
        <div style="font-size:13px;color:#6E6E73;margin:6px 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">✏️【@你的IG帳號】</div>
      </a>

      <a href="✏️【貼文網址；不連結就改成 div】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:12px;text-decoration:none;color:inherit;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f7f7f7;border-radius:8px">
          <img src="✏️【請貼上方形圖片網址·建議 300×300】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border:2px solid #fff;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.45);z-index:2;pointer-events:none"><div style="position:absolute;top:3px;left:3px;width:8px;height:8px;border:2px solid #fff;border-radius:50%"></div><div style="position:absolute;top:2px;right:2px;width:3px;height:3px;background:#fff;border-radius:50%"></div></div>
        </div>
        <div style="font-size:13px;color:#6E6E73;margin:6px 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">✏️【@你的IG帳號】</div>
      </a>

      <a href="✏️【貼文網址；不連結就改成 div】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:12px;text-decoration:none;color:inherit;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f7f7f7;border-radius:8px">
          <img src="✏️【請貼上方形圖片網址·建議 300×300】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border:2px solid #fff;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.45);z-index:2;pointer-events:none"><div style="position:absolute;top:3px;left:3px;width:8px;height:8px;border:2px solid #fff;border-radius:50%"></div><div style="position:absolute;top:2px;right:2px;width:3px;height:3px;background:#fff;border-radius:50%"></div></div>
        </div>
        <div style="font-size:13px;color:#6E6E73;margin:6px 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">✏️【@你的IG帳號】</div>
      </a>

      <a href="✏️【貼文網址；不連結就改成 div】" target="_blank" rel="noopener" style="flex:0 0 auto;width:300px;scroll-snap-align:start;margin-right:12px;text-decoration:none;color:inherit;display:block">
        <div style="position:relative;width:100%;padding-bottom:100%;overflow:hidden;background:#f7f7f7;border-radius:8px">
          <img src="✏️【請貼上方形圖片網址·建議 300×300】" alt="✏️【這張圖的說明】" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border:2px solid #fff;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.45);z-index:2;pointer-events:none"><div style="position:absolute;top:3px;left:3px;width:8px;height:8px;border:2px solid #fff;border-radius:50%"></div><div style="position:absolute;top:2px;right:2px;width:3px;height:3px;background:#fff;border-radius:50%"></div></div>
        </div>
        <div style="font-size:13px;color:#6E6E73;margin:6px 2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">✏️【@你的IG帳號】</div>
      </a>

    </div>
  </div>
</div>
```
