---
title: 'Astroで制作した本サイトの技術構成'
description: 'Astroで制作した本サイトの技術構成を紹介します。'
pubDate: 'Jul 08 2022'
tags: ['html', 'css', 'javascript']
heroImage: '/blog-placeholder-3.jpg'
---

## 選定の方針

長期間の運用を考えてランニングコストを抑えるように選定しました。
コンテンツ管理はヘッドレスCMSを考えていましたが、MDXの方が後々ラクで料金も気にしなくていいので、MDXで入稿する形をとりました。

## 主な機能

サイトにいれたかった機能は次のとおりです。ブログ詳細ページの動的OGP生成と多言語化対応（といっても英語だけ）は、後々やっていこうと思います。

- マークダウン
- ダークモード
- お問い合わせフォーム
- 全文検索機能
- 動的OGP生成
- View Transitions API

## ホスティング

[Cloudflare Pages](https://pages.cloudflare.com/)にホスティングしています。
他の主なホスティング先としては、VercelやNetlifyがあげられますがVercelだと、将来サイト内に広告をつけたくなった場合に課金プランに移行しなければならないため、選定先から外しました。
NetlifyはCDNのキャッシュサーバーが日本になく、Cloudflare Pagesより速度的に劣るらしいので、消去法でCloudflare Pagesを選定しました。

## フレームワーク

静的サイト生成としてAstroを使用しています。
自分の扱える技術でNext.jsも候補にありましたが、高度なアニメーションや認証などの複雑な機能もつける予定がなく、また、とにかくサイトパフォーマンスにこだわりたかったのでクライアントサイドのJavaScriptを減らすことができるAstroを選択しました。

## スタイリング

Tailwind CSSと迷いましたが、他のプロジェクトで使い回しできることも考えてSassでスタイリングしています。