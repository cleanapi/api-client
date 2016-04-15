require('isomorphic-fetch')
fetchMock = require('fetch-mock')
fail = require('./helpers').fail
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

Card = require('../src/Card')

requestUrl = null
card = null
cardId = '6EF60AA5-0541-408B-B9B5-B202485445F6'
clientStub = {
	apiKey: API_KEY
	baseUrl: BASE_URL
}


describe('Card', ->
	beforeEach(->
		requestUrl = "#{BASE_URL}/cards"
		card = new Card(clientStub)
	)

	afterEach(->
		fetchMock.restore()
	)

	describe('list', ->
		beforeEach(->
			fetchMock.mock(requestUrl, 'GET', '[]')
		)

		it('should have a correctly configured fetch request', (done) ->
			card.list()
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(fail(done))
		)
	)

	describe('get', ->
		beforeEach(->
			requestUrl += "/#{cardId}"
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			card.get(cardId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(fail(done))
		)
	)

	describe('clone', ->
		body = { collection_id: 0 }

		beforeEach(->
			requestUrl += "/#{cardId}/clone"
			fetchMock.mock(requestUrl, 'POST', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			card.clone(cardId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(fail(done))
		)
	)

	describe('batchClone', ->
		body = { collection_id: 0 }

		beforeEach(->
			requestUrl += "/#{cardId}/batch_clone"
			fetchMock.mock(requestUrl, 'POST', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			card.batchClone(cardId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(fail(done))
		)
	)

	describe('delete', ->
		beforeEach(->
			requestUrl += "/#{cardId}"
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have a correctly configured fetch request', (done) ->
			card.delete(cardId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(fail(done))
		)
	)

	describe('batchDelete', ->
		body = { collection_id: 0 }

		beforeEach(->
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have a correctly configured fetch request', (done) ->
			card.batchDelete(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(fail(done))
		)
	)
)
