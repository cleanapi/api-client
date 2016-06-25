WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Asset extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/assets'

	createUpload: createEndpoint({
		method: HTTP.POST
		path: '/uploads'
	})

module.exports = Asset
