# londonimg-product — Sanitization-proof product-page toolkit for SHOPLINE

A private toolkit + [Claude](https://claude.com) Skill that helps SHOPLINE (and other
sanitizing-CMS) store owners build **conversion-oriented, SEO/GEO-friendly product
description pages** — despite the platform stripping out most of the HTML you'd
normally rely on.

> 一套 SHOPLINE 商品頁工具鏈：**Claude Skill ＋ 抗淨化 HTML 積木模板 ＋ 教學頁**。
> ⚠️ **非開源專案。** 本 repo 為專有內容，僅供授權的客戶網站與其同仁使用。
> 部分靜態檔案以公開網址託管，純粹是為了讓客戶網站載得到 —— **公開可存取不等於授權使用**。

## The problem it solves

SHOPLINE's product-description editor **silently strips** `<style>`, `<script>`,
`<svg>`, inline `data:` URIs, CSS `gap`, and `aspect-ratio` from anything you paste.
`rem` units are shrunk by the theme's `62.5%` root font-size, and `href="#"` is
rewritten to the homepage by the theme's `<base href="/">`. The result: merchants
paste a nice-looking product page and it renders broken on the live store.

This toolkit is a set of **"lego-block" HTML sections that survive that
sanitization** — inline-only styles, `px` units, `margin` instead of `gap`,
`padding-bottom` ratio boxes instead of `aspect-ratio`, mobile-first (≈70% of
traffic is mobile), and structured for SEO/GEO (AI-citation) friendliness.

## What's inside

| Path | What it is |
|------|------------|
| `product-page/londonimg-product/` ‧ `product-page/londonimg-product.zip` | A **Claude Skill**. You give it product info; it returns SHOPLINE-ready copy (bilingual product name + summary), a product description built from 13 reusable blocks, and the 4 back-office SEO fields (title / meta / keywords / URL slug). Ships with reference docs for the sanitization rules and SEO/GEO rules. _(The brand-voice guardrail doc is internal and not included — the Skill runs without it, with brand-tone checking disabled.)_ |
| `product-page/` (product-page-guide.html/css/js) | A **build guide** (static HTML) for non-technical teammates — the 13 lego blocks with live previews and one-click "fill-in-the-blank" copy buttons, plus back-office setup and 301-redirect steps. |
| `yu-pdp.css` | Optional shared stylesheet for product descriptions (loadable via jsDelivr). |
| `index.html` | GitHub Pages entry; auto-redirects to the build guide. |

> The Skill's block templates are a **byte-for-byte mirror** of the guide's copy
> blocks, kept in sync by a generator script — so what a teammate copies from the
> page and what the Skill emits are always identical.

## Who it's for

- SHOPLINE store owners (and anyone on a CMS that sanitizes pasted HTML) who want
  product pages that don't break on paste.
- Small e-commerce teams where a non-developer maintains the storefront.

It's opinionated toward the store it was built for (an iPhone-accessory shop), but
the sanitization workarounds, the block system, and the SEO/GEO structure are
platform-general. Brand-specific bits (IG handle, brand voice) are called out in the
reference docs so you can swap them for your own.

## GitHub Pages

- Entry: <https://anita791122.github.io/londonimg/>
- Build guide: <https://anita791122.github.io/londonimg/product-page/product-page-guide.html>

## Loading `yu-pdp.css` via jsDelivr

This repo is **publicly reachable** (required so the client store can load the file — not an open-source grant). In SHOPLINE's "header custom code", add:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/anita791122/londonimg@main/yu-pdp.css">
```

> jsDelivr caches for up to ~12h after a change; force-refresh with a git tag or
> purge.jsdelivr.net. Use jsDelivr, not GitHub raw (wrong MIME type).

## License

**專有／All rights reserved** —— 見 [LICENSE](./LICENSE)。不授權複製、修改、散布或再販售。

> 本 repo 於 2026-06-09 至 2026-09-20 期間曾採 MIT 授權；該期間已取得的副本仍受 MIT 保障，無法追溯撤回。
