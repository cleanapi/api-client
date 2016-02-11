require('coffee-loader')
coffeelint = require('gulp-coffeelint')
coffeelintThreshold = require('gulp-coffeelint-threshold')
contains = require('gulp-contains')
gulp = require('gulp')
gulpUtil = require('gulp-util')
rename = require('gulp-rename')
uglify = require('gulp-uglify')
webpack = require('gulp-webpack')
webpackConfig = require('./webpack-config')

WARNINGS_LIST = [
	'console.log'
	'console.dir'
	'console.info'
	'console.error'
	'describe.only'
	'it.only'
]

printWarningsAndErrors = (numberOfWarnings, numberOfErrors) ->
	throw Error("CoffeeLint failure; see above. Warning count: #{ numberOfWarnings } . Error count: #{ numberOfErrors }.")

handleFoundString = (string, file, cb) ->
	isGulpfile = (file.relative.indexOf('gulp') != -1)
	if isGulpfile
		return false
	else
		gulpUtil.log(gulpUtil.colors.red("#{string} found on #{file.relative}. Please remove before commiting..."))
		return true

build = ->
	gulp.src(webpackConfig.entry.app)
	.pipe(webpack(webpackConfig))
	.pipe(gulp.dest(webpackConfig.output.path))
	.pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest(webpackConfig.output.path))

lint = ->
	gulp.src(['./**/*.coffee', 'gulpfile.coffee', '!./dist/**/*', '!./node_modules/**/*'])
		.pipe(contains({
			search: WARNINGS_LIST
			onFound: handleFoundString
		}))
		.pipe(coffeelint('./coffeelint.json'))
		.pipe(coffeelint.reporter())
		.pipe(coffeelintThreshold(0, 0, printWarningsAndErrors))

gulp.task('default', build)
gulp.task('watch', -> gulp.watch('./src/*', build))
gulp.task('lint', lint)
