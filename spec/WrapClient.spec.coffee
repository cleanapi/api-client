require('isomorphic-fetch')
fetchMock = require('fetch-mock')
WrapClient = require('../src/wrapClient')
Wrap = require('../src/Wrap')
HTTP = require('../src/constants').HTTP_METHODS
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

describe('WrapClient', ->
	client = null

	beforeEach(->
		client = new WrapClient(API_KEY)
	)

	describe('#listWraps', ->
		url = BASE_URL + '/wraps'

		beforeEach(->
			fetchMock.mock(url, 'GET', {
				status: 200
				body: [{ id: 0 }]
			})
		)

		afterEach(fetchMock.restore)

		it('should have the correct URL', (done) ->
			client.listWraps()
				.then(->
					expect(fetchMock.lastUrl(url)).toEqual(url)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			client.listWraps()
				.then(->
					expect(fetchMock.lastOptions(url).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
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
		url = BASE_URL + "/wraps/#{wrapId}"

		beforeEach(->
			fetchMock.mock(url, 'GET', {
				status: 200
				body: { id: 0 }
			})
		)

		afterEach(->
			fetchMock.restore()
		)

		it('should have the correct URL', (done) ->
			client.getWrap(wrapId)
				.then(->
					expect(fetchMock.lastUrl(url)).toEqual(url)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			client.getWrap(wrapId)
				.then(->
					expect(fetchMock.lastOptions(url).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
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
