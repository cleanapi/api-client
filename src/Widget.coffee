WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Widget extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/widgets'

	list: createEndpoint({
		method: HTTP.GET
	})

	get: createEndpoint({
		method: HTTP.GET
		path: '/{id}'
		urlParams: ['id']
	})

	create: createEndpoint({
		method: HTTP.POST
	})

	update: createEndpoint({
		method: HTTP.PUT
		path: '/{id}'
		urlParams: ['id']
	})

	delete: createEndpoint({
		method: HTTP.DELETE
		path: '/{id}'
		urlParams: ['id']
	})

module.exports = Widget
