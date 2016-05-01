WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Card extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/cards'

	list: createEndpoint({
		method: HTTP.GET
	})

	get: createEndpoint({
		method: HTTP.GET
		path: '/{id}'
		urlParams: ['id']
	})

	clone: createEndpoint({
		method: HTTP.POST
		path: '/{id}/clone'
		urlParams: ['id']
	})

	batchClone: createEndpoint({
		method: HTTP.POST
		path: '/{id}/batch_clone'
		urlParams: ['id']
	})

	delete: createEndpoint({
		method: HTTP.DELETE
		path: '/{id}'
		urlParams: ['id']
	})

	batchDelete: createEndpoint({
		method: HTTP.DELETE
	})

	collectionSearch: createEndpoint({
		method: HTTP.GET
		path: '/collections/search'
	})

module.exports = Card
