class Utility
    
  @getUrlQuery = ->
    url = window.location.search
    hash = url.slice(1).split '&'
    queries = []
    for h in hash
      data = h.split '='
      queries.push data[0]
      queries[data[0]] = data[1]
    return queries

module.exports = Utility
