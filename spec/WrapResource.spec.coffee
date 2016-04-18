require('isomorphic-fetch')
fetchMock = require('fetch-mock')
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

WrapResource = require('../src/WrapResource')

clientStub = {
	apiKey: API_KEY
	baseUrl: BASE_URL
}

describe('WrapResource', ->
	resource = null

	beforeEach(->
		resource = new WrapResource(clientStub)
	)

	afterEach(->
		fetchMock.restore()
	)

	describe('createEndpoint', ->
		beforeEach(->
			fetchMock
				.mock('https://api.wrap.co/api/this', '{}')
				.mock('https://api.wrap.co/api/this/123/that/abc', '{}')
				.mock('https://api.wrap.co/api/this?page=3&per_page=20', '[]')
				.mock('https://api.wrap.co/api/this', '{}')
				.mock('https://api.wrap.co/api/this/123?page=4', '{}')

			resource.resourcePath = '/this'
		)

		it('should append resourcePath to the baseUrl', (done) ->
			resource.get = WrapResource.createEndpoint()
			resource.get()
				.then(->
					expect(fetchMock.called('https://api.wrap.co/api/this')).toBe(true)
					done()
				)
				.catch(done.fail)
		)

		it('should expand the urlParams with arguments of matching index', (done) ->
			resource.get = WrapResource.createEndpoint({
				path: '/{thisId}/that/{thatId}'
				urlParams: ['thisId', 'thatId']
			})
			resource.get(123, 'abc')
				.then(->
					expect(fetchMock.called('https://api.wrap.co/api/this/123/that/abc')).toBe(true)
					done()
				)
				.catch(done.fail)
		)

		describe('with arguments exceeding url parameterization', ->
			it('should create a query string for GET requests', (done) ->
				resource.get = WrapResource.createEndpoint()
				resource.get({
					page: 3
					per_page: 20
				})
					.then(->
						expect(fetchMock.called('https://api.wrap.co/api/this?page=3&per_page=20')).toBe(true)
						done()
					)
					.catch(done.fail)
			)

			it('should create a request body for non GET requests', (done) ->
				resource.post = WrapResource.createEndpoint({ method: 'POST' })
				resource.post({ country: 'USA' })
					.then(->
						expect(fetchMock.called('https://api.wrap.co/api/this')).toBe(true)
						expect(fetchMock.lastOptions('https://api.wrap.co/api/this').body).toEqual(JSON.stringify({ country: 'USA' }))
						done()
					)
					.catch(done.fail)
			)

			it('should use the initial argument for parameterization and the final argument for query/body', (done) ->
				resource.get = WrapResource.createEndpoint({
					path: '/{thisId}'
					urlParams: ['thisId']
				})
				resource.get(123, { page: 4 })
					.then(->
						expect(fetchMock.called('https://api.wrap.co/api/this/123?page=4')).toBe(true)
						done()
					)
					.catch(done.fail)
			)
		)
	)
)
