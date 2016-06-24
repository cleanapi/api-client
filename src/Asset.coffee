WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Asset extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/assets'

	upload: createEndpoint({
		method: HTTP.POST
		path: '/upload'
	})

module.exports = Asset
