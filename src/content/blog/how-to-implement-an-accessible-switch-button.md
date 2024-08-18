---
title: 'アクセシブルなSwitchボタンの実装方法'
description: 'アクセシビリティに配慮したSwitchボタンのマークアップの実装例を紹介'
pubDate: 'May 22 2024'
tags:
  - HTML
  - CSS
  - JavaScript
---

## 満たすべき要件

switchボタンの満たすべき要件としては以下のとおりです。

- キーボードでアクセス可能
- スクリーンリーダーでスイッチのオンとオフを識別できる
- クリック、Spaceキー、Enterキー（任意）でスイッチの値を切り替えることができる

## HTMLの実装例

キーボードでアクセス可能にするため、switch本体は`<button>`タグでマークアップし、`role`属性には`switch`を設定します。

また、`switch`ロールには`aria-checked`属性が必須のため、初期のオフ状態である`false`を設定しておき、スイッチがトグルされた時にJavaScriptで属性の値を入れ替えます。

例のように`<label>`要素で何のスイッチかを明確にしておくのがベストですが、要件でそれができない場合は、`<button>`に`aria-label`属性を設定するか、`<span>`タグでスクリーンリーダー用のテキストを用意しておきます。

カスタムデータ属性でスタイルをあてるため、初期状態は`date-state`属性を`unchecked`にしておきます。

```html
<label for="switch">mode</label>
<button
  id="switch"
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

`data-state`属性の値でオン状態を`checked`、初期のオフ状態を`unchecked`としておき、それぞれにスタイルをあてる実装としています。こちらは、classで制御しても問題ありません。

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

ボタンをクリックした時に、JavaScriptで`data-state`属性と`aria-checked`の値を切り替える処理を追加します。

```js
const button = document.querySelector('.js-switchButton')
const label = document.querySelector('.js-switchLabel')

const switchHandler = () => {
  const isChecked = button.getAttribute('data-state') === 'checked'

  const newState = isChecked ? 'unchecked' : 'checked'

  const ariaChecked = isChecked ? 'false' : 'true'

  button.setAttribute('data-state', newState)
  button.setAttribute('aria-checked', ariaChecked)

  label.setAttribute('data-state', newState)
}

button.addEventListener('click', switchHandler)
```

関数の中身について少し解説すると、`button`の現在の状態（ `checked`か`unchecked`）を判定し、`data-state`属性と`aria-checked`の値を切り替える関数を準備します。

```js
const isChecked = button.getAttribute('data-state') === 'checked'
const newState = isChecked ? 'unchecked' : 'checked'
const ariaChecked = isChecked ? 'false' : 'true'
```

次の処理で`button`の`data-state`属性と`aria-checked`属性を更新しています。

```js
// ボタンの data-state 属性と aria-checked 属性を更新
button.setAttribute('data-state', newState)
button.setAttribute('aria-checked', ariaChecked)

// ラベルの data-state 属性を更新
label.setAttribute('data-state', newState)
```

下記がコメントで解説を入れたJavaScriptのコードです。

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

## Reference

https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/switch_role
