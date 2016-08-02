require('isomorphic-fetch')
fetchMock = require('fetch-mock')
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

Widget = require('../src/Widget')

requestUrl = null
widget = null
widgetId = '6EF60AA5-0541-408B-B9B5-B202485445F6'
clientStub = {
	apiKey: API_KEY
	baseUrl: BASE_URL
}


describe('Widget', ->
	beforeEach(->
		requestUrl = "#{BASE_URL}/widgets"
		widget = new Widget(clientStub)
	)

	afterEach(fetchMock.restore)

	describe('list', ->
		beforeEach(->
			fetchMock.mock(requestUrl, 'GET', '[]')
		)

		it('should have the correct URL', (done) ->
			widget.list()
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			widget.list()
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('get', ->
		beforeEach(->
			requestUrl = "#{BASE_URL}/widgets/#{widgetId}"
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have the correct URL', (done) ->
			widget.get(widgetId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a GET request', (done) ->
			widget.get(widgetId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)

	describe('create', ->
		body = { name: 'New Widget' }

		beforeEach(->
			fetchMock.mock(requestUrl, 'POST', '[]')
		)

		it('should have the correct URL', (done) ->
			widget.create(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a POST request', (done) ->
			widget.create(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('POST')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			widget.create(body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('update', ->
		body = { name: 'New Widget' }

		beforeEach(->
			requestUrl = "#{BASE_URL}/widgets/#{widgetId}"
			fetchMock.mock(requestUrl, 'PUT', '{}')
		)

		it('should have the correct URL', (done) ->
			widget.update(widgetId, body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a PUT request', (done) ->
			widget.update(widgetId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('PUT')
					done()
				)
				.catch(done.fail)
		)

		it('should send the correct request body', (done) ->
			widget.update(widgetId, body)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).body).toEqual(JSON.stringify(body))
					done()
				)
				.catch(done.fail)
		)
	)

	describe('delete', ->
		beforeEach(->
			requestUrl = "#{BASE_URL}/widgets/#{widgetId}"
			fetchMock.mock(requestUrl, 'DELETE', { status: 204 })
		)

		it('should have the correct URL', (done) ->
			widget.delete(widgetId)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					done()
				)
				.catch(done.fail)
		)

		it('should send a DELETE request', (done) ->
			widget.delete(widgetId)
				.then(->
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('DELETE')
					done()
				)
				.catch(done.fail)
		)
	)
)
