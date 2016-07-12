wrapFetch = require('./wrapFetch')
HTTP = require('./constants').HTTP_METHODS
isObject = require('lodash/isObject')


class WrapResource
	constructor: (@_client) ->

	_getUrl: (path) -> @_client.baseUrl + @resourcePath + (path || '')

	_getAuthHeader: -> { Authorization: "Bearer #{@_client.apiKey}" }


WrapResource.createEndpoint = ({ method = HTTP.GET, path = '', urlParams = [] }) ->
	return (args...) ->
		url = @_getUrl(path)
		# expand params in url
		params = urlParams.slice()
		while params.length
			param = params.shift()
			arg = args.shift()
			url = url.replace("{#{param}}", arg)

		options = { headers: @_getAuthHeader() }

		options.baseUrl = @_client.baseUrl

		body = args.shift()
		if isObject(body)
			if method == HTTP.GET
				options.search = body
			else
				options.body = body

		return wrapFetch[method.toLowerCase()](url, options)


module.exports = WrapResource
