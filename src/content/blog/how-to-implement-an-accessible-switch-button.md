---
title: 'アクセシブルなswitchボタンの実装方法'
description: 'アクセシビリティに配慮したSwitchボタンのマークアップの実装例を紹介'
pubDate: 'May 22 2024'
tags:
  - html
  - css
  - javascript
---

## 満たすべき要件

switchボタンの満たすべき要件としては以下のとおりです。

- キーボードでアクセス可能
- クリック、Spaceキー、Enterキー（任意）でスイッチの値を切り替えることができる

## HTMLの実装例

キーボードでアクセス可能にするため、switch本体は`<button>`タグでマークアップし、`role`属性には`switch`を設定します。

また、`switch`ロールには`aria-checked`属性が必須のため、初期のオフ状態である`false`を設定しておき、スイッチがトグルされた時にJavaScriptで属性の値を入れ替えます。

`data-state`属性の値で、オン状態とオフ状態のスタイルをあてる実装としています。こちらは、classで制御しても問題ありません。

```html
<button
  type="button"
  role="switch"
  data-state="unchecked"
  aria-checked="false"
  class="switch js-switchButton"
>
  <span
    data-state="unchecked"
    class="switch-label js-switchLabel"
  >
  </span>
</button>
```

## CSSの実装例

```css
.switch {
  position: relative;
  display: inline-flex;
  justify-items: center;
  width: 44px;
  height: 24px;
  padding: 0;
  background: #e6e5e5;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 12px;
}

　.switch:focus-visible {
  outline-offset: 2px;
}

.switch[data-state='checked'] {
  background: #222222;
}

.switch-label {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #ffff;
  border-radius: 9999em;
  box-shadow: 0 2px 4px 0 #333;
  transition: transform 0.2s;
  transform: translateX(0);
}

.switch-label:where(.switch[data-state='checked'] *) {
  transform: translateX(22px);
}
```

## JavaScriptの実装例

```js
// ボタンとラベルの要素を取得
const button = document.querySelector('.js-switchButton')
const label = document.querySelector('.js-switchLabel')

// スイッチの状態を切り替える関数
const switchHandler = () => {
  // 現在の状態が "checked" かどうかを判定
  const isChecked = button.getAttribute('data-state') === 'checked'

  // 新しい状態を設定 ("checked" と "unchecked" を切り替える)
  const newState = isChecked ? 'unchecked' : 'checked'

  // aria-checked 属性の値を設定 ("true" と "false" を切り替える)
  const ariaChecked = isChecked ? 'false' : 'true'

  // ボタンの data-state 属性と aria-checked 属性を更新
  button.setAttribute('data-state', newState)
  button.setAttribute('aria-checked', ariaChecked)

  // ラベルの data-state 属性を更新
  label.setAttribute('data-state', newState)
}

// ボタンにクリックイベントリスナーを追加
button.addEventListener('click', switchHandler)
```

## Referrence

https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/switch_role
