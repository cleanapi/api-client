http = (url, headers) ->
	core = {}

	core.ajax = (method, url, args, headers) ->
		return new Promise((resolve, reject) ->
			client = new XMLHttpRequest()
			uri = url

			if (args && method == 'GET')
				uri += '?'
				argcount = 0
				for key of args
					if (argcount++)
						uri += '&'
					uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key])

			client.open(method, uri)

			for name, value of headers
				client.setRequestHeader(name, value)

			if args && (method == 'POST' || method == 'PUT')
				client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
				body = JSON.stringify(args)

			client.send(body)

			client.onload = ->
				if (this.status >= 200 && this.status < 400)
					try
						resolve(JSON.parse(this.response))
					catch
						resolve(this.response)
				else
					reject(this.statusText)

			client.onerror = ->
				reject(this.statusText)

		)

	return {
		'get': (args) -> core.ajax('GET', url, args, headers)
		'post': (args) -> core.ajax('POST', url, args, headers)
		'put': (args) -> core.ajax('PUT', url, args, headers)
		'delete': (args) -> core.ajax('DELETE', url, args, headers)
	}

module.exports = http
