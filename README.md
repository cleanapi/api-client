# Wrap API client library

> This library is in development, should be considered experimental, and should not be distributed externally.

## Build
1. `npm install`
2. `node_modules/.bin/gulp`

## Usage
Copy the `dist/wrap-client.js` file to your project directory and include it in your html file. The library exposes a `Wrap` global object on the window. Promises are used to handle async operations.

### Creating a client
The `Wrap` global is a factory with one method: `#createClient`. Each client can point to a different API host and authorize to different accounts.

#### #createClient([url])
The optional `url` argument allows for pointing to API servers other than production.

```javascript
var productionClient = Wrap.createClient();
var localhostClient = Wrap.createClient('http://localhost:8080/api');
```

### Client instance methods

#### #authorize(credentials)
We currently use username/password credentials to authorize access to an account.

```javascript
var client = Wrap.createClient();
var credentials = {
	login: 'jsmith@wrap.co',
	password: 'Gr8tP4ssw0rd'
};

client.authorize(credentials)
	.then(function() {
		// client is ready to access privileged resources!
	})
	.catch(function(error) {
		// auth failure!
	});
```

#### #listWraps([queryParams])
Returns a list of all Wraps for an account. An optional `queryParams` argument can include filter and sort request parameters. These parameters can be reviewed in the wrapi-rails apidocs.

#### #getWrap(wrapId, [queryParams])
Returns a Wrap resource instance for `wrapId`.

### Wrap instance methods

#### #personalize(schemaMap)
Creates a new personalized Wrap from the Wrap instance. The supplied `schemaMap` will be used to substitute new data for each card's schemaJson. `schemaMap` should be a hash where each key is a card id and each value the substituted data.

```javascript
var wrapId = 'ed687f34-a60b-44e5-ae41-73812fb71ca9';
client.getWrap(wrapId)
	.then(function(wrap) {
		var schemaMap = {
			'b3d4f362-6101-425e-a334-fee5588acde9': {}
		}
		return wrap.personalize(schemaMap)
	})
	.then(function(personalizedWrap) {
		// The personalized Wrap resource
	});
```

## Browser compatibility
Browser support will match our support for Wrap Authoring. That appears to be the most recent releases of FF, Chrome, and Safari as well as Edge.
