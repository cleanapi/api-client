assign = require('lodash/assign')
fetch = require('isomorphic-fetch')
keys = require('lodash/keys')
methods = require('./constants').HTTP_METHODS


formatQueryString = (parameters = {}) ->
	callback = (key) ->
		if parameters[key] != undefined
			return "#{encodeURIComponent(key)}=#{encodeURIComponent(parameters[key])}"
	return "?#{keys(parameters).map(callback).join('&')}"

isNullBodyStatus = (status) ->
	return status == 101 || status == 204 || status == 205 || status == 304

parseJson = (response) ->
	if !isNullBodyStatus(response.status)
		return response.json()

checkStatus = (response) ->
	if response.status >= 200 && response.status < 300
		return response
	else
		error = new Error(response.statusText)
		error.response = response
		throw error

makeRequest = (method = 'GET', url, options = {}) ->
	options.method = method

	if options.method != methods.GET
		options.headers = options.headers || {}
		assign(options.headers, {
			'Accepts': 'application/json'
			'Content-Type': 'application/json'
		})

		if options.body
			options.body = JSON.stringify(options.body)

	if options.search
		url += formatQueryString(options.search)
		delete options.search

	return fetch(url, options)
		.then(checkStatus)
		.then(parseJson)

http = {
	get: (url, options) -> makeRequest(methods.GET, url, options)
	post: (url, options) -> makeRequest(methods.POST, url, options)
	put: (url, options) -> makeRequest(methods.PUT, url, options)
	delete: (url, options) -> makeRequest(methods.DELETE, url, options)
}

module.exports = http
