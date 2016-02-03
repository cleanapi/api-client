WrapClient = require('./wrapClient')
constants = require('./constants')

class WrapClientFactory
	createClient: (url = constants.PRODUCTION_API_URL) ->
		return new WrapClient(url)

module.exports = WrapClientFactory
