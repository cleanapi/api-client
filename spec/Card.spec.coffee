require('isomorphic-fetch')
fetchMock = require('fetch-mock')
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

	afterEach(fetchMock.restore)

	describe('list', ->
		beforeEach(->
			fetchMock.mock(requestUrl, 'GET', '[]')
		)

		it('should have the correct URL', (done) ->
			card.list()
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			card.list()
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request with tags', (done) ->
			requestUrl += '?tags=test1%2Ctest2'
			fetchMock.mock(requestUrl, 'GET', '[]')
			
			body = { tags: 'test1,test2' }
			card.list(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request with search', (done) ->
			requestUrl += '?search=test1%2Ctest2'
			fetchMock.mock(requestUrl, 'GET', '[]')
			
			body = { search: 'test1,test2' }
			card.list(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request with search', (done) ->
			requestUrl += '?template_card_id=9d467496-69c4-486d-ba12-511857258f6a%2C9d467496-69c4-486d-ba12-511857258f6b'
			fetchMock.mock(requestUrl, 'GET', '[]')
			
			body = { template_card_id: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b' }
			card.list(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('get', ->
		beforeEach(->
			requestUrl += "/#{cardId}"
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have the correct URL', (done) ->
			card.get(cardId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			card.get(cardId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('clone', ->
		body = {
			collection_id: '9d467496-69c4-486d-ba12-511857258f6a'
			tags: 'test1,test2'
			mapping: {
				test: 'test2'
				test1: 'test3'
				card_name: 'test4'
			}
			data: {
				test2: 'test23'
				test3: 'test34'
				test4: 'test45'
			}
		}

		beforeEach(->
			requestUrl += "/#{cardId}/clone"
			fetchMock.mock(requestUrl, 'POST', '{}')
		)

		it('should have the correct URL', (done) ->
			card.clone(cardId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a POST request', (done) ->
			card.clone(cardId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			card.clone(cardId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('batchClone', ->
		body = {
			collection_id: '9d467496-69c4-486d-ba12-511857258f6a'
			tags: 'test1,test2'
			mapping: {
				test: 'test2'
				test1: 'test3'
				card_name: 'test4'
			}
			data: 'test2, test3, test4
					test23, test34, test45'
		}

		beforeEach(->
			requestUrl += "/#{cardId}/batch_clone"
			fetchMock.mock(requestUrl, 'POST', '{}')
		)

		it('should have the correct URL', (done) ->
			card.batchClone(cardId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a POST request', (done) ->
			card.batchClone(cardId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body with data', (done) ->
			card.batchClone(cardId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body with data url', (done) ->
			body2 = {
				collection_id: '9d467496-69c4-486d-ba12-511857258f6a'
				tags: 'test1,test2'
				mapping: {
					test: 'test2'
					test1: 'test3'
					card_name: 'test4'
				}
				data_url: 'http://example.com'
			}
			card.batchClone(cardId, body2)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body2))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('delete', ->
		beforeEach(->
			requestUrl += "/#{cardId}"
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have the correct URL', (done) ->
			card.delete(cardId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a DELETE request', (done) ->
			card.delete(cardId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('batchDelete', ->
		body = { card_ids: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b' }

		beforeEach(->
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have the correct URL', (done) ->
			card.batchDelete(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a DELETE request', (done) ->
			card.batchDelete(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body with card ids', (done) ->
			card.batchDelete(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body with tags', (done) ->
			body2 = { tags: 'test1,test2' }
			card.batchDelete(body2)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body2))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('collectionSearch', ->
		body = { name: 'name2' }

		beforeEach(->
			requestUrl += '/collections/search?name=name2'
			fetchMock.mock(requestUrl, 'GET', '[]')
		)

		it('should have the correct URL', (done) ->
			card.collectionSearch(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a collection search request with name', (done) ->
			card.collectionSearch(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)

		it('should send a collection search request with collection id', (done) ->
			requestUrl2 = "#{BASE_URL}/cards/collections/search?card_collection_ids=9d467496-69c4-486d-ba12-511857258f6a%2C9d467496-69c4-486d-ba12-511857258f6b"
			fetchMock.mock(requestUrl2, 'GET', '[]')
			
			body2 = { card_collection_ids: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b' }
			card.collectionSearch(body2)
				.then(->
					expect(fetchMock.lastOptions(requestUrl2).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)
)
