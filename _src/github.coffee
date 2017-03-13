class Github
  @BASE_URL = "https://api.github.com/"
  @CONTENTS_PATH = "repos/{owner}/{repository}/contents{path}"

  @getContents = (params, callback) ->
    unless params.owner? or params.repository?
      console.log "It's necessary for " +
        "using Github.getContents method to" +
        " must have `owner` and `repository` parameters."
      return
    unless params.path?
      params.path = "/"

    url = @BASE_URL + @CONTENTS_PATH
    url = url
      .replace "{owner}", params.owner
      .replace "{repository}", params.repository
      .replace "{path}", params.path
    request = new XMLHttpRequest()
    request.open 'GET', url
    if typeof callback is 'function'
      request.onload = callback
    request.send null
    return

  @explorer = (params, callback) ->
    Github.getContents params, ->
      json = JSON.parse @responseText
      result = {}
      if Array.isArray json
        for data in json
          Github.manageJSON params, data, (value) ->
            result[data.name] = value
            if Object.keys(result) is json.length
              callback result
      return

  @manageJSON = (params, data, callback) ->
    if Github.isFile data
      callback Github.makeText params.prefix, data
    else if Github.isDir data
      p = params
      unless p.prefix?
        p.prefix = ""
      p.prefix += "  "
      p.path += "#{p.path}#{data.path}/"
      Github.explorer p, (value) ->
        callback Github.makeText(params.prefix, data) + value
    return

  @makeText = (data, prefix) ->
    unless prefix?
      prefix = ""
    return "#{prefix}[#{data.name}](#{data.html_url})\n\n"

  @isFile = (data) ->
    return data.type is 'file' and data.name.indexOf('.md') isnt -1

  @isDir = (data) ->
    return data.type is 'dir' and data.name.indexOf('_') is -1

  @onload = (owner, repository, urlQuery, callback) ->
    unless urlQuery.q?
      urlQuery.q = "/"
    Github.explorer
        owner: owner
        repository: repository
        path: urlQuery.q
        prefix: "- "
      , (result) ->
        document.getElementById('content').innerHTML = marked result
        callback()
        return
    return

module.exports = Github
