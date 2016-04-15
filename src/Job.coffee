WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Job extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/jobs'

	status: createEndpoint({
		method: HTTP.GET
		path: '/status'
	})

module.exports = Job
