path = require('path')
module.exports = {
	cache: true
	entry: {
		app: path.join(__dirname, 'src', 'index.coffee')
	}
	output: {
		path: path.join(__dirname, 'dist')
		filename: 'wrap-client.js'
	}
	module: {
		loaders: [
			{ test: /\.coffee$/, loaders: ['coffee-loader'] }
		]
	}
	resolve: {
		root: __dirname
		extensions: ['', '.js', '.coffee']
		modulesDirectories: ['.', 'src']
	}
}
