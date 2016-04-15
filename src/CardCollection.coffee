WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Card extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/card_collections'

	create: createEndpoint({
		method: HTTP.POST
	})

	list: createEndpoint({
		method: HTTP.GET
	})

	get: createEndpoint({
		method: HTTP.GET
		path: '/{id}'
		urlParams: ['id']
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

module.exports = Card
