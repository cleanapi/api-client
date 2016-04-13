constants = require('./constants')
http = require('./http')
Wrap = require('./wrap')

class WrapClient
	constructor: (@apiKey, @baseUrl = constants.PRODUCTION_API_URL) ->

	getAuthHeader: -> { 'Authorization': "Bearer #{@apiKey}" }

	listWraps: (search) ->
		return http.get("#{@baseUrl}/wraps", {
			headers: @getAuthHeader()
			search
		}).then((wraps) =>
			return wraps.map((wrap) => new Wrap(wrap, @))
		)

	getWrap: (wrapId, search) ->
		return http.get("#{@baseUrl}/wraps/#{wrapId}", {
			headers: @getAuthHeader()
			search
		}).then((wrap) => new Wrap(wrap, @))

module.exports = WrapClient
