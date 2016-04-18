constants = require('./constants')
wrapFetch = require('./wrapFetch')
Wrap = require('./Wrap')
Card = require('./Card')
CardCollection = require('./CardCollection')
Job = require('./Job')

class WrapClient
	constructor: (@apiKey, @baseUrl = constants.PRODUCTION_API_URL) ->
		@cards = new Card(@)
		@cardCollections = new CardCollection(@)
		@jobs = new Job(@)

	getAuthHeader: -> { 'Authorization': "Bearer #{@apiKey}" }

	listWraps: (search) ->
		return wrapFetch.get("#{@baseUrl}/wraps", {
			headers: @getAuthHeader()
			search
		}).then((wraps) =>
			return wraps.map((wrap) => new Wrap(wrap, @))
		)

	getWrap: (wrapId, search) ->
		return wrapFetch.get("#{@baseUrl}/wraps/#{wrapId}", {
			headers: @getAuthHeader()
			search
		}).then((wrap) => new Wrap(wrap, @))

module.exports = WrapClient
