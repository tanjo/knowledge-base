# Base64化

音声ファイルを Base64 文字列にする

```
openssl base64 -in input.mp3  -out output.txt
```

## JavaScript で再生

生成された文字列に `data:audio/mp3;base64,` をつけて、 `new Audio` を作成すると JavaScript で再生ができる。

```
var sound = new Audio(`data:audio/mp3;base64,${base64String}`);
sound.play();
```

