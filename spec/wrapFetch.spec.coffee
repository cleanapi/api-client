require('isomorphic-fetch')
fetchMock = require('fetch-mock')
wrapFetch = require('../src/wrapFetch')

BASE_URL = 'wrapFetchs://api.wrap.co/api'

describe('wrapFetch', ->
	afterEach(->
		fetchMock.restore()
	)

	describe('GET requests', ->
		it('should include a query string when a search hash is provided', (done) ->
			fetchMock.mock(BASE_URL + '/wraps?page=1&page_size=20', 'GET', [])

			wrapFetch.get(BASE_URL + '/wraps', { search: { page: 1, page_size: 20 } })
				.then(->
					expect(fetchMock.called(BASE_URL + '/wraps?page=1&page_size=20')).toBe(true)
					done()
				)
		)
	)

	describe('responses with non 2xx status codes', ->
		beforeEach(->
			fetchMock.mock(BASE_URL + '/wraps/009DF38D-4000-4353-9D25-0E4099418FEC', 'GET', {
				status: 404
				headers: { 'content-type': 'application/json' }
				body: {}
				throws: { message: 'Not Found' }
			})
		)

		it('should not resolve', (done) ->
			wrapFetch.get(BASE_URL + '/wraps/009DF38D-4000-4353-9D25-0E4099418FEC')
				.then(-> done.fail('Promise should not be resolved'))
				.catch((error) -> done())
		)

		it('should be rejected with the response status text as the error message', (done) ->
			wrapFetch.get(BASE_URL + '/wraps/009DF38D-4000-4353-9D25-0E4099418FEC')
				.catch((error) ->
					expect(error.message).toBe('Not Found')
					done()
				)
		)
	)
)
