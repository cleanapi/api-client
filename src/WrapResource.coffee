wrapFetch = require('./wrapFetch')
HTTP = require('./constants').HTTP_METHODS
isObject = require('lodash/isObject')


class WrapResource
	constructor: (@_client) ->

	_getUrl: (path) -> @_client.baseUrl + @resourcePath + (path || '')

	_getAuthHeader: -> { Authorization: "Bearer #{@_client.apiKey}" }


WrapResource.createEndpoint = (spec) ->
	method = spec?.method || HTTP.GET
	urlParams = spec?.urlParams || []

	return ->
		args = [].slice.call(arguments)
		url = @_getUrl(spec?.path)

		# expand params in url
		while urlParams?.length
			param = urlParams.shift()
			arg = args.shift()
			url = url.replace("{#{param}}", arg)

		options = { headers: @_getAuthHeader() }

		params = args.shift()
		if isObject(params)
			if method == HTTP.GET
				options.search = params
			else
				options.body = params

		method = method.toLowerCase()
		return wrapFetch[method](url, options)


module.exports = WrapResource
