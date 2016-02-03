http = require('./http')

class Wrap
	constructor: (resource, @_client) ->
		Object.assign(@, resource)

	_createCardMap: (sourceCards, targetCards) ->
		cardMap = {}
		sourceCards.forEach((card, index) -> cardMap[card.id] = targetCards[index].id)
		return cardMap

	_convertSchemaMapToCards: (schemaMap) ->
		for id, schema of schemaMap
			{ id, schema }

	_assignTargetIds: (sourceCards, targetCards) ->
		cardMap = @_createCardMap(sourceCards, targetCards)
		for card in sourceCards
			card.id = cardMap[card.id]
		return sourceCards

	_convertCardsToSchemaMap: (cards) ->
		cardMap = {}
		cards.forEach((card, index) -> cardMap[card.id] = card.schema)
		return cardMap

	_createPersonalizedWrap: (body) ->
		return http("#{@_client.baseUrl}/wraps/#{@id}/personalize", @_client.getAuthHeader()).post(body)

	personalize: (schemaMap) ->
		@_client.getWrap(@id, { published: true })
			.then((publishedWrap) =>
				cards = @_convertSchemaMapToCards(schemaMap)
				cards = @_assignTargetIds(cards, publishedWrap.cards)
				schemaMap = @_convertCardsToSchemaMap(cards)
				return @_createPersonalizedWrap({ personalized_json: schemaMap })
			)

module.exports = Wrap
