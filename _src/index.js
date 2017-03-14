var fs = require('fs');

var main = function(argc, argv) {
  var readme = fs.readFile('./README.md', 'utf8', function(error, data) {
    if (error) {
      throw error;
    }
    var readme = data.replace(/## Contents\n[\s\S]*/, "## Contents\n\n" + explorer('.'));
    console.log('Finish!');
    console.log('-------------------');
    console.log(readme);
    console.log('-------------------');
  });
};

var manageFiles = function(files, path, prefix) {
  var result = '';
  if (!prefix) {
    prefix = '';
  }
  files.filter(function(file) {
    return fs.statSync(path + "/" + file).isFile() && !/^\./.test(file);
  }).forEach(function(file) {
    result += prefix + '- [' + file + '](' + path + '/' + file + ')' + '\n';
  });
  return result;
};

var manageDirs = function(dirs, path, prefix) {
  var result = '';
  if (!prefix) {
    prefix = '';
  }
  dirs.filter(function(dir) {
    return fs.statSync(path + "/" + dir).isDirectory() && !/^\./.test(dir) && !/^_/.test(dir);
  }).forEach(function(dir) {
    result += prefix + '- ' + dir + '\n' + explorer(path + '/' + dir, "  " + prefix);
  });
  return result;
};

var explorer = function(path, prefix) {
  var files = fs.readdirSync(path);
  var result = manageFiles(files, path, prefix);
  result += manageDirs(files, path, prefix);
  return result;
};

main();
