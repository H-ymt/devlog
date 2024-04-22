---
title: '本サイトのアクセシビリティ対応について'
description: 'このサイトを制作するときに行なったアクセシビリティ対応を紹介します。'
pubDate: 'Apr 19 2024'
tags:
  - html
  - css
  - javascript
heroImage: '/blog-placeholder-3.jpg'
---

## ハンバーガーメニュー

画面幅が狭い場合に表示されるハンバーガーメニューについては以下の点に配慮して実装しました。

- キーボードでボタンにアクセスできる
- エスケープキーでメニューを閉じることができる
- メニューが開いている間は背面のコンテンツにフォーカスが当たらないようにする
- メニューが開いている間は背面をスクロールさせない
- aria-label、aria-controls、aria-expandedでスクリーンリーダーの読み上げに対応させる

上記を満たすための実装は、Zennでまとめています。
https://zenn.dev/h_ymt/articles/69b9ee1b43b14d

## グローバルナビゲーション

グローバルナビゲーションで実施したことは、`<nav>`タグにaria-label属性を付与してアクセシブルな名前を付与し、また、aria-currentで現在のページを示してあげるようにしました。

次のコードは本サイトのグローバルメニューの実装です。 `Astro.url`で現在のパスを取得し、現在のパスとaタグのhref属性が一致する場合に`isActive`クラスを付与し、さらにaria-currentの属性をpageに設定します。

```astro title="./src/components/HeaderLink.astro"
---
import type { HTMLAttributes } from 'astro/types'

type Props = HTMLAttributes<'a'>

const { href, class: className, ...props } = Astro.props

const { pathname } = Astro.url
const subpath = pathname.match(/[^\/]+/g)
const isActive = href === pathname || href === `/${subpath?.[0]}/`
const currentPath = href === pathname || null
---

<a
  href={href}
  aria-current={currentPath ? 'page' : null}
  class:list={['headerLink', className, { active: isActive }]}
  {...props}
>
  <slot />
</a>
```

さきほど作成したリンクコンポーネントをheaderコンポーネントに設置します。
`<nav>`タグにはaria-label属性を付与してグローバルナビゲーションのnameを設定しておきます。

```astro title="./src/components/Header.astro"
---
import HeaderLink from './HeaderLink.astro'
---

<header class="header">
  <Container class="header-inner">
    <a
      href="/"
      class="logo"
    >
      <span></span>
    </a>

    <nav
      class="nav"
      aria-label="グローバルナビゲーション"
    >
      <div class="links">
        <div class="internal-links">
          <HeaderLink href="/">HOME</HeaderLink>
          <HeaderLink href="/blog/">BLOG</HeaderLink>
          <HeaderLink href="/note/">NOTE</HeaderLink>
          <HeaderLink href="/contact/">CONTACT</HeaderLink>
        </div>
      </div>
    </nav>
  </Container>
</header>
```

## ぱんくずリスト

グローバルナビゲーションと同様にぱんくずリストの現在のページにはaria-current="location"を付与しておきます。

```astro title="./src/components/Breadcrumbs.astro"
---
interface BreadcrumbItem {
  label: string
  path?: string
}

export async function getBreadcrumbs(path: string): Promise<BreadcrumbItem[]> {
  const breadcrumbs: BreadcrumbItem[] = []
  const paths = path.split('/').filter((path) => path !== '')

  let currentPath = ''
  for (const segment of paths) {
    currentPath += `/${segment}`
    breadcrumbs.push({
      label: segment.slice(0, 1).toUpperCase() + segment.slice(1),
      path: currentPath,
    })
  }

  return breadcrumbs
}
---

<nav>
  <ul class="breadcrumbs">
    <li class="homepath">
      <a
        href="/"
        class="homepath-link"
        aria-current={Astro.url.pathname === '/' ? 'location' : null}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ...
        </svg>
        <span class="sr-only">ホーム</span>
      </a>
    </li>
    {
      (await getBreadcrumbs(Astro.url.pathname)).map((crumb) => (
        <li class="subpath">
          {crumb.path ? (
            <a
              href={crumb.path}
              aria-current={crumb.path === crumb.path ? 'location' : null}
            >
              {crumb.label}
            </a>
          ) : (
            crumb.label
          )}
        </li>
      ))
    }
  </ul>
</nav>
```

## ロゴやアイコンにアクセシブルな名前をつける

GitHubやZennなどのアイコンを実装するときは、スクリーンリーダーユーザーにもどのようなアイコンか認識できるようにします。

実装方法としてはaria-labelを付与するか、アイコン自体にaria-hidden="true"を設定しておき、スクリーンリーダー用のテキストを設置します。

```astro
<div class="social-links">
  <a
    href="https://github.com/H-ymt/devlog"
    target="_blank"
    class="github-link social-link"
  >
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      width="20"
      height="20"
    >
      ...
    </svg>

    <span class="sr-only">GitHub repo</span>
  </a>
</div>

<style>
  .sr-only {
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: 0;
    overflow: hidden;

    /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
    clip: rect(1px 1px 1px 1px);

    /* maybe deprecated but we need to support legacy browsers */
    clip: rect(1px, 1px, 1px, 1px);

    /* modern browsers, clip-path works inwards from each corner */
    clip-path: inset(50%);

    /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
    white-space: nowrap;
    border: 0;
  }
</style>
```

## 文字色と背景色に十分なコントラストを確保する

文字色はWCAGの達成基準レベルAA（4.5以上）のコントラスト比を満たすようにしました。
