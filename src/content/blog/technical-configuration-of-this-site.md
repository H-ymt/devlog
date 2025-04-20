---
title: 'Astroで制作した本サイトの技術構成'
description: 'Astroで制作した本サイトの技術構成を紹介します。'
pubDate: 'Apr 15 2024'
tags:
  - Architecture
  - Astro
  - Pagefind
---

## 選定の方針

長期間の運用を考えてランニングコストを抑えるような技術選定
コンテンツ管理はヘッドレスCMSを考えていたが、マークダウンの方がGitで管理もできるので、マークダウンでコンテンツを管理。

## 主な機能

- マークダウン
- ダークモード
- お問い合わせフォーム
- OG画像生成
- View Transitions API

## ホスティング

[Cloudflare Pages](https://pages.cloudflare.com/)にホスティング。
ほかにVercelやNetlifyがあげられるが、Vercelだと将来サイト内に広告をつけたくなった場合に課金プランに移行しなければならない、NetlifyはCDNのキャッシュサーバーが日本になく、Cloudflare Pagesより速度的に劣るらしいので、消去法でCloudflare Pagesを選定。

## フロントエンド

### Astro

静的サイトジェネレーターはAstroを使用。
自分の扱える技術でNext.jsも候補にあったが、認証などの複雑な機能もつける予定がなく、サイトパフォーマンスにこだわりたかったのでクライアントサイドのJavaScriptを減らすことができるAstroを選択。

### CSS

Tailwind CSSと迷ったが、他のプロジェクトで使い回しできることも考えてSassを使用。

### その他のライブラリ

- [astro-google-fonts-optimizer](https://github.com/sebholstein/astro-google-fonts-optimizer)：Next.jsのフォント最適化にインスパイアされて作られた、googleフォントを最適化してくれるライブラリ。
- [@astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap)：簡単にサイトマップを生成してくれるAstro公式のインテグレーション。
- [satori](https://github.com/vercel/satori)；HTML/CSSからSVG画像を生成するVercel社がリリースしたJavaScriptライブラリ。
- [@resvg/resvg-js](https://github.com/yisibl/resvg-js)：satoriで生成したSVGをPNGに変換するライブラリ。
- [Pagefind](https://pagefind.app/)：静的サイトに特化した全文検索ライブラリ。
- [remark-link-card](https://github.com/gladevise/remark-link-card)：テキストリンクをリンクカードに変換するプラグイン。
- [astro-expressive-code](https://expressive-code.com/)：コードブロックにファイル名の表示やコピーボタンを追加することができるプラグイン。
