class GithubNote
  @MARKDOWN_CONTENT_404 = "# 404 Not Found"
  @DEFAULT_PAGE = "README.md"
  @BASE_URL = "https://api.github.com/"
  @CONTENTS_PATH = "repos/{owner}/{repository}/contents{path}"

  constructor: (@owner, @repository) ->


  @getUrlQuery = () ->
    url = window.location.search
    hash = url.slice(1).split '&'
    queries = []
    for i in [0...hash.length]
      data = hash[i].split '='
      queries.push data[0]
      queries[data[0]] = data[1]
    return queries

  @getMarkdown = (filename, callback) ->


  @get = (url, callback) ->
    request = new XMLHttpRequest()
    request.open 'get', url
    request.onload = callback
    request.send null
