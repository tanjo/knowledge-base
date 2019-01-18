# String.prototype.normalize

[String\.prototype\.normalize\(\) \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)

> normalize() メソッドは、引数で与えられた文字列(その値が文字列でない場合、最初の文字列に変換されます)の Unicode 正規化形式を返します。

## 引数

- NFC
  - 「か」と「゛」を「が」にする。
- NFD
  - 「が」を「か」と「゛」にする。

## メモ

GitHub Pages は強制的に `normalize('NFC')` でURLを生成する。
