require('isomorphic-fetch')
fetchMock = require('fetch-mock')
BASE_URL = require('./helpers').BASE_URL
API_KEY = require('./helpers').API_KEY

Job = require('../src/Job')

requestUrl = null
job = null
clientStub = {
	apiKey: API_KEY
	baseUrl: BASE_URL
}


describe('Job', ->
	beforeEach(->
		requestUrl = "#{BASE_URL}/jobs"
		job = new Job(clientStub)
	)

	afterEach(fetchMock.restore)

	describe('status', ->
		body = {
			token: '9d467496-69c4-486d-ba12-511857258f6a'
		}
		
		beforeEach(->
			requestUrl += '/status?token=9d467496-69c4-486d-ba12-511857258f6a'
			fetchMock.mock(requestUrl, 'GET', '{}')
		)

		it('should have a correctly configured fetch request', (done) ->
			job.status(body)
				.then(->
					expect(fetchMock.lastUrl(requestUrl)).toEqual(requestUrl)
					expect(fetchMock.lastOptions(requestUrl).method).toEqual('GET')
					done()
				)
				.catch(done.fail)
		)
	)
)
