constants = require('./constants')
http = require('./http')
Wrap = require('./wrap')

class WrapClient
	constructor: (@baseUrl) ->

	getAuthHeader: -> { 'Authorization': @_authorization }

	authorize: (credentials = {}) ->
		credentials.client_id = constants.CLIENT_ID
		return http.post("#{@baseUrl}/auth/sign_in", { body: credentials })
			.then((response) =>
				@_authorization = response.authorization
				return
			)

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
