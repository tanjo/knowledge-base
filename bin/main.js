(function() {
  var GithubNote;

  GithubNote = (function() {
    GithubNote.MARKDOWN_CONTENT_404 = "# 404 Not Found";

    GithubNote.DEFAULT_PAGE = "README.md";

    GithubNote.BASE_URL = "https://api.github.com/";

    GithubNote.CONTENTS_PATH = "repos/{owner}/{repository}/contents{path}";

    function GithubNote(owner, repository) {
      this.owner = owner;
      this.repository = repository;
    }

    GithubNote.getUrlQuery = function() {
      var data, hash, i, j, queries, ref, url;
      url = window.location.search;
      hash = url.slice(1).split('&');
      queries = [];
      for (i = j = 0, ref = hash.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        data = hash[i].split('=');
        queries.push(data[0]);
        queries[data[0]] = data[1];
      }
      return queries;
    };

    GithubNote.getMarkdown = function(filename, callback) {};

    GithubNote.get = function(url, callback) {
      var request;
      request = new XMLHttpRequest();
      request.open('get', url);
      request.onload = callback;
      return request.send(null);
    };

    return GithubNote;

  })();

}).call(this);

(function() {
  var Mokuji;

  Mokuji = (function() {
    function Mokuji() {}

    Mokuji.run = function(first, last) {
      var div, heading, headings, i, j, k, len, level, line, query, ref, ref1, ul;
      div = document.getElementById('mokuji');
      query = "";
      for (i = j = ref = first, ref1 = last; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
        if (i === first) {
          query += 'h' + i;
        } else {
          query += ',h' + i;
        }
      }
      headings = document.querySelectorAll(query);
      ul = document.createElement('ul');
      for (k = 0, len = headings.length; k < len; k++) {
        heading = headings[k];
        heading.id = encodeURIComponent(heading.innerText.replace(/\n+$/g, ''));
        level = parseInt(heading.tagName.charAt(1));
        line = document.createElement('li');
        line.setAttribute('class', "mokuji" + level);
        a.innerText = heading.innerText.replace(/\n+$/g, '');
        line.appendChild(a);
        ul.appendChild(line);
      }
      return div.appendChild(ul);
    };

    return Mokuji;

  })();

}).call(this);
