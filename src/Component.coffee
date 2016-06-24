WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Component extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/components'

	list: createEndpoint({
		method: HTTP.GET
	})

module.exports = Component
