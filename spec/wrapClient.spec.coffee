require('isomorphic-fetch')
fetchMock = require('fetch-mock')
WrapClient = require('../src/wrapClient')
Wrap = require('../src/wrap')
methods = require('../src/constants').HTTP_METHODS
helpers = require('./helpers')

describe('wrapClient', ->
	client = null
	apiKey = helpers.API_KEY
	basePath = helpers.BASE_PATH

	beforeEach(->
		client = new WrapClient(apiKey)
	)

	describe('#listWraps', ->
		url = basePath + '/wraps'

		beforeEach(->
			fetchMock.mock(url, 'GET', {
				status: 200
				body: [{ id: 0 }]
			})
		)

		afterEach(->
			fetchMock.restore()
		)

		it('should have a correctly configured fetch request', (done) ->
			client.listWraps()
				.then(->
					expect(fetchMock.lastUrl(url)).toBe(url)
					expect(fetchMock.lastOptions(url).method).toBe(methods.GET)
					done()
				)
		)

		it('should have Wrap instances in the response', (done) ->
			client.listWraps()
				.then((wraps) ->
					expect(wraps[0] instanceof Wrap).toBe(true)
					done()
				)
		)
	)

	describe('#getWrap', ->
		wrapId = 'ed687f34-a60b-44e5-ae41-73812fb71ca9'
		url = basePath + "/wraps/#{wrapId}"

		beforeEach(->
			fetchMock.mock(url, 'GET', {
				status: 200
				body: { id: 0 }
			})
		)

		afterEach(->
			fetchMock.restore()
		)

		it('should have a correctly configured fetch request', (done) ->
			client.getWrap(wrapId)
				.then(->
					expect(fetchMock.lastUrl(url)).toBe(url)
					expect(fetchMock.lastOptions(url).method).toBe(methods.GET)
					done()
				)
		)

		it('should have a Wrap instance in the response', (done) ->
			client.getWrap(wrapId)
				.then((wrap) ->
					expect(wrap instanceof Wrap).toBe(true)
					done()
				)
		)
	)

)
