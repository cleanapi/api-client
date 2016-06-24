WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Asset extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/'

	upload: createEndpoint({
		method: HTTP.POST
		path: '/assets/upload'
	})

	create: createEndpoint({
		method: HTTP.POST
		path: '/teams/{teamId}/wraps/{wrapId}/assets'
		urlParams: ['teamId', 'wrapId']
	})

module.exports = Asset
