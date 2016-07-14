constants = require('./constants')
Card = require('./Card')
CardCollection = require('./CardCollection')
Job = require('./Job')
Wrap = require('./Wrap')
Widget = require('./Widget')

class WrapClient
	constructor: (@apiKey, @baseUrl = constants.PRODUCTION_API_URL) ->
		@cards = new Card(@)
		@cardCollections = new CardCollection(@)
		@jobs = new Job(@)
		@wraps = new Wrap(@)
		@widgets = new Widget(@)

module.exports = WrapClient
