# 無音のmp3を作る

## 0.2秒の無音のmp3を作成する

```
ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.2 -aq 9 -c:a libmp3lame silent.mp3
```

## 参考サイト

- [ffmpegで無音のmp3ファイルを生成する](https://blog.symdon.info/posts/1642239398/)