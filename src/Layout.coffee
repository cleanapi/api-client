WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Layout extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/layouts'

	get: createEndpoint({
		method: HTTP.GET
		path: '/{id}'
		urlParams: ['id']
	})

module.exports = Layout
