# Github API - Get contents

[https://developer.github.com/v3/repos/contents/#get-contents](https://developer.github.com/v3/repos/contents/#get-contents)

This method returns the contents of a file or directory in this repository.

```sh
curl https://api.github.com/repos/:owner/:repo/contents/:path
```

## 例. README.md of this repository

```sh
curl https://api.github.com/repos/tanjo/til/contents/Github/github-api-get-contents.md
```

## Parameters

- ref - the name of commit / branch / tag.

```
curl https://api.github.com/repos/tanjo/til/contents/Github/github-api-get-contents.md?ref=develop
```

## Response

### Directory

```json
[
  {
    "name": "github-api-get-contents.md",
    "path": "Github/github-api-get-contents.md",
    "sha": "8bbeafc5a5b4d5929e0ab39d45d5e1fafe2fa431",
    "size": 1409,
    "url": "https://api.github.com/repos/tanjo/til/contents/Github/github-api-get-contents.md?ref=master",
    "html_url": "https://github.com/tanjo/til/blob/master/Github/github-api-get-contents.md",
    "git_url": "https://api.github.com/repos/tanjo/til/git/blobs/8bbeafc5a5b4d5929e0ab39d45d5e1fafe2fa431",
    "download_url": "https://raw.githubusercontent.com/tanjo/til/master/Github/github-api-get-contents.md",
    "type": "file",
    "_links": {
      "self": "https://api.github.com/repos/tanjo/til/contents/Github/github-api-get-contents.md?ref=master",
      "git": "https://api.github.com/repos/tanjo/til/git/blobs/8bbeafc5a5b4d5929e0ab39d45d5e1fafe2fa431",
      "html": "https://github.com/tanjo/til/blob/master/Github/github-api-get-contents.md"
    }
  }
]
```

### File

```json
{
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

### Wrong Request's Respnse

```
{
	  "message": "No commit found for the ref develop",
	    "documentation_url": "https://developer.github.com/v3/repos/contents/"
}
```

## Response Parameters

### type

- `dir` - Directory
- `file` - File
