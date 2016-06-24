constants = require('./constants')
Asset = require('./Asset')
Card = require('./Card')
CardCollection = require('./CardCollection')
Component = require('./Component')
Job = require('./Job')
Layout = require('./Layout')
Wrap = require('./wrap')
Widget = require('./Widget')

class WrapClient
	constructor: (@apiKey, @baseUrl = constants.PRODUCTION_API_URL) ->
		@assets = new Asset(@)
		@cards = new Card(@)
		@cardCollections = new CardCollection(@)
		@components = new Component(@)
		@jobs = new Job(@)
		@layouts = new Layout(@)
		@wraps = new Wrap(@)
		@widgets = new Widget(@)

module.exports = WrapClient
