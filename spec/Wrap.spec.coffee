require('isomorphic-fetch')
fetchMock = require('fetch-mock')
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

Wrap = require('../src/Wrap')

requestUrl = null
wrap = null
wrapId = '6EF60AA5-0541-408B-B9B5-B202485445F6'
clientStub = {
	apiKey: API_KEY
	baseUrl: BASE_URL
}


describe('Wrap', ->
	beforeEach(->
		requestUrl = "#{BASE_URL}/wraps"
		wrap = new Wrap(clientStub)
	)

	afterEach(fetchMock.restore)

	describe('list', ->
		beforeEach(->
			fetchMock.mock(requestUrl, 'GET', '[]')
		)

		it('should have the correct URL', (done) ->
			wrap.list()
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			wrap.list()
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('create', ->
		body = { card_ids: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b' }

		beforeEach(->
			fetchMock.mock(requestUrl, 'POST', '[]')
		)

		it('should have the correct URL', (done) ->
			wrap.create(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a POST request', (done) ->
			wrap.create(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.create(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('get', ->
		beforeEach(->
			requestUrl += "/#{wrapId}"
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.get(wrapId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			wrap.get(wrapId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('delete', ->
		beforeEach(->
			requestUrl += "/#{wrapId}"
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have the correct URL', (done) ->
			wrap.delete(wrapId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a DELETE request', (done) ->
			wrap.delete(wrapId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('publish', ->
		beforeEach(->
			requestUrl += "/#{wrapId}/publish"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.publish(wrapId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			wrap.publish(wrapId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('rename', ->
		body = { name: 'New Name' }

		beforeEach(->
			requestUrl += "/#{wrapId}/rename"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.rename(wrapId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			wrap.rename(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.rename(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('share', ->
		body = { phone_number: '2125551234' }

		beforeEach(->
			requestUrl += "/#{wrapId}/share"
			fetchMock.mock(requestUrl, 'POST', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.share(wrapId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a POST request', (done) ->
			wrap.share(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.share(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('insertCards', ->
		body = { card_ids: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b', position: 1 }

		beforeEach(->
			requestUrl += "/#{wrapId}/insert_cards"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.insertCards(wrapId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			wrap.insertCards(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.insertCards(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('deleteCards', ->
		body = { count: 2, position: 1 }

		beforeEach(->
			requestUrl += "/#{wrapId}/delete_cards"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.deleteCards(wrapId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			wrap.deleteCards(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.deleteCards(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('replaceCard', ->
		body = { card_ids: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b', position: 1 }

		beforeEach(->
			requestUrl += "/#{wrapId}/replace_card"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.replaceCard(wrapId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			wrap.replaceCard(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.replaceCard(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('setCards', ->
		body = { card_ids: '9d467496-69c4-486d-ba12-511857258f6a,9d467496-69c4-486d-ba12-511857258f6b' }

		beforeEach(->
			requestUrl += "/#{wrapId}/set_cards"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.setCards(wrapId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			wrap.setCards(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.setCards(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('createPersonalized', ->
		body = { personalized_json: {}, tags: '' }

		beforeEach(->
			requestUrl += "/#{wrapId}/personalize/v2"
			fetchMock.mock(requestUrl, 'POST', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.createPersonalized(wrapId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a POST request', (done) ->
			wrap.createPersonalized(wrapId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.createPersonalized(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('listPersonalized', ->
		beforeEach(->
			requestUrl += "/#{wrapId}/personalize"
			fetchMock.mock(requestUrl, 'GET', '[]')
		)

		it('should have the correct URL', (done) ->
			wrap.listPersonalized(wrapId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			wrap.listPersonalized(wrapId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('deletePersonalized', ->
		body = { tags: '' }

		beforeEach(->
			requestUrl += "/#{wrapId}/personalize"
			fetchMock.mock(requestUrl, 'DELETE', '{}')
		)

		it('should have the correct URL', (done) ->
			wrap.deletePersonalized(wrapId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a DELETE request', (done) ->
			wrap.deletePersonalized(wrapId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			wrap.deletePersonalized(wrapId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)
)
