WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Team extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/teams'

	createWrap: createEndpoint({
		method: HTTP.POST
		path: '/{id}/wraps'
		urlParams: ['id']
	})

	createAsset: createEndpoint({
		method: HTTP.POST
		path: '/{teamId}/wraps/{wrapId}/assets'
		urlParams: ['teamId', 'wrapId']
	})

module.exports = Team
