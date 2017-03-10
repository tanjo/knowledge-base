gulp = require 'gulp'
coffee = require 'gulp-coffee'
plumber = require 'gulp-plumber'
concat = require 'gulp-concat'

gulp.task 'coffee', ->
  gulp.src  './_src/*.coffee'
    .pipe plumber()
    .pipe coffee()
    .pipe concat 'main.js'
    .pipe gulp.dest './bin'

gulp.task 'watch', ->
  gulp.watch './_src/*.coffee', ['coffee']

gulp.task 'default', ['coffee', 'watch']
