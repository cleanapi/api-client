require('coffee-loader')
gulp = require('gulp')
rename = require('gulp-rename')
uglify = require('gulp-uglify')
webpack = require('gulp-webpack')
webpackConfig = require('./webpack-config')

build = ->
	gulp.src(webpackConfig.entry.app)
	.pipe(webpack(webpackConfig))
	.pipe(gulp.dest(webpackConfig.output.path))
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest(webpackConfig.output.path))

gulp.task('build', build)
gulp.task('watch', -> gulp.watch('./src/*', build))
