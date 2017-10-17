# Promise

[Promise - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 雑記

- `Promise.prototype.then` と `Promise.prototype.catch` は連鎖可能 (Composition)


## 構文

```
var promise = new Promise(function(resolve, reject) {
  // ...
});
```

### 引数

#### resolve

プロミスが成功した場合に呼ばれる関数

#### reject

プロミスが失敗した場合に呼ばれる関数

## 状態

- pending
  - 初期状態
- fulfilled
  - 処理が成功
- rejected
  - 処理が失敗

## プロパティ

- `Promise.length`
  - コンストラクタの引数の数 (1)。
- `Promise.prototype`
  - プロトタイプ

## メソッド

- `Promise.all`
  - すべてのプロミスが成功したときに成功するプロミスを返す
  - 失敗すると他のプロミスの結果は無視される
- `Promise.rece`
  - 最初に完了したプロミスによってプロミスを返す
- `Promise.reject`
  - 失敗 Promise オブジェクトを返す
- `Promise.resolve`
  - 成功 Promise オブジェクトを返す
  - 結果は thenable に従う

## Promise プロトタイプ

- `Promise.prototype.constructor`
  - コンストラクタ
- `Promise.prototype.catch`
  - プロミスに失敗ハンドラコールバックを付加
- `Promise.prototype.then`
  - プロミスに成功ハンドラと失敗ハンドラを付加

## 例

### Callback と Promise 両方に対応

```js
function hoge(fuga, callback) {
  var promise = new Promise(function(resolve, reject) {
    console.log("Hello, Promise!");
    if (fuga) {
      resolve("resolve");
    } else {
      reject("reject");
    }
  });

  if (!(typeof callback === 'function')) {
    return promise;
  }

  promise.then(function(data) {
    callback(data);
  }).catch(callback);
}

hoge("あああ").then(function(data) { console.log(data); });
hoge(null, function(data){
  console.log(data);
});
```

```sh
Hello, Promise!
resolve
Hello, Promise!
reject
```

### XMLHttpRequest (未確認)

```js
function $http(url) {
  var core = {
    ajax: function(method, url, args) {
      var promise = new Promise(function(resolve, reject) {
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argc = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argc++) {
                url += '&';
              }
              url += encodeURIComponent(key)
                  + '='
                  + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();
        client.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.responseText);
          } else {
            reject(this.statusText);
          }
        };
        client.onerror = function() {
          reject(this.statusText);
        }
      });
      return promise;
    }
  };
  return {
    'get': function(args) {
      return core.ajax('GET', url, args);
    },
    'post': function(args) {
      return core.ajax('POST', url, args);
    },
    'put': function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete': function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
}

var url = "https://tanjo.github.io/til"
var payload = {
  'dir': 'JavaScript',
  'file': 'promise.md'
};
var callback = {
  success: function(data) {
    console.log(1, 'success', JSON.parse(data));
  },
  error: function(data) {
    console.log(2, 'error', JSON.parse(data));
  }
};

$http(url)
  .get(payload)
  .then(callback.success)
  .catch(callback.error);

$http(url)
  .get(payload)
  .then(callback.success, callback.error);

$http(url)
  .get(payload)
  .then(callback.success)
  .then(undefined, callback.error);
```
