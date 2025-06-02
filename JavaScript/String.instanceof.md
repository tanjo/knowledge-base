# String を instanceof すると文字列リテラルは false になる

## 文字列リテラルとは

`new String()` を利用せずに記述した文字列のこと。

```js
const literalString = "こんにちは";
```

## instanceof を使う

文字列リテラルは `String` 判定にならない。

```js
const literalString = "こんにちは";
console.log(literalString instanceof String); // --> false
```

```js
const objectString = new String("こんばんは");
console.log(objectString instanceof String); // --> true
```

### typeof を使う

`new String()` は Object 型なので `tyoepf` は `'object'` になる

```js
const literalString = "こんにちは";
const objectString = new String("こんばんは");
console.log(typeof literalString === 'string'); // --> true
console.log(typeof objectString === 'string'); // --> false
```

## 解決方法

### `Object.prototype.toString.call(str) === '[object String]'` を使う

以上より、 `instanceof` と `typeof` はそれぞれを別物として判定してしまう。

すべて同じように扱うのが以下のコードとなる。

```js
Object.prototype.toString.call(str) === '[object String]'
```

コード長が長いので関数にしてしまえば短くできる。

```js
function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
}
console.log(isString('こんにちは')); // --> true
console.log(isString(new String('こんばんは'))); // --> true
```

## 参考

- [instanceof \- JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof)
