require('isomorphic-fetch')
keys = require('lodash/keys')
HTTP = require('./constants').HTTP_METHODS
MIME_TYPE = require('./constants').MIME_TYPES
includes = require('lodash/includes')


formatQueryString = (parameters = {}) ->
	callback = (key) ->
		if parameters[key] != undefined
			return "#{encodeURIComponent(key)}=#{encodeURIComponent(parameters[key])}"

	return "?#{keys(parameters).map(callback).join('&')}"

parseBody = (response) ->
	contentType = response.headers.get('Content-Type')

	if includes(contentType, MIME_TYPE.JSON)
		parsePromise = response.json()
	else if includes(contentType, MIME_TYPE.HTML) || includes(contentType, MIME_TYPE.TEXT)
		parsePromise = response.text()
	else
		parsePromise = Promise.resolve()

	return Promise.all([response, parsePromise])

checkForSuccess = ([response, parsedBody]) ->
	if response.status >= 200 && response.status < 300
		return [response, parsedBody]
	else
		error = new Error(response.statusText)
		error.response = parsedBody
		throw error

checkForAccepted = (authHeader, statusUrl) ->
	return ([response, parsedBody]) ->
		if response.status == 202
			return queryJobStatus(parsedBody.status_url || statusUrl, authHeader)
		else
			return parsedBody

delay = (duration) ->
	return new Promise((resolve) ->
		setTimeout(resolve, duration)
	)

queryJobStatus = (statusUrl, authHeader) ->
	options = {
		method: HTTP.GET
		headers: {
			Accepts: MIME_TYPE.JSON
			Authorization: authHeader
		}
	}

	return delay(500)
		.then(-> fetch(statusUrl, options))
		.then(parseBody)
		.then(checkForSuccess)
		.then(checkForAccepted(authHeader, statusUrl))

makeRequest = (method = HTTP.GET, url, options = {}) ->
	options.method = method

	options.headers = options.headers || {}
	options.headers['Accepts'] = MIME_TYPE.JSON

	if options.method != HTTP.GET
		options.headers['Content-Type'] = MIME_TYPE.JSON

		if options.body
			options.body = JSON.stringify(options.body)

	if options.search
		url += formatQueryString(options.search)
		delete options.search

	return fetch(url, options)
		.then(parseBody)
		.then(checkForSuccess)
		.then(checkForAccepted(options.headers.Authorization))

http = {
	get: (url, options) -> makeRequest(HTTP.GET, url, options)
	post: (url, options) -> makeRequest(HTTP.POST, url, options)
	put: (url, options) -> makeRequest(HTTP.PUT, url, options)
	delete: (url, options) -> makeRequest(HTTP.DELETE, url, options)
}

module.exports = http
