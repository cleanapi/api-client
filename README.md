# Wrap API client library

> This library is in development, should be considered experimental, and should not be distributed externally.

## Build
Library builds are included in the repo in the `dist/node` and `dist/browser` directories. If you do want build the library yourself, simply follow these steps:

1. `npm install`
2. `node_modules/.bin/gulp`

## Development
If you are planning on contributing changes to the library, keep in mind that we keep a current build of the library under version control. There is a pre-commit script included that will perform this build for you. Run the following shell command from the root of the cloned library directory so that commits will trigger it.
```bash
ln -sf ../../pre-commit.sh .git/hooks/pre-commit
```

Also note that our test setup requires a version of Node greater than 0.12.

## Installation
### NodeJS
As this is not currently published on NPM, you'll need to reference it from our Github repo in the dependencies of your `package.json`.
```javascript
"dependencies": {
	"wrap-api-client": "wrapmedia/api-client"
}
```
It can then be required like any other NPM package. If you are using a version of Node that doesn't have native Promise support, include the `es6-promise` module in your dependencies and polyfill it before `wrap-api-client` is required.
```javascript
require('es6-promise').polyfill();
require('wrap-api-client')
```

### Browser
Copy the `dist/browser/wrap-client.js` file to your project directory and include it in your html file. The library exposes a `Wrap` global object on the window. Native promises are used to handle async operations. A polyfill should be used to support older browsers.

#### Browser compatibility
Browser support will match our support for Wrap Authoring. That appears to be the most recent releases of FF, Chrome, and Safari as well as Edge.

## Usage
### Creating a client instance
The `Wrap` global is a constructor for creating client instances.

#### #WrapClient(apiKey, [url])
The `apiKey` argument is required for authorizing requests to the API server. This can be retrieved from your [Account Settings](https://authoring.wrap.co/#/settings/account) tab.
The optional `url` argument allows for pointing to API servers other than production.

```javascript
# NodeJS
var WrapClient = require('wrap-api-client');
var client = new WrapClient('2dba6f6fbc1e11b2eda07c2432914b8b0d45d734c2698834d30fe938c5a7867f');

# Browser
var client = new Wrap('2dba6f6fbc1e11b2eda07c2432914b8b0d45d734c2698834d30fe938c5a7867f')
```

### Client instance methods
#### #listWraps([search])
Returns a list of Wrap resources for an account. An optional `search` argument can include filter and sort request parameters. These parameters can be reviewed in the [wrapi-rails apidocs](https://wrapi.wrap.co/apidocs#!/wraps/Api_Wraps_search_get_0).

#### #getWrap(wrapId, [search])
Returns a Wrap resource instance for `wrapId`. An optional `search` argument can include filter and sort request parameters. These parameters can be reviewed in the [wrapi-rails apidocs](https://wrapi.wrap.co/apidocs#!/wraps/Api_Wraps_search_get_0).

### Wrap instance methods

#### #listPersonalized([search])
Returns a list of all personalized Wrap resources for a Wrap. An optional `search` argument can include filter parameters.

```javascript
var wrapId = 'ed687f34-a60b-44e5-ae41-73812fb71ca9';
client.getWrap(wrapId)
	.then(function(wrap) {
		return wrap.listPersonalized({ tags: 'iphone,usa' });
	})
	.then(function(personalizedWraps) {
		// All associated personalized Wraps that are tagged with 'iphone' and 'usa'
	});
```

#### #createPersonalized(schemaMap, [tags])
Creates a new personalized Wrap from the Wrap instance. The supplied `schemaMap` will be used to substitute new data for each card's schemaJson. `schemaMap` should be a hash where each key is a card id and each value the substituted data. Alternately, `schemaMap` can be an absolute url that resolves to the hash. If provided, `tags` should be a string consisting of a comma separated list of tags to be applied to the newly created wrap.

```javascript
var wrapId = 'ed687f34-a60b-44e5-ae41-73812fb71ca9';
client.getWrap(wrapId)
	.then(function(wrap) {
		var schemaMap = {
			'b3d4f362-6101-425e-a334-fee5588acde9': {}
		}
		var tags = 'iphone, usa, female';
		return wrap.createPersonalized(schemaMap, tags);
	})
	.then(function(personalizedWrap) {
		// The personalized Wrap resource
	});
```

#### #deletePersonalized(filter)
Deletes personalized Wraps based on the filter. Filter parameters can be reviewed in the [wrapi-rails apidocs](https://wrapi.wrap.co/apidocs#!/personalization/Api_Personalization_destroy_delete_2).

```javascript
var wrapId = 'ed687f34-a60b-44e5-ae41-73812fb71ca9';
client.getWrap(wrapId)
	.then(function(wrap) {
		return wrap.listPersonalized();
	})
	.then(function(personalizedWraps) {
		ids = personalizedWraps.map(function(personalizedWrap) { return personalizedWrap.id; });
		return wrap.deletePersonalized({ wrap_ids: ids });
	})
	.then(function() {
		// All of the personalizedWraps were deleted.
	});
```

#### #share(mobileNumber, [body])
Sends an SMS message containing the wrap's canonicalUrl to `mobileNumber`. (Only US phone numbers are currently supported. The country code will be prepended for you.) If supplied, the optional `body` param should be a string containing a `{{wrap}}` token that will be replaced with the canonicalUrl.

```javascript
client.listWraps()
	.then(function(wraps) {
		// Using the default body.
		wraps[0].share('2125551212');
		// Using a custom body.
		wraps[1].share('4155551212', 'Thanks for your business! {{wrap}}');
	});
```
