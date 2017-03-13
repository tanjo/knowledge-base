(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Github;

Github = (function() {
  function Github() {}

  Github.BASE_URL = "https://api.github.com/";

  Github.CONTENTS_PATH = "repos/{owner}/{repository}/contents{path}";

  Github.getContents = function(params, callback) {
    var request, url;
    if (!((params.owner != null) || (params.repository != null))) {
      console.log("It's necessary for " + "using Github.getContents method to" + " must have `owner` and `repository` parameters.");
      return;
    }
    if (params.path == null) {
      params.path = "/";
    }
    url = this.BASE_URL + this.CONTENTS_PATH;
    url = url.replace("{owner}", params.owner).replace("{repository}", params.repository).replace("{path}", params.path);
    request = new XMLHttpRequest();
    request.open('GET', url);
    if (typeof callback === 'function') {
      request.onload = callback;
    }
    request.send(null);
  };

  Github.explorer = function(params, callback) {
    return Github.getContents(params, function() {
      var data, i, json, len, result;
      json = JSON.parse(this.responseText);
      result = {};
      if (Array.isArray(json)) {
        for (i = 0, len = json.length; i < len; i++) {
          data = json[i];
          Github.manageJSON(params, data, function(value) {
            result[data.name] = value;
            if (Object.keys(result) === json.length) {
              return callback(result);
            }
          });
        }
      }
    });
  };

  Github.manageJSON = function(params, data, callback) {
    var p;
    if (Github.isFile(data)) {
      callback(Github.makeText(params.prefix, data));
    } else if (Github.isDir(data)) {
      p = params;
      if (p.prefix == null) {
        p.prefix = "";
      }
      p.prefix += "  ";
      p.path += "" + p.path + data.path + "/";
      Github.explorer(p, function(value) {
        return callback(Github.makeText(params.prefix, data) + value);
      });
    }
  };

  Github.makeText = function(data, prefix) {
    if (prefix == null) {
      prefix = "";
    }
    return prefix + "[" + data.name + "](" + data.html_url + ")\n\n";
  };

  Github.isFile = function(data) {
    return data.type === 'file' && data.name.indexOf('.md') !== -1;
  };

  Github.isDir = function(data) {
    return data.type === 'dir' && data.name.indexOf('_') === -1;
  };

  Github.onload = function(owner, repository, urlQuery, callback) {
    if (urlQuery.q == null) {
      urlQuery.q = "/";
    }
    Github.explorer({
      owner: owner,
      repository: repository,
      path: urlQuery.q,
      prefix: "- "
    }, function(result) {
      document.getElementById('content').innerHTML = marked(result);
      callback();
    });
  };

  return Github;

})();

module.exports = Github;


},{}],2:[function(require,module,exports){
var Github, Mokuji, Utility;

Mokuji = require('./mokuji.coffee');

Github = require('./github.coffee');

Utility = require('./utility.coffee');

window.onload = function() {
  Github.onload("tanjo", "til", Utility.getUrlQuery(), function() {
    var mokuji;
    mokuji = document.getElementById('mokuji');
    if (mokuji != null) {
      Mokuji.run(parseInt(mokuji.getAttribute('first')), parseInt(mokuji.getAttribute('last')));
    }
  });
};


},{"./github.coffee":1,"./mokuji.coffee":3,"./utility.coffee":4}],3:[function(require,module,exports){
var Mokuji;

Mokuji = (function() {
  function Mokuji() {}

  Mokuji.run = function(first, last) {
    var a, div, heading, headings, i, j, k, len, level, line, query, ref, ref1, ul;
    div = document.getElementById('mokuji');
    if (div == null) {
      return;
    }
    query = "";
    for (i = j = ref = first, ref1 = last; j <= ref1; i = j += 1) {
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
      a = document.createElement('a');
      a.setAttribute('href', '#' + heading.id);
      a.innerText = heading.innerText.replace(/\n+$/g, '');
      line.appendChild(a);
      ul.appendChild(line);
    }
    return div.appendChild(ul);
  };

  return Mokuji;

})();

module.exports = Mokuji;


},{}],4:[function(require,module,exports){
var Utility;

Utility = (function() {
  function Utility() {}

  Utility.getUrlQuery = function() {
    var data, h, hash, i, len, queries, url;
    url = window.location.search;
    hash = url.slice(1).split('&');
    queries = [];
    for (i = 0, len = hash.length; i < len; i++) {
      h = hash[i];
      data = h.split('=');
      queries.push(data[0]);
      queries[data[0]] = data[1];
    }
    return queries;
  };

  return Utility;

})();

module.exports = Utility;


},{}]},{},[2]);
