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
Browser support covers the most recent versions of FF, Chrome, Safari, and Edge.

## Usage
#### Wrap(apiKey, [url])
The `apiKey` argument is required for authorizing requests to the API server. This can be retrieved from your [Account Settings](https://authoring.wrap.co/#/settings/account) tab.
The optional `url` argument allows for pointing to API servers other than production.

```javascript
# NodeJS
var Wrap = require('wrap-api-client');
var client = new Wrap(API_KEY);

# Browser
var client = new Wrap(API_KEY)
```

### Client resources
Resources are accessed directly from client instances. Below is a list of available resources and their methods. [Details for specific endpoints can be found here.](https://wrapi.wrap.co/apidocs_public)

#### Wraps
* list
* get
* delete
* publish
* share
* insertCards
* deleteCards
* replaceCard
* setCards
* createPersonalized
* listPersonalized
* deletePersonalized

#### Cards
* list
* get
* clone
* batchClone
* delete
* batchDelete

#### CardCollections
* create
* list
* get
* update
* delete

#### Jobs
* status
