require('isomorphic-fetch')
fetchMock = require('fetch-mock')
http = require('../src/http')

BASE_PATH = 'https://api.wrap.co/api'

describe('http', ->

	describe('GET requests', ->
		afterEach(->
			fetchMock.restore()
		)

		it('should include a query string when a search hash is provided', (done) ->
			fetchMock.mock(BASE_PATH + '/wraps?page=1&page_size=20', 'GET', [])

			http.get(BASE_PATH + '/wraps', { search: { page: 1, page_size: 20 } })
				.then(->
					expect(fetchMock.called(BASE_PATH + '/wraps?page=1&page_size=20')).toBe(true)
					done()
				)
		)
	)

	describe('responses with non 2xx status codes', ->
		beforeEach(->
			fetchMock.mock(BASE_PATH + '/wraps/009DF38D-4000-4353-9D25-0E4099418FEC', 'GET', {
				status: 404
				body: {}
			})
		)

		afterEach(->
			fetchMock.restore()
		)

		it('should not resolve', (done) ->
			http.get(BASE_PATH + '/wraps/009DF38D-4000-4353-9D25-0E4099418FEC')
				.then(-> done.fail('Promise should not be resolved'))
				.catch((error) -> done())
		)

		it('should be rejected with the response status text as the error message', (done) ->
			http.get(BASE_PATH + '/wraps/009DF38D-4000-4353-9D25-0E4099418FEC')
				.catch((error) ->
					expect(error.message).toBe('Not Found')
					done()
				)
		)
	)
)
