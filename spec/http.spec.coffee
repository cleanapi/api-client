require('isomorphic-fetch')
fetchMock = require('fetch-mock')
http = require('../src/http')

describe('http', ->
	beforeEach(->
		fetchMock
			.mock('https://api.wrap.co/api/wraps?page=1', 'GET', [])
	)

	afterEach(->
		fetchMock.restore()
	)

	it('requests should include a query string when a search hash is provided', (done) ->
		http.get('https://api.wrap.co/api/wraps', { search: { page: 1 } })
			.then(->
				expect(fetchMock.called('https://api.wrap.co/api/wraps?page=1')).toBe(true)
				done()
			)
	)
)
