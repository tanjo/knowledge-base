# Github API

## Get contents

このメソッドはリポジトリ内のファイルやディレクトリの内容を返します。

```sh
curl https://api.github.com/repos/:owner/:repo/contents/:path
```

### 例. `tanjo/til` にある README.md の情報を取得する

```sh
curl https://api.github.com/repos/tanjo/til/contents/Github/github-api-get-contents.md
```

### Parameters

- ref - 対象コミット、ブランチ、タグ

  `?ref=develop`

### 中身

```json

  "name": "README.md",
  "path": "README.md",
  "sha": "8c3559c6a14b2982a722202cdfc4ccc3306b184d",
  "size": 54,
  "url": "https://api.github.com/repos/tanjo/til/contents/README.md?ref=master",
  "html_url": "https://github.com/tanjo/til/blob/master/README.md",
  "git_url": "https://api.github.com/repos/tanjo/til/git/blobs/8c3559c6a14b2982a722202cdfc4ccc3306b184d",
  "download_url": "https://raw.githubusercontent.com/tanjo/til/master/README.md",
  "type": "file",
  "content": "IyB0aWwKVG9kYXkgSSBMZWFybmVkIOKApiBodHRwczovL3RhbmpvLmdpdGh1\nYi5pby90aWwK\n",
  "encoding": "base64",
  "_links": {
    "self": "https://api.github.com/repos/tanjo/til/contents/README.md?ref=master",
    "git": "https://api.github.com/repos/tanjo/til/git/blobs/8c3559c6a14b2982a722202cdfc4ccc3306b184d",
    "html": "https://github.com/tanjo/til/blob/master/README.md"
  }
}
```

#### `type`

- `dir` - ディレクトリ
- `file` - ファイル
