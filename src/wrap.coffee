http = require('./http')

class Wrap
	constructor: (resource, @_client) ->
		Object.assign(@, resource)
		@_wrapUrl = "#{@_client.baseUrl}/wraps/#{@id}"

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
		return http.post("#{@_wrapUrl}/personalize", {
			headers: @_client.getAuthHeader()
			body
		})

	listPersonalized: (search) ->
		return http.get("#{@_wrapUrl}/personalize", {
			headers: @_client.getAuthHeader()
			search
		})

	createPersonalized: (schemaMap, tags) ->
		@_client.getWrap(@id, { published: true })
			.then((publishedWrap) =>
				cards = @_convertSchemaMapToCards(schemaMap)
				cards = @_assignTargetIds(cards, publishedWrap.cards)
				schemaMap = @_convertCardsToSchemaMap(cards)
				body = {
					personalized_json: schemaMap
					tags
				}
				return @_createPersonalizedWrap(body)
			)

	deletePersonalized: (id) ->
		return http.delete("#{@_wrapUrl}/personalize/#{id}", { headers: @_client.getAuthHeader() })

module.exports = Wrap
