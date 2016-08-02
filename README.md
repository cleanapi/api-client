# Wrap API client library

## Getting Started

### Installation
`npm install wrap-api`

### Promises
This library requires promises but does not include a promise lib as a dependency. Please include a polyfill if your environment lacks native promise support. Make sure that the polyfill is loaded before `wrap-api` is.

Below are examples using [`es6-promise`](https://www.npmjs.com/package/es6-promise).


### NodeJS
```javascript
require('es6-promise').polyfill();
require('wrap-api');
```

### Browser

```html
<script src="node_modules/es6-promise/dist/es6-promise.min.js"></script>
<script src="node_modules/wrap-api/dist/browser/wrap-client.min.js"></script>
```

## Usage
 API keys are required and can be generated in the [Account Settings](https://authoring.wrap.co/#/settings/account) tab of the Wrap Authoring tool.

```javascript
// Create a client by passing an API key to the Wrap constructor.
var client = new Wrap(API_KEY);

// Resources are accessed on client instances. Actions are accessed on resources.
// Retrieve a list of wraps...
client.wraps.list()
    .then(function(wraps) {
        // An array of wraps
    });

// To retrieve a particular resource instance, pass in the resource id.
client.wraps.get(MY_WRAP_ID)
    .then(function(wrap) {
        // My wrap
    });

// For requests that require a body, include an object as the last argument.
client.wraps.rename(MY_WRAP_ID, { name: 'New Name' })
    .then(function(wrap) {
        // Still my wrap but with a new name
    });

// Search queries can also be passed in as an object.
client.wraps.list({ tags: 'iPhone' })
    .then(function(wraps) {
        // An array of wraps that are tagged with 'iPhone'.
    });
```

### Wraps
* create
* list
* get
* delete
* rename
* publish
* share
* insertCards
* deleteCards
* replaceCard
* setCards
* createPersonalized
* listPersonalized
* deletePersonalized

### Cards
* list
* get
* clone
* batchClone
* delete
* batchDelete
* collectionSearch

### CardCollections
* create
* list
* get
* update
* delete

### Jobs
* status

### Widgets
* list
* get
* create
* update
* delete

## Additional Resources
Please visit our developer portal for complete REST API documentation, including request path and query parameters, and request and response body schemas: [developers.wrap.co](https://developers.wrap.co/).
