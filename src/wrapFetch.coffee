require('isomorphic-fetch')
keys = require('lodash/keys')
HTTP = require('./constants').HTTP_METHODS


formatQueryString = (parameters = {}) ->
	callback = (key) ->
		if parameters[key] != undefined
			return "#{encodeURIComponent(key)}=#{encodeURIComponent(parameters[key])}"
	return "?#{keys(parameters).map(callback).join('&')}"

isNullBodyStatus = (status) ->
	return status == 101 || status == 204 || status == 205 || status == 304

checkJobStatus = (token, baseUrl, authorization, fulfill, reject) ->
	options = {
		method: 'GET'
		headers: {
			Authorization: authorization
			Accepts: 'application/json'
		}
	}
	fetch("#{baseUrl}/jobs/status?token=#{token}", options)
		.then((response) ->
			return response.json()
		)
		.then((response) ->
			jobStatus = response.status
			if jobStatus == 202
				setTimeout(->
					checkJobStatus(token, baseUrl, fulfill, reject)
				, 500)
			else if jobStatus >= 200 && jobStatus < 300
				fulfill(response)
			else
				reject(response)
		)
		.catch((exception) ->
			reject(exception)
		)

parseJson = (response) ->
	if !isNullBodyStatus(response.status)
		return response.json()

checkStatus = (response) ->
	if response.status >= 200 && response.status < 300
		return response
	else if response.headers._headers['content-type'][0].indexOf('json') > -1
		response.json().then((responseJson) ->
			error = new Error(response.statusText)
			error.response = responseJson
			throw error
		)
	else
		error = new Error(response.statusText)
		error.response = response
		throw error

makeRequest = (method = 'GET', url, options = {}) ->
	options.method = method

	options.headers = options.headers || {}
	options.headers['Accepts'] = 'application/json'

	if options.method != HTTP.GET
		options.headers['Content-Type'] = 'application/json'

		if options.body
			options.body = JSON.stringify(options.body)

	if options.search
		url += formatQueryString(options.search)
		delete options.search

	if options.baseUrl
		baseUrl = options.baseUrl
		delete options.baseUrl

	return fetch(url, options)
		.then(checkStatus)
		.then(parseJson)
		.then((response) ->
			if response.token? && baseUrl
				return new Promise((fulfill, reject) ->
					checkJobStatus(response.token, baseUrl, options.headers.Authorization, fulfill, reject)
				)
			else
				return Promise.resolve(response)
		)

http = {
	get: (url, options) -> makeRequest(HTTP.GET, url, options)
	post: (url, options) -> makeRequest(HTTP.POST, url, options)
	put: (url, options) -> makeRequest(HTTP.PUT, url, options)
	delete: (url, options) -> makeRequest(HTTP.DELETE, url, options)
}

module.exports = http
