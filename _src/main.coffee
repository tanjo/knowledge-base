Mokuji = require './mokuji.coffee'
Github = require './github.coffee'
Utility = require './utility.coffee'

window.onload = ->
  Github.onload "tanjo", "til", Utility.getUrlQuery(), ->
    mokuji = document.getElementById 'mokuji'
    if mokuji?
      Mokuji.run(
        parseInt(mokuji.getAttribute('first')),
        parseInt(mokuji.getAttribute('last'))
      )
    return
  return
