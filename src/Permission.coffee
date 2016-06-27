WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Permission extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/permissions'

	list: createEndpoint({
		method: HTTP.GET
	})

module.exports = Permission
