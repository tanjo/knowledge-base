class Mokuji
  @run = (first, last) ->
    div = document.getElementById 'mokuji'
    unless div?
      return
    query = ""
    for i in [first..last] by 1
      if i is first
        query += 'h' + i
      else
        query += ',h' + i
    headings = document.querySelectorAll query
    ul = document.createElement 'ul'
    for heading in headings
      heading.id =
        encodeURIComponent(heading.innerText.replace(/\n+$/g,''))
      level = parseInt heading.tagName.charAt(1)
      line = document.createElement 'li'
      line.setAttribute 'class', "mokuji#{level}"
      a = document.createElement 'a'
      a.setAttribute 'href', '#' + heading.id
      a.innerText = heading.innerText.replace /\n+$/g, ''
      line.appendChild a
      ul.appendChild line
    div.appendChild ul

module.exports = Mokuji
