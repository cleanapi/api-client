constants = require('./constants')
http = require('http')
Wrap = require('./wrap')

class WrapClient
	constructor: (@baseUrl) ->

	getAuthHeader: -> { 'Authorization': @_authorization }

	authorize: (credentials = {}) ->
		credentials.client_id = constants.CLIENT_ID
		return http("#{@baseUrl}/auth/sign_in").post(credentials)
			.then((response) =>
				@_authorization = response.authorization
				return
			)

	listWraps: (query) ->
		return http("#{@baseUrl}/wraps", @getAuthHeader()).get(query)

	getWrap: (wrapId, query) ->
		return http("#{@baseUrl}/wraps/#{wrapId}", @getAuthHeader()).get(query).then((wrap) => new Wrap(wrap, @))

module.exports = WrapClient
