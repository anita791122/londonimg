# -*- coding: utf-8 -*-
import re, html, os

# 可攜路徑：以本腳本所在的 _tools 為基準，往上一層即「交付物」資料夾
_DELIV = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(_DELIV, "b67-description-inline.html")  # 來源：inline 響應式版（單一真實來源）
OUT = os.path.join(_DELIV, "b67-product-page-guide.html")  # 產出：給同事的教學頁

with open(SRC, encoding="utf-8") as f:
    raw = f.read()

open_tag = re.search(r'<div class="yu-pdp"[^>]*>', raw)
start = open_tag.end()
end = raw.index('\n</div>\n<!-- ↑↑↑', start)
inner = raw[start:end]
base_style = re.search(r'<div class="yu-pdp" style="([^"]*)"', raw).group(1)

parts = re.split(r'(?=\n  <!--)', inner)
sections = [p.strip("\n") for p in parts if p.strip()]

# ---------- SVG 圖示（Lucide 線性，stroke=currentColor） ----------
def svg(p, w=18):
    return (f'<svg class="ic" width="{w}" height="{w}" viewBox="0 0 24 24" fill="none" '
            f'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{p}</svg>')
IC = {
  "settings": svg('<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>'),
  "code": svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
  "image": svg('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'),
  "copy": svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
  "info": svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'),
  "alert": svg('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
  "check": svg('<polyline points="20 6 9 17 4 12"/>'),
  "eye": svg('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
  "bulb": svg('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>'),
  "skill": svg('<path d="M12 3l1.6 4.9a2 2 0 0 0 1.3 1.3L19.8 11l-4.9 1.6a2 2 0 0 0-1.3 1.3L12 19.8l-1.6-4.9a2 2 0 0 0-1.3-1.3L4.2 12l4.9-1.6a2 2 0 0 0 1.3-1.3L12 3z"/>'),
  "download": svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
}

meta = [
    ("影音實測", "兩支 YouTube 直式影片並排。<b>換影片</b>：改 <code>src</code> 裡 <code>embed/</code> 後面的影片代碼；<b>換文字</b>：填上影片標題與說明。"),
    ("首屏 Hero 大圖", "最上方的大圖＋疊在圖上的標題。換圖改 <code>&lt;img&gt;</code> 的 <code>src</code>；換字填主標、副標。"),
    ("定義句（給 Google／AI 讀）", "用一句話講清楚「這是什麼商品」。把每個【】填成你的商品資訊即可，被 <code>&lt;strong&gt;</code> 包住的會變粗黑（強調關鍵字）。"),
    ("360° 環繞支架（標題＋三張方圖）", "標題＋一句說明＋三張正方圖。換圖改三個 <code>&lt;img&gt;</code>、換字填標題與說明。"),
    ("背板平整（標題＋兩張圖）", "標題＋說明＋兩張圖。換圖換字方式同上。"),
    ("MagSafe（標題＋兩張圖）", "標題＋說明＋兩張圖。換圖換字方式同上。"),
    ("一般款 vs 雙向吸 對照表", "背景圖上疊一個比較表格。換背景圖改最外層 <code>&lt;img&gt;</code>；改表格填欄位標題、比較項目與每格結果。"),
    ("一般款 vs 3.0 超進化（兩張卡片）", "兩張帶標籤的卡片。換圖改 <code>&lt;img&gt;</code>；填標籤、卡片標題與說明。"),
    ("3.0 超進化雙向吸（兩張含說明圖）", "標題＋說明＋兩張各帶圖說的圖。換圖改 <code>&lt;img&gt;</code>、圖說填 <code>&lt;figcaption&gt;</code>。"),
    ("一個支架，多種玩法（四個情境）", "四個使用情境，桌機左右交錯、手機自動變上下。每段填情境標題與說明、換圖。要加情境就複製其中一段再改。"),
    ("功能特色（背景圖疊三行字）", "背景圖疊三行特色文字。換背景圖改 <code>&lt;img&gt;</code>，填小標、大標與三行特色。"),
    ("常見 QA（五則問答）", "五則問答卡片。填問題與答案；<b>要新增一題</b>：複製任一個 <code>&lt;div&gt;…&lt;/div&gt;</code> 卡片整段貼後面再改。"),
]

edits = [
    [("MagSafe 磁吸實測","【請填入影片1標題】"),
     ("任何有磁力的金屬面都能馬上吸住，吸力一次看懂，不用看規格表也明白。","【請填入影片1說明文字】"),
     ("360° 隱藏支架","【請填入影片2標題】"),
     ("背板隱藏式金屬支架，不用時完全平整不卡手，要用時一翻即立。","【請填入影片2說明文字】")],
    [("360° 支架手機殼","【請填入主標題】"),
     ("一個殼，解決所有痛點！","【請填入副標題（一句賣點）】")],
    [("YU 360°無段支架手機殼","【請填入：品牌＋商品全名】"),
     ("金屬指環支架","【特色1】"),
     ("MagSafe 磁吸","【特色2】"),
     ("iPhone 12–16 系列","【適用機型】"),
     ("防摔手機殼","【商品品類】"),
     ("，可任意角度直立／橫放，一殼搞定追劇、視訊與防摔。","，【請填入一句話賣點】。")],
    [("360° 環繞支架 ‧ 持久耐用","【請填入區塊標題】"),
     ("Stable Stand","【英文小標】"),
     ("直立追劇、橫放滑 IG 都隨心所欲；金屬轉軸承始終穩定，長期使用不鬆軟，手機立得穩、看得久。","【請填入說明文字】")],
    [("背板平整優化","【請填入區塊標題】"),
     ("Flat Back","【英文小標】"),
     ("手機平放穩固，邊框與鏡頭框墊高有效保護鏡頭，從而提供全面的安全保障。","【請填入說明文字】")],
    [("MagSafe 功能進化","【請填入區塊標題】"),
     ("支援 MagSafe 無線充電，隨時隨地為手機補足電量。","【請填入說明文字】"),
     (">MagSafe</div>",">【英文小標】</div>")],
    [("一般款？雙向吸","【請填入對照大標，例：一般款？升級款】"),
     ("(進化3.0)","【副標，例：(升級版)】"),
     ("差別在哪呢？","【請填入第二行大標】"),
     (">一般款</th>",">【欄1標題】</th>"),
     (">雙向吸</th>",">【欄2標題】</th>"),
     ("直立／橫放支撐","【比較項目1】"),
     ("無段式角度調整","【比較項目2】"),
     (">雙向吸附</td>",">【比較項目3】</td>"),
     ("● 可雙向吸附金屬","● 【填結果】"),
     ("● 支援","● 【填結果】"),
     ("● 無","● 【填結果】")],
    [(">一般款</span>",">【標籤1】</span>"),
     (">3.0 超進化</span>",">【標籤2】</span>"),
     (">360° 環繞支架</b>",">【卡片1標題】</b>"),
     (">雙向吸支架</b>",">【卡片2標題】</b>"),
     ("基礎直立／橫放支撐","【卡片1說明】"),
     ("360° 環繞支架 ＋ 升級金屬磁吸，固定於任何磁性平面","【卡片2說明】")],
    [("3.0 超進化雙向吸","【請填入區塊標題】"),
     ("Dual-Grip 3.0","【英文小標】"),
     ("支架內嵌高強度吸附金屬，提供超強抓握力，吸附在垂直的金屬表面也能長時間保持穩固不滑落。","【請填入說明文字】"),
     ("將手機吸附在冰箱門或金屬廚櫃上，邊看影片邊下廚，不佔用檯面空間。","【請填入圖1圖說】"),
     ("固定在健身房重訓器材上錄影確認姿勢，進化 3.0 都給你絕對的信心！","【請填入圖2圖說】")],
    [("一個支架，多種玩法","【請填入區塊標題】"),
     ("Use Cases","【英文小標】"),
     ("隨身自拍神器","【情境1標題】"),
     ("輕鬆升級為隨身自拍神器，野餐、聚會、戶外旅行，完美角度輕鬆 Get！","【情境1說明】"),
     ("變身增高支架","【情境2標題】"),
     ("可巧妙卡入寶特瓶、飲料瓶，讓螢幕與視線齊平；長時間使用手機也能保持最舒適的姿勢。","【情境2說明】"),
     ("行李箱卡位","【情境3標題】"),
     ("可穩固卡在行李箱拉桿上，旅行時拍 Vlog、團體自拍不再求人。","【情境3說明】"),
     ("無桌板追劇神器","【情境4標題】"),
     ("利用支架的夾持特性，卡住垂直或橫向的縫隙，把手機架高、改善低頭角度，長時間觀影更舒適。","【情境4說明】")],
    [("360° 輕鬆追劇","【請填入小標】"),
     (">支架手機殼<",">【請填入大標】<"),
     ("360° 旋轉支架，無論直拍橫看，追劇、視訊都能隨心調整角度","【特色1】"),
     ("邊框精準墊高，鏡頭全面防護不怕磨","【特色2】"),
     ("PU 觸感表面防汙抗指紋，乾淨俐落更耐看","【特色3】")],
    [("什麼是雙向吸？","【請填入問題1】"),
     ("雙向吸的部分在磁吸指環上採用雙向吸附設計，在傳統磁吸指環的基礎上額外增加了一塊圓環。雖然這塊圓環本身不具磁性，但能讓磁力分布更均勻，進一步提升吸附的穩定性；同時讓手機背殼本身可吸附在其他磁性表面（例如冰箱或鐵製物品），實用性更高。","【請填入答案1】"),
     ("支援哪些 iPhone 機型？","【請填入問題2】"),
     ("適用 iPhone 12～16 全系列，含 Pro／Pro Max／Plus；各系列 mini 不適用。","【請填入答案2】"),
     ("支架用久了會鬆掉站不住嗎？","【請填入問題3】"),
     ("我們採用強化的高品質轉軸，經過多次開合與旋轉測試，支撐力穩定持久，請安心使用。","【請填入答案3】"),
     ("裝了這款殼還可以貼鏡頭貼嗎？","【請填入問題4】"),
     ("可以的！鏡頭孔位處有預留空間，只要不是過於厚重的特殊款式，基本上都能完美相容。","【請填入答案4】"),
     ("第一代和第二代（雙向吸）差在哪？","【請填入問題5】"),
     ("第一代磁吸支架手機殼內建基本磁吸功能，可搭配 MagSafe 配件使用，滿足日常需求。","【請填入答案5-第1段】"),
     ("第二代「雙向吸」則在此基礎上升級為雙向吸設計，不僅支援磁吸配件，還能吸附在鐵製表面（例如冰箱），讓你邊看手機邊做菜更方便，功能更全面！","【請填入答案5-第2段】")],
]

ANNO = "<!-- ✏️ 改這裡：所有標 ✏️【…】 的地方都要改，把整個 ✏️【…】（含鉛筆符號）換成你的內容。圖片改 src 網址、影片改影片代碼。長長的 style=\"…\" 不用看、不要動到。 -->\n"

block_html = []
for i, sec in enumerate(sections):
    title, note = meta[i]
    num = "%02d" % (i + 1)
    tpl = sec
    for old, new in sorted(edits[i], key=lambda t: -len(t[0])):
        tpl = tpl.replace(old, new)
    tpl = re.sub(r'src="https://img\.shoplineapp\.com/[^"]*"', 'src="【請貼上圖片網址（見「圖片取得方式」分頁）】"', tpl)
    tpl = re.sub(r'alt="[^"]*"', 'alt="【請填入這張圖的內容說明】"', tpl)
    tpl = re.sub(r'(youtube\.com/embed/)[A-Za-z0-9_\-]+', r'\1【請填入YouTube影片代碼】', tpl)
    tpl = re.sub(r'title="[^"]*"', 'title="【請填入影片標題】"', tpl)
    tpl = tpl.replace("【", "✏️【")  # 每個填空點前加鉛筆 emoji，讓同事一眼看到要改的地方
    code_escaped = (ANNO + tpl).replace("&", "&amp;")
    block_html.append(f'''
      <article class="block">
        <div class="block-head"><span class="num">{num}</span><h3>{html.escape(title)}</h3></div>
        <p class="note">{IC["info"]}<span>{note}</span></p>
        <div class="seg-label">{IC["eye"]}完成後長這樣（範例預覽）</div>
        <div class="preview"><div class="yu-pdp" style="{base_style}">{sec}</div></div>
        <div class="seg-label code-seg">{IC["code"]}複製填空語法 → 把 ✏️【…】 換成你的內容 → 貼進 SHOPLINE「商品描述 → HTML 原始碼」</div>
        <div class="code">
          <div class="code-bar"><span class="dots"><i></i><i></i><i></i></span><span class="fname">HTML</span><button class="copy-btn" onclick="copyCode(this)">{IC["copy"]}<span class="lbl">複製語法</span></button></div>
          <textarea readonly spellcheck="false">{code_escaped}</textarea>
        </div>
      </article>''')

blocks_joined = "\n".join(block_html)

def field(label, value, hint=""):
    v = html.escape(value).replace("&", "&amp;")
    h = f'<small class="fhint">{hint}</small>' if hint else ""
    return f'''<div class="field">
      <div class="field-top"><label>{html.escape(label)}</label><button class="copy-btn sm" onclick="copyCode(this)">{IC["copy"]}<span class="lbl">複製</span></button></div>
      <textarea class="fval" readonly spellcheck="false">{v}</textarea>{h}</div>'''

meta_desc = "YU 360°無段支架 iPhone 手機殼，內建金屬指環支架可任意角度追劇、視訊免手扶；支援 MagSafe 磁吸，四邊與鏡頭框墊高防摔。適用 iPhone 12～16 全系列（mini 除外）。TPU+PC 複合材質、PU 觸感防汙好握。指定款任選兩件 88 折，滿 $599 超取免運。"
keywords = "iPhone手機殼,360支架手機殼,MagSafe手機殼,指環支架手機殼,防摔殼,iPhone16手機殼,iPhone15手機殼,iPhone14手機殼,YU手機殼,追劇支架殼,B67"

settings_page = f'''
  <div class="hero">
    <span class="hero-eyebrow">STEP 1</span>
    <h1 class="hero-title">商品頁設定</h1>
    <p class="hero-sub">後台位置：<b>商品 → 編輯該商品 → 網路搜尋最佳化（SEO）</b>。把下面四欄分別複製貼上即可。</p>
  </div>
  <div class="card">
    <h3 class="card-h">{IC["settings"]}網路搜尋最佳化（繁體中文分頁）</h3>
    {field("標題", "YU iPhone 360°無段支架手機殼｜MagSafe 防摔殼 12-16 系列【B67】", "Google 搜尋結果的藍色大標。促銷字（任選兩件88折）不要寫進標題。")}
    {field("簡介", meta_desc, "搜尋結果標題下方的灰色說明文字，約 150 字。")}
    {field("關鍵字", keywords, "以半形逗號分隔。")}
    {field("描述性URL", "yu-iphone-360-ring-stand-case", "只能用英文與數字，不能有空格、中文、° 符號。")}
  </div>
  <div class="card warn">
    <h3 class="card-h">{IC["alert"]}改網址後一定要做的事</h3>
    <p>改「描述性URL」會讓商品網址改變，舊網址 <code>b67-surprise</code> 會失效。請到後台設定 <b>301 轉址</b>，把舊網址導到新網址，既有連結與 Google 排名才不會斷掉。</p>
  </div>'''

images_page = f'''
  <div class="hero">
    <span class="hero-eyebrow">STEP 3</span>
    <h1 class="hero-title">圖片取得方式</h1>
    <p class="hero-sub">語法裡每張圖都是一段 <code>&lt;img src="網址"&gt;</code>。要換成自己的圖，就是把這個「網址」換掉（也就是填空語法裡的 <code>【請貼上圖片網址】</code>）。</p>
  </div>
  <div class="card">
    <h3 class="card-h">{IC["image"]}步驟：在 SHOPLINE 取得圖片網址</h3>
    <ol class="steps">
      <li>後台 → <b>商品 → 編輯該商品 → 商品描述</b>。</li>
      <li>點工具列的 <b>「插入圖片」</b>，把要用的圖上傳。</li>
      <li>上傳後，點右上角切到 <b>「HTML / 原始碼」&lt;/&gt;</b> 模式。</li>
      <li>找到剛上傳的那段 <code>&lt;img src="https://img.shoplineapp.com/……"&gt;</code>，<b>把雙引號裡的整串網址複製</b>起來。</li>
      <li>回到填空語法，把 <code>src="【請貼上圖片網址】"</code> 裡的 <code>【…】</code> 換成你複製的網址（雙引號保留）。</li>
      <li>順手把 <code>alt="【請填入這張圖的內容說明】"</code> 改成這張圖的內容描述（給 Google 看，有助 SEO）。</li>
    </ol>
    <p class="tipbox">{IC["bulb"]}<span>圖片網址長這樣：<code>https://img.shoplineapp.com/media/image_clips/<b>圖片代碼</b>/original.png?...</code>　只要換掉這一整串就好，前後的 <code>&lt;img src="</code> 和 <code>"&gt;</code> 不要動。</span></p>
  </div>
  <div class="card">
    <h3 class="card-h">{IC["image"]}各區塊建議圖片比例</h3>
    <table class="sizetab">
      <thead><tr><th>區塊</th><th>建議比例</th><th>說明</th></tr></thead>
      <tbody>
        <tr><td>影音實測</td><td>影片（9:16 直式）</td><td>用 YouTube 影片代碼，非圖片</td></tr>
        <tr><td>首屏 Hero、功能特色、對照表</td><td>直式長圖</td><td>圖上會疊白色文字，選背景單純的圖</td></tr>
        <tr><td>360°／背板／MagSafe 圖庫</td><td>1:1 正方形</td><td>系統會自動裁成正方形</td></tr>
        <tr><td>3.0 雙向吸圖說</td><td>4:3 橫式</td><td>—</td></tr>
        <tr><td>情境（多種玩法）</td><td>1:1 正方形</td><td>—</td></tr>
      </tbody>
    </table>
  </div>
  <div class="card warn">
    <h3 class="card-h">{IC["alert"]}兩個常見錯誤</h3>
    <ul class="warnlist">
      <li>只複製到一半的網址 → 圖會破圖。請從 <code>https://</code> 複製到結尾的引號前。</li>
      <li>用別的網站的圖片網址（例如 Google 圖片）→ 可能隨時失效。請一律先上傳到 SHOPLINE 再複製。</li>
    </ul>
  </div>'''

skill_page = f'''
  <div class="hero">
    <span class="hero-eyebrow">CLAUDE SKILL</span>
    <h1 class="hero-title">Claude Skill</h1>
    <p class="hero-sub">用 Claude skill 自動產生／更新商品頁內容。下載 → 安裝 → 使用三步驟。</p>
  </div>

  <div class="card">
    <h3 class="card-h">{IC["download"]}下載區</h3>
    <p>下載檔案：<code>【請填入 skill 檔名，例：londonimg-pdp-skill.zip】</code></p>
    <p><a class="dl-btn" href="【請填入 skill 下載連結】">{IC["download"]}<span>下載 Skill</span></a></p>
    <p class="fhint">下載後解壓縮，會得到一個 skill 資料夾（內含 <code>SKILL.md</code> 等檔案）。</p>
  </div>

  <div class="card">
    <h3 class="card-h">{IC["settings"]}安裝方式</h3>
    <ol class="steps">
      <li>把解壓縮後的 <b>skill 資料夾</b>放到 Claude 的 skills 目錄：
        <ul>
          <li>個人全域：<code>~/.claude/skills/</code></li>
          <li>或專案內：<code>專案資料夾/.claude/skills/</code></li>
        </ul>
      </li>
      <li>重新開啟（或重新載入）Claude，skill 就會出現在可用清單。</li>
      <li>確認方式：輸入 <code>/</code> 或詢問可用 skills，應能看到 <code>【請填入 skill 名稱】</code>。</li>
    </ol>
    <p class="tipbox">{IC["bulb"]}<span>實際安裝路徑／步驟依你提供的 skill 為準；若是 claude.ai 網頁版 skill，改為依該平台的「新增 skill」流程操作。此處 <code>【…】</code> 與步驟請依實際情況調整。</span></p>
  </div>

  <div class="card">
    <h3 class="card-h">{IC["skill"]}使用方式</h3>
    <ol class="steps">
      <li>在 Claude 對話輸入觸發語，例如：<code>【請填入觸發語，例：產生 B67 商品頁描述】</code>。</li>
      <li>依 skill 提示提供必要資訊（例如商品名、賣點、圖片網址、影片代碼）。</li>
      <li>Claude 會依 skill 產生商品頁 HTML／填好的語法，複製後貼進 SHOPLINE「商品描述 → HTML 原始碼」。</li>
      <li>需要調整時，把要改的地方告訴 Claude 再請它重出即可。</li>
    </ol>
    <p class="tipbox">{IC["info"]}<span>產出的語法一樣遵守本說明的規則：單位用 px、圖片用 SHOPLINE 圖床網址、描述欄位勿貼 <code>&lt;style&gt;</code>。</span></p>
  </div>'''

doc = f'''<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>B67 商品頁建置說明（給同事）</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root{{
    --accent:#6e5cb6; --accent-2:#9484d4; --accent-soft:#f1edfb;
    --ink:#1f2632; --muted:#5b6675; --faint:#8a93a1;
    --bg:#f4f6f9; --surface:#ffffff; --border:#e6eaf0; --border-2:#eef1f5;
    --code-bg:#1b2230; --ok:#1f9d6b; --warn-bg:#fff7f3; --warn-bd:#f3d3c4;
    --shadow:0 1px 2px rgba(20,30,50,.04),0 6px 20px rgba(20,30,50,.05);
    --shadow-h:0 10px 30px rgba(20,30,50,.10);
    --r:16px; --font-h:"Poppins","Noto Sans TC",sans-serif; --font-b:"Open Sans","Noto Sans TC",sans-serif;
  }}
  *{{box-sizing:border-box}}
  html{{scroll-behavior:smooth}}
  body{{margin:0;font-family:var(--font-b);color:var(--ink);background:var(--bg);line-height:1.65;-webkit-font-smoothing:antialiased}}
  .ic{{flex:none;vertical-align:middle}}
  code{{background:#eef1f6;padding:1.5px 6px;border-radius:6px;font-size:.86em;font-family:ui-monospace,Menlo,Consolas,monospace;color:#6f5cb6;word-break:break-all}}
  b{{font-weight:700}}

  .layout{{display:flex;min-height:100vh}}
  /* ---- 側邊欄 ---- */
  .sidebar{{width:264px;flex:none;background:var(--surface);border-right:1px solid var(--border);position:sticky;top:0;height:100vh;padding:22px 16px;display:flex;flex-direction:column}}
  .brand{{display:flex;align-items:center;gap:12px;padding:6px 8px 18px;margin-bottom:10px;border-bottom:1px solid var(--border-2)}}
  .brand .mark{{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-h);font-weight:700;font-size:17px;box-shadow:0 6px 16px rgba(110,92,182,.32)}}
  .brand .txt{{font-family:var(--font-h);font-weight:600;font-size:15px;line-height:1.25}}
  .brand .txt small{{display:block;font-family:var(--font-b);font-weight:400;font-size:11.5px;color:var(--faint);letter-spacing:.3px;margin-top:2px}}
  .nav{{display:flex;flex-direction:column;gap:4px;margin-top:6px}}
  .nav a{{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:11px;color:var(--muted);text-decoration:none;font-size:14.5px;font-weight:600;cursor:pointer;transition:background .2s,color .2s;border:1px solid transparent}}
  .nav a .ic{{color:var(--faint);transition:color .2s}}
  .nav a:hover{{background:var(--bg);color:var(--ink)}}
  .nav a:focus-visible{{outline:2px solid var(--accent);outline-offset:2px}}
  .nav a.active{{background:var(--accent-soft);color:var(--accent);border-color:#ddd3f1}}
  .nav a.active .ic{{color:var(--accent)}}
  .nav .step{{margin-left:auto;font-size:11px;font-weight:700;color:var(--faint)}}
  .nav a.active .step{{color:var(--accent)}}
  .side-foot{{margin-top:auto;padding:14px 10px 4px;font-size:11.5px;color:var(--faint);line-height:1.6;border-top:1px solid var(--border-2)}}

  /* ---- 內容 ---- */
  .content{{flex:1;min-width:0;padding:38px clamp(18px,4vw,56px) 90px;max-width:1000px}}
  .page{{display:none}} .page.active{{display:block;animation:fade .3s ease}}
  @keyframes fade{{from{{opacity:0;transform:translateY(8px)}}to{{opacity:1;transform:none}}}}

  .hero{{margin:0 0 26px}}
  .hero-eyebrow{{display:inline-block;font-family:var(--font-h);font-size:12px;font-weight:600;letter-spacing:2.5px;color:var(--accent);background:var(--accent-soft);padding:5px 12px;border-radius:999px;margin-bottom:14px}}
  .hero-title{{font-family:var(--font-h);font-size:clamp(26px,4.4vw,38px);font-weight:700;letter-spacing:-.5px;margin:0 0 8px;color:var(--ink)}}
  .hero-sub{{color:var(--muted);font-size:15.5px;max-width:70ch;margin:0}}

  .card{{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:24px 26px;margin:0 0 20px;box-shadow:var(--shadow)}}
  .card.warn{{background:var(--warn-bg);border-color:var(--warn-bd)}}
  .card-h{{display:flex;align-items:center;gap:9px;font-family:var(--font-h);font-size:16.5px;font-weight:600;margin:0 0 16px;color:var(--ink)}}
  .card-h .ic{{color:var(--accent)}}
  .card.warn .card-h .ic{{color:#d2541f}}

  /* 設定欄位 */
  .field{{margin:0 0 18px}} .field:last-child{{margin-bottom:0}}
  .field-top{{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px}}
  .field label{{font-weight:700;font-size:13.5px;color:var(--ink)}}
  textarea.fval{{width:100%;min-height:48px;border:1px solid var(--border);border-radius:10px;padding:11px 13px;font-size:14px;font-family:var(--font-b);background:#fbfcfe;resize:vertical;color:var(--ink);transition:border-color .2s,box-shadow .2s}}
  textarea.fval:focus{{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}}
  .fhint{{display:block;color:var(--faint);font-size:12.5px;margin-top:5px}}

  .steps{{margin:0;padding-left:22px}} .steps li{{margin:0 0 10px;font-size:14.5px;color:var(--ink)}}
  .steps li::marker{{color:var(--accent);font-weight:700}}
  .tipbox{{display:flex;gap:10px;align-items:flex-start;background:#eefaf4;border:1px solid #cfeede;border-radius:12px;padding:13px 15px;font-size:13.8px;margin:16px 0 0;color:#1d5e44;line-height:1.7}}
  .tipbox .ic{{color:var(--ok);margin-top:2px}}
  .sizetab{{width:100%;border-collapse:collapse;margin-top:2px;font-size:14px;overflow:hidden;border-radius:10px}}
  .sizetab th,.sizetab td{{border-bottom:1px solid var(--border-2);padding:11px 13px;text-align:left}}
  .sizetab thead th{{background:#f7f9fc;font-family:var(--font-h);font-weight:600;font-size:13px;color:var(--muted)}}
  .sizetab tbody tr:last-child td{{border-bottom:0}}
  .warnlist{{margin:0;padding-left:20px;font-size:14.5px}} .warnlist li{{margin:0 0 9px}} .warnlist li::marker{{color:#d2541f}}

  /* 教學提示框 */
  .howto{{background:linear-gradient(180deg,#fff,#fcfdff);border:1px solid var(--border);border-left:4px solid var(--accent);border-radius:0 var(--r) var(--r) 0;padding:20px 24px;margin:0 0 28px;font-size:14.5px;color:var(--muted);box-shadow:var(--shadow)}}
  .howto b{{color:var(--ink)}} .howto .key{{color:var(--accent);font-weight:700}}
  .howto-h{{display:flex;align-items:center;gap:9px;font-family:var(--font-h);font-weight:600;color:var(--ink);font-size:15.5px;margin-bottom:8px}}
  .howto-h .ic{{color:var(--accent)}}

  /* 區塊卡片 */
  .block{{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:22px 22px 24px;margin:0 0 22px;box-shadow:var(--shadow);transition:box-shadow .25s,transform .25s}}
  .block:hover{{box-shadow:var(--shadow-h);transform:translateY(-2px)}}
  .block-head{{display:flex;align-items:center;gap:12px;margin-bottom:13px}}
  .block-head .num{{font-family:var(--font-h);background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;font-weight:700;font-size:13px;width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(110,92,182,.28)}}
  .block-head h3{{margin:0;font-family:var(--font-h);font-size:17px;font-weight:600;color:var(--ink)}}
  .note{{display:flex;gap:9px;align-items:flex-start;background:#f7f9fc;border:1px solid var(--border-2);border-radius:12px;padding:12px 14px;font-size:13.6px;color:var(--muted);margin:0 0 16px;line-height:1.72}}
  .note .ic{{color:var(--accent);margin-top:2px}}
  .seg-label{{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:var(--faint);margin:0 0 8px;font-family:var(--font-h);letter-spacing:.2px}}
  .seg-label .ic{{width:15px;height:15px}}
  .code-seg{{margin-top:18px;color:var(--accent)}} .code-seg .ic{{color:var(--accent)}}
  .preview{{border:1px solid var(--border);border-radius:12px;padding:14px;overflow:hidden;background:#fff}}
  .preview .yu-pdp{{max-width:100%!important}}

  /* 程式碼視窗 */
  .code{{border:1px solid #2a3242;border-radius:12px;overflow:hidden;box-shadow:var(--shadow)}}
  .code-bar{{display:flex;align-items:center;gap:10px;background:#141a26;padding:9px 12px;border-bottom:1px solid #2a3242}}
  .code-bar .dots{{display:flex;gap:6px}} .code-bar .dots i{{width:11px;height:11px;border-radius:50%;background:#3a4456;display:block}}
  .code-bar .dots i:nth-child(1){{background:#ff5f56}} .code-bar .dots i:nth-child(2){{background:#ffbd2e}} .code-bar .dots i:nth-child(3){{background:#27c93f}}
  .code-bar .fname{{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;color:#8b95a7;letter-spacing:.5px}}
  .code textarea{{display:block;width:100%;min-height:340px;max-height:620px;border:0;background:var(--code-bg);color:#e6ebf3;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.7;padding:16px;resize:vertical;white-space:pre}}
  .code textarea:focus{{outline:none}}
  .copy-btn{{margin-left:auto;display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;border:0;border-radius:8px;padding:7px 13px;font-size:13px;font-weight:700;font-family:var(--font-b);cursor:pointer;transition:filter .2s,transform .1s}}
  .copy-btn .ic{{width:15px;height:15px}}
  .copy-btn:hover{{filter:brightness(1.08)}} .copy-btn:active{{transform:scale(.97)}}
  .copy-btn:focus-visible{{outline:2px solid #fff;outline-offset:2px}}
  .copy-btn.ok{{background:linear-gradient(135deg,#1f9d6b,#23b377)}}
  .copy-btn.sm{{padding:6px 11px;font-size:12.5px}}
  .dl-btn{{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;text-decoration:none;border-radius:10px;padding:11px 20px;font-family:var(--font-h);font-size:14.5px;font-weight:600;box-shadow:0 6px 16px rgba(110,92,182,.28);transition:transform .15s,filter .2s}}
  .dl-btn:hover{{filter:brightness(1.07);transform:translateY(-1px)}}
  .dl-btn:focus-visible{{outline:2px solid var(--accent);outline-offset:2px}}
  .steps ul{{margin:7px 0 0;padding-left:20px}} .steps ul li{{margin:0 0 5px;font-size:13.8px;color:var(--muted)}}

  @media(max-width:820px){{
    .layout{{flex-direction:column}}
    .sidebar{{width:100%;height:auto;position:sticky;top:0;z-index:20;flex-direction:row;align-items:center;padding:10px 14px;gap:10px;overflow-x:auto}}
    .brand{{border:0;margin:0;padding:0;flex:none}} .brand .txt{{display:none}}
    .side-foot{{display:none}}
    .nav{{flex-direction:row;margin:0;gap:6px}}
    .nav a{{padding:9px 12px;white-space:nowrap}} .nav .step{{display:none}}
    .content{{padding:26px 16px 70px}}
  }}
  @media (prefers-reduced-motion:reduce){{
    *{{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
  }}
</style>
</head>
<body>
<div class="layout">
  <aside class="sidebar">
    <div class="brand">
      <div class="mark">B67</div>
      <div class="txt">商品頁建置<small>給同事的操作說明</small></div>
    </div>
    <nav class="nav">
      <a data-t="p1" class="active" onclick="show('p1')">{IC["settings"]}<span>商品頁設定</span><span class="step">01</span></a>
      <a data-t="p2" onclick="show('p2')">{IC["code"]}<span>商品頁語法</span><span class="step">02</span></a>
      <a data-t="p3" onclick="show('p3')">{IC["image"]}<span>圖片取得方式</span><span class="step">03</span></a>
      <a data-t="p4" onclick="show('p4')">{IC["skill"]}<span>Claude Skill</span><span class="step">04</span></a>
    </nav>
    <div class="side-foot">標 <b style="color:var(--accent)">✏️【…】</b> 的地方都是填空處。<br>填好再貼進 SHOPLINE 商品描述。</div>
  </aside>

  <main class="content">
    <section id="p1" class="page active">{settings_page}
    </section>

    <section id="p2" class="page">
      <div class="hero">
        <span class="hero-eyebrow">STEP 2</span>
        <h1 class="hero-title">商品頁語法</h1>
        <p class="hero-sub">整個商品頁拆成 {len(sections)} 個區塊，由上到下＝商品頁實際顯示順序。</p>
      </div>
      <div class="howto">
        <div class="howto-h">{IC["info"]}怎麼用這頁？</div>
        每個區塊有：① <b>說明</b>（要改什麼）→ ② <b>範例預覽</b>（完成後長相）→ ③ <b>填空語法</b>。<br>
        <span class="key">重點：</span>語法裡所有 <b>✏️【…】</b> 都是要你<b>填空</b>的地方——把整個 ✏️【…】（含鉛筆符號）換成你的內容。沒有 ✏️ 標記的部分（含一長串 <code>style="…"</code>）不要動。<br>
        操作：按「複製語法」→ 把【】都填好 → 到 SHOPLINE <b>商品 → 商品描述 → 右上角 &lt;/&gt; 切 HTML 原始碼</b> → 貼上 → 存檔。
      </div>
      {blocks_joined}
    </section>

    <section id="p3" class="page">{images_page}
    </section>

    <section id="p4" class="page">{skill_page}
    </section>
  </main>
</div>

<script>
  function show(id){{
    document.querySelectorAll('.page').forEach(function(p){{p.classList.remove('active')}});
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav a').forEach(function(a){{a.classList.remove('active')}});
    document.querySelector('[data-t="'+id+'"]').classList.add('active');
    window.scrollTo({{top:0,behavior:'smooth'}});
  }}
  function copyCode(btn){{
    var box = btn.closest('.code,.field').querySelector('textarea');
    box.select();
    var lbl = btn.querySelector('.lbl');
    var done = function(){{
      var t = lbl.getAttribute('data-o') || lbl.textContent;
      lbl.setAttribute('data-o', t);
      lbl.textContent = '已複製！'; btn.classList.add('ok');
      setTimeout(function(){{lbl.textContent=t;btn.classList.remove('ok')}}, 1500);
    }};
    if(navigator.clipboard&&navigator.clipboard.writeText){{
      navigator.clipboard.writeText(box.value).then(done, function(){{document.execCommand('copy');done();}});
    }}else{{document.execCommand('copy');done();}}
  }}
</script>
</body>
</html>
'''

with open(OUT, "w", encoding="utf-8") as f:
    f.write(doc)

print("blocks:", len(sections), "| 佔位符【數:", doc.count("【"), "| emoji殘留(應少):", sum(doc.count(e) for e in ["📌","📋","🖼","💡","⚠️"]))
