require('isomorphic-fetch')
fetchMock = require('fetch-mock')
wrapFetch = require('../src/wrapFetch')
BASE_URL = require('./helpers').BASE_URL
MIME_TYPE = require('../src/constants').MIME_TYPES

describe('wrapFetch', ->
	afterEach(fetchMock.restore)

	describe('response bodies', ->
		describe('with a JSON content type', ->
			it('should resolve a valid JSON body', (done) ->
				validJson = '{ "hello": "world" }'

				fetchMock.mock(BASE_URL, {
					headers: { 'content-type': MIME_TYPE.JSON }
					body: validJson
				})

				wrapFetch.get(BASE_URL)
					.then((parsedBody) ->
						expect(parsedBody).toEqual({ hello: 'world' })
						done()
					)
			)

			it('should reject an invalid JSON body', (done) ->
				invalidJson = ''

				fetchMock.mock(BASE_URL, {
					headers: { 'content-type': MIME_TYPE.JSON }
					body: invalidJson
				})

				wrapFetch.get(BASE_URL)
					.catch((error) ->
						expect(error.name).toBe('SyntaxError')
						done()
					)
			)
		)

		describe('with a text content type', ->
			it('should resolve the response body', (done) ->
				fetchMock.mock(BASE_URL, {
					headers: { 'content-type': MIME_TYPE.HTML }
					body: '<p>hello</p>'
				})

				wrapFetch.get(BASE_URL)
					.then((parsedBody) ->
						expect(parsedBody).toEqual('<p>hello</p>')
						done()
					)
			)
		)

		describe('with any other content type', ->
			it('should resolve undefined', (done) ->
				fetchMock.mock(BASE_URL, {
					headers: { 'content-type': 'image/jpeg' }
				})

				wrapFetch.get(BASE_URL)
					.then((parsedBody) ->
						expect(parsedBody).toBe(undefined)
						done()
					)
			)
		)
	)

	describe('202 responses', ->
		beforeEach(->
			fetchMock.mock("#{BASE_URL}/wraps/123/publish", 'POST', {
				status: 202
				headers: { 'content-type': MIME_TYPE.JSON }
				body: { status_url: "#{BASE_URL}/jobs?token=456" }
			})
		)

		it('should query the returned job status URL until it receives non-202', (done) ->
			maxStatusRequest = 2
			currentStatusRequest = 0

			acceptedResponse = {
				status: 202
				headers: { 'content-type': MIME_TYPE.JSON }
				body: { status: 202 }
			}

			okResponse = {
				status: 200
				headers: { 'content-type': MIME_TYPE.JSON }
				body: { published: true }
			}

			fetchMock.mock("#{BASE_URL}/jobs?token=456", (url, opts) ->
				currentStatusRequest++

				if currentStatusRequest == maxStatusRequest
					return okResponse
				else
					return acceptedResponse
			)

			wrapFetch.post("#{BASE_URL}/wraps/123/publish")
				.then((parsedBody) ->
					expect(fetchMock.called("#{BASE_URL}/jobs?token=456")).toBe(true)
					done()
				)
		)
	)

	describe('responses with non 2xx status codes', ->
		beforeEach(->
			fetchMock.mock("#{BASE_URL}/wraps/123", 'GET', {
				status: 404
				headers: { 'content-type': MIME_TYPE.JSON }
				body: { status: 404, message: 'Not Found' }
			})
		)

		it('should not resolve', (done) ->
			wrapFetch.get("#{BASE_URL}/wraps/123")
				.then(-> done.fail('Promise should not be resolved'))
				.catch((error) -> done())
		)

		it('should be rejected with the response status text as the error message', (done) ->
			wrapFetch.get("#{BASE_URL}/wraps/123")
				.catch((error) ->
					expect(error.message).toBe('Not Found')
					done()
				)
		)

		it('should be rejected with the response body as error.response', (done) ->
			wrapFetch.get("#{BASE_URL}/wraps/123")
				.catch((error) ->
					expect(error.response).toEqual({ status: 404, message: 'Not Found' })
					done()
				)
		)
	)

	describe('GET requests', ->
		it('should include a query string when a search hash is provided', (done) ->
			fetchMock.mock("#{BASE_URL}/wraps?page=1&page_size=20", 'GET', [])

			wrapFetch.get(BASE_URL + '/wraps', { search: { page: 1, page_size: 20 } })
				.then(->
					expect(fetchMock.called("#{BASE_URL}/wraps?page=1&page_size=20")).toBe(true)
					done()
				)
		)
	)
)
