WrapClientFactory = require('./wrapClientFactory')
if window?
	window.Wrap = new WrapClientFactory()
else if process?
	module.exports = new WrapClientFactory()
