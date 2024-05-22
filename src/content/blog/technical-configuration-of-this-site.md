---
title: 'Astroで制作した本サイトの技術構成'
description: 'Astroで制作した本サイトの技術構成を紹介します。'
pubDate: 'Apr 15 2024'
tags:
  - html
  - css
  - javascript
---

## 選定の方針

長期間の運用を考えてランニングコストを抑えるように選定しました。
コンテンツ管理はヘッドレスCMSを考えていましたが、MDXの方が後々ラクで料金も気にしなくていいので、MDXで入稿する形をとりました。

## 主な機能

サイトにいれたかった機能は次のとおりです。とりあえずリリースしたかったので、お問い合わせフォーム、~~ブログのOG画像生成、~~ 全文検索は、後回しにしました。時間があるときに実装しようと思います。

- マークダウン
- ダークモード
- お問い合わせフォーム
- OG画像生成
- View Transitions API

## ホスティング

[Cloudflare Pages](https://pages.cloudflare.com/)にホスティングしています。
他の主なホスティング先としては、VercelやNetlifyがあげられますがVercelだと、将来サイト内に広告をつけたくなった場合に課金プランに移行しなければならないため、選定先から外しました。
NetlifyはCDNのキャッシュサーバーが日本になく、Cloudflare Pagesより速度的に劣るらしいので、消去法でCloudflare Pagesを選定しました。

## フロントエンド

### Astro

静的サイトジェネレーターはAstroを使用しています。
自分の扱える技術でNext.jsも候補にありましたが、高度なアニメーションや、認証などの複雑な機能もつける予定がなく、サイトパフォーマンスにこだわりたかったのでクライアントサイドのJavaScriptを減らすことができるAstroを選択しました。

### CSS

Tailwind CSSと迷いましたが、他のプロジェクトで使い回しできることも考えてSassでスタイリングしています。

### その他のライブラリ

- [astro-google-fonts-optimizer](https://github.com/sebholstein/astro-google-fonts-optimizer)：googleフォントを最適化してくれるライブラリ。Next.jsのフォント最適化にインスパイアされて作られたみたいです。
- [@astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap)：簡単にサイトマップを生成してくれるAstro公式のインテグレーション。
- [satori](https://github.com/vercel/satori)；HTML/CSSからSVG画像を生成するVercel社がリリースしたJavaScriptライブラリ。
- [@resvg/resvg-js](https://github.com/yisibl/resvg-js)：satoriで生成したSVGをPNGに変換するライブラリ。
- [Pagefind](https://pagefind.app/)：静的サイトに特化した全文検索ライブラリ。
- [remark-link-card](https://github.com/gladevise/remark-link-card)：テキストリンクをリンクカードに変換するプラグイン。
- [astro-expressive-code](https://expressive-code.com/)：コードブロックにファイル名の表示やコピーボタンを追加することができるプラグイン。
