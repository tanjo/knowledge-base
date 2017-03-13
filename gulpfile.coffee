gulp = require 'gulp'
coffee = require 'gulp-coffee'
plumber = require 'gulp-plumber'
concat = require 'gulp-concat'
sass = require 'gulp-sass'
browserify = require 'browserify'
source = require 'vinyl-source-stream'

gulp.task 'coffee', ->
  browserify
      entries: ['./_src/main.coffee']
      extensions: ['.coffee']
    .transform 'coffeeify'
    .bundle()
    .pipe plumber()
    .pipe source 'main.js'
    .pipe gulp.dest './_bin'

gulp.task 'sass', ->
  gulp.src './_src/*.scss'
    .pipe plumber()
    .pipe sass()
    .pipe concat 'main.css'
    .pipe gulp.dest './_bin'

gulp.task 'watch', ->
  gulp.watch './_src/*.coffee', ['coffee']
  gulp.watch './_src/*.scss', ['sass']

gulp.task 'default', ['coffee', 'sass', 'watch']
