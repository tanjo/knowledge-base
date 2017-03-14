# JavaScript - Object.assign

[Object.assign() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

> 一つ以上の ソース オブジェクトから、直接所有で (own)  列挙可能な (enumerable) すべてのプロパティの値を、ターゲット オブジェクトへコピーします。戻り値はターゲット オブジェクトです。

## 引数

- target
  - 基準となるオブジェクト
- sources
  - 素材となるオブジェクト達

## オブジェクトを複製

```js
var a = { a: 1 };
var copy = Object.assign({}, a);
console.log(copy);
```

## オブジェクトをマージ

target に指定されたオブジェクトも変化する

```js
var a = { a: 1 };
var b = { b: 2 };
var c = { c: 3 };
var obj = Object.assign(a, b, c);
console.log(obj);
console.log(a);
```
