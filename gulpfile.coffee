require('coffee-loader')
coffee = require('gulp-coffee')
coffeelint = require('gulp-coffeelint')
coffeelintThreshold = require('gulp-coffeelint-threshold')
contains = require('gulp-contains')
del = require('del')
gulp = require('gulp')
gulpUtil = require('gulp-util')
jasmine = require('gulp-jasmine')
SpecReporter = require('jasmine-spec-reporter')
karma = require('karma')
path = require('path')
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

buildBrowser = ->
	destination = webpackConfig.output.path
	del.sync(["#{destination}/**", "!#{destination}"])

	gulp.src(webpackConfig.entry.app)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(destination))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest(destination))

buildNode = ->
	destination = path.join(__dirname, 'dist', 'node')
	del.sync(["#{destination}/**", "!#{destination}"])

	gulp.src(path.join(__dirname, 'src', '**/*.coffee'))
		.pipe(coffee({ bare: true }).on('error', gulpUtil.log))
		.pipe(gulp.dest(destination))

lint = ->
	gulp.src(['./**/*.coffee', 'gulpfile.coffee', '!./dist/**/*', '!./node_modules/**/*'])
		.pipe(contains({
			search: WARNINGS_LIST
			onFound: handleFoundString
		}))
		.pipe(coffeelint('./coffeelint.json'))
		.pipe(coffeelint.reporter())
		.pipe(coffeelintThreshold(0, 0, printWarningsAndErrors))

testNode = ->
	gulp.src(['./spec/**/*.spec.coffee'])
		.pipe(jasmine({ reporter: new SpecReporter() }))

testBrowser = (done) ->
	new karma.Server({
		configFile: __dirname + '/karma.conf.js'
		singleRun: true
	}, done).start()

gulp.task('default', ['build'])
gulp.task('build', ['lint', 'build:browser', 'build:node'])
gulp.task('build:browser', buildBrowser)
gulp.task('build:node', buildNode)
gulp.task('watch', ->
	gulp.watch('./src/*', ['build'])
	gulp.watch(['./src/*', './spec/*'], ['test:node'])
)
gulp.task('lint', lint)
gulp.task('test:browser', testBrowser)
gulp.task('test:node', testNode)
gulp.task('test', ['test:browser', 'test:node'])
