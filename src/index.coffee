WrapClient = require('./wrapClient')
if window?
	window.Wrap = WrapClient
else if process?
	module.exports = WrapClient
