WrapResource = require('./WrapResource')
createEndpoint = WrapResource.createEndpoint
HTTP = require('./constants').HTTP_METHODS

class Wrap extends WrapResource
	constructor: (@_client) ->
		@resourcePath = '/wraps'

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

	delete: createEndpoint({
		method: HTTP.DELETE
		path: '/{id}'
		urlParams: ['id']
	})

	publish: createEndpoint({
		method: HTTP.PUT
		path: '/{id}/publish'
		urlParams: ['id']
	})

	rename: createEndpoint({
		method: HTTP.PUT
		path: '/{id}/rename'
		urlParams: ['id']
	})

	share: createEndpoint({
		method: HTTP.POST
		path: '/{id}/share'
		urlParams: ['id']
	})

	insertCards: createEndpoint({
		method: HTTP.PUT
		path: '/{id}/insert_cards'
		urlParams: ['id']
	})

	deleteCards: createEndpoint({
		method: HTTP.PUT
		path: '/{id}/delete_cards'
		urlParams: ['id']
	})

	replaceCard: createEndpoint({
		method: HTTP.PUT
		path: '/{id}/replace_card'
		urlParams: ['id']
	})

	setCards: createEndpoint({
		method: HTTP.PUT
		path: '/{id}/set_cards'
		urlParams: ['id']
	})

	createPersonalized: createEndpoint({
		method: HTTP.POST
		path: '/{id}/personalize/v2'
		urlParams: ['id']
	})

	listPersonalizedV1: createEndpoint({
		method: HTTP.GET
		path: '/{id}/personalize'
		urlParams: ['id']
	})

	listPersonalized: createEndpoint({
		method: HTTP.GET
		path: '/{id}/personalize/v2'
		urlParams: ['id']
	})

	deletePersonalized: createEndpoint({
		method: HTTP.DELETE
		path: '/{id}/personalize'
		urlParams: ['id']
	})

module.exports = Wrap
