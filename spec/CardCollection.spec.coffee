require('isomorphic-fetch')
fetchMock = require('fetch-mock')
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

CardCollection = require('../src/CardCollection')

requestUrl = null
cardCollection = null
cardCollectionId = '6EF60AA5-0541-408B-B9B5-B202485445F6'
clientStub = {
	apiKey: API_KEY
	baseUrl: BASE_URL
}


describe('CardCollection', ->
	beforeEach(->
		requestUrl = "#{BASE_URL}/card_collections"
		cardCollection = new CardCollection(clientStub)
	)

	afterEach(->
		fetchMock.restore()
	)

	describe('create', ->
		body = { name: 'myCardCollection' }

		beforeEach(->
			fetchMock.mock(requestUrl, 'POST', '[]')
		)

		it('should have a correctly configured fetch request', (done) ->
			cardCollection.create(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('list', ->
		beforeEach(->
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			cardCollection.list()
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('get', ->
		beforeEach(->
			requestUrl += "/#{cardCollectionId}"
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			cardCollection.get(cardCollectionId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('update', ->
		body = { name: 'myNewCardCollectionName' }

		beforeEach(->
			requestUrl += "/#{cardCollectionId}"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			cardCollection.update(cardCollectionId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('delete', ->
		beforeEach(->
			requestUrl += "/#{cardCollectionId}"
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have a correctly configured fetch request', (done) ->
			cardCollection.delete(cardCollectionId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(done.fail)
		)
	)
)
