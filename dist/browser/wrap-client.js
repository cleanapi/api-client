/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var WrapClient;

	WrapClient = __webpack_require__(1);

	if (typeof window !== "undefined" && window !== null) {
	  window.Wrap = WrapClient;
	}

	module.exports = WrapClient;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asset, Card, CardCollection, Component, Job, Layout, Team, Widget, Wrap, WrapClient, constants;

	constants = __webpack_require__(2);

	Asset = __webpack_require__(3);

	Card = __webpack_require__(26);

	CardCollection = __webpack_require__(27);

	Component = __webpack_require__(28);

	Job = __webpack_require__(29);

	Layout = __webpack_require__(30);

	Team = __webpack_require__(31);

	Wrap = __webpack_require__(32);

	Widget = __webpack_require__(33);

	WrapClient = (function() {
	  function WrapClient(apiKey, baseUrl) {
	    this.apiKey = apiKey;
	    this.baseUrl = baseUrl != null ? baseUrl : constants.PRODUCTION_API_URL;
	    this.assets = new Asset(this);
	    this.cards = new Card(this);
	    this.cardCollections = new CardCollection(this);
	    this.components = new Component(this);
	    this.jobs = new Job(this);
	    this.layouts = new Layout(this);
	    this.teams = new Team(this);
	    this.wraps = new Wrap(this);
	    this.widgets = new Widget(this);
	  }

	  return WrapClient;

	})();

	module.exports = WrapClient;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var constants;

	constants = {
	  PRODUCTION_API_URL: 'https://api.wrap.co/api',
	  HTTP_METHODS: {
	    GET: 'GET',
	    POST: 'POST',
	    PUT: 'PUT',
	    DELETE: 'DELETE',
	    OPTIONS: 'OPTIONS'
	  },
	  MESSAGE_SERVICES: {
	    SMS: 'sms',
	    MMS: 'mms'
	  }
	};

	module.exports = constants;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Asset, HTTP, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Asset = (function(superClass) {
	  extend(Asset, superClass);

	  function Asset(_client) {
	    this._client = _client;
	    this.resourcePath = '/assets';
	  }

	  Asset.prototype.createUpload = createEndpoint({
	    method: HTTP.POST,
	    path: '/uploads'
	  });

	  return Asset;

	})(WrapResource);

	module.exports = Asset;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, WrapResource, isObject, wrapFetch,
	  slice = [].slice;

	wrapFetch = __webpack_require__(5);

	HTTP = __webpack_require__(2).HTTP_METHODS;

	isObject = __webpack_require__(19);

	WrapResource = (function() {
	  function WrapResource(_client) {
	    this._client = _client;
	  }

	  WrapResource.prototype._getUrl = function(path) {
	    return this._client.baseUrl + this.resourcePath + (path || '');
	  };

	  WrapResource.prototype._getAuthHeader = function() {
	    return {
	      Authorization: "Bearer " + this._client.apiKey
	    };
	  };

	  return WrapResource;

	})();

	WrapResource.createEndpoint = function(arg1) {
	  var method, path, ref, ref1, ref2, urlParams;
	  method = (ref = arg1.method) != null ? ref : HTTP.GET, path = (ref1 = arg1.path) != null ? ref1 : '', urlParams = (ref2 = arg1.urlParams) != null ? ref2 : [];
	  return function() {
	    var arg, args, body, options, param, params, url;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    url = this._getUrl(path);
	    params = urlParams.slice();
	    while (params.length) {
	      param = params.shift();
	      arg = args.shift();
	      url = url.replace("{" + param + "}", arg);
	    }
	    options = {
	      headers: this._getAuthHeader()
	    };
	    body = args.shift();
	    if (isObject(body)) {
	      if (method === HTTP.GET) {
	        options.search = body;
	      } else {
	        options.body = body;
	      }
	    }
	    return wrapFetch[method.toLowerCase()](url, options);
	  };
	};

	module.exports = WrapResource;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, checkStatus, formatQueryString, http, isNullBodyStatus, keys, makeRequest, parseJson;

	__webpack_require__(6);

	keys = __webpack_require__(8);

	HTTP = __webpack_require__(2).HTTP_METHODS;

	formatQueryString = function(parameters) {
	  var callback;
	  if (parameters == null) {
	    parameters = {};
	  }
	  callback = function(key) {
	    if (parameters[key] !== void 0) {
	      return (encodeURIComponent(key)) + "=" + (encodeURIComponent(parameters[key]));
	    }
	  };
	  return "?" + (keys(parameters).map(callback).join('&'));
	};

	isNullBodyStatus = function(status) {
	  return status === 101 || status === 204 || status === 205 || status === 304;
	};

	parseJson = function(response) {
	  if (!isNullBodyStatus(response.status)) {
	    return response.json();
	  }
	};

	checkStatus = function(response) {
	  var error;
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  } else {
	    error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	};

	makeRequest = function(method, url, options) {
	  if (method == null) {
	    method = 'GET';
	  }
	  if (options == null) {
	    options = {};
	  }
	  options.method = method;
	  options.headers = options.headers || {};
	  options.headers['Accepts'] = 'application/json';
	  if (options.method !== HTTP.GET) {
	    options.headers['Content-Type'] = 'application/json';
	    if (options.body) {
	      options.body = JSON.stringify(options.body);
	    }
	  }
	  if (options.search) {
	    url += formatQueryString(options.search);
	    delete options.search;
	  }
	  return fetch(url, options).then(checkStatus).then(parseJson);
	};

	http = {
	  get: function(url, options) {
	    return makeRequest(HTTP.GET, url, options);
	  },
	  post: function(url, options) {
	    return makeRequest(HTTP.POST, url, options);
	  },
	  put: function(url, options) {
	    return makeRequest(HTTP.PUT, url, options);
	  },
	  "delete": function(url, options) {
	    return makeRequest(HTTP.DELETE, url, options);
	  }
	};

	module.exports = http;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(7);
	module.exports = self.fetch.bind(self);


/***/ },
/* 7 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(9),
	    baseKeys = __webpack_require__(10),
	    indexKeys = __webpack_require__(11),
	    isArrayLike = __webpack_require__(15),
	    isIndex = __webpack_require__(24),
	    isPrototype = __webpack_require__(25);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}

	module.exports = baseHas;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(12),
	    isArguments = __webpack_require__(13),
	    isArray = __webpack_require__(22),
	    isLength = __webpack_require__(20),
	    isString = __webpack_require__(23);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(14);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(15),
	    isObjectLike = __webpack_require__(21);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(16),
	    isFunction = __webpack_require__(18),
	    isLength = __webpack_require__(20);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(17);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(22),
	    isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(18);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Card, HTTP, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Card = (function(superClass) {
	  extend(Card, superClass);

	  function Card(_client) {
	    this._client = _client;
	    this.resourcePath = '/cards';
	  }

	  Card.prototype.list = createEndpoint({
	    method: HTTP.GET
	  });

	  Card.prototype.get = createEndpoint({
	    method: HTTP.GET,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Card.prototype.clone = createEndpoint({
	    method: HTTP.POST,
	    path: '/{id}/clone',
	    urlParams: ['id']
	  });

	  Card.prototype.batchClone = createEndpoint({
	    method: HTTP.POST,
	    path: '/{id}/batch_clone',
	    urlParams: ['id']
	  });

	  Card.prototype["delete"] = createEndpoint({
	    method: HTTP.DELETE,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Card.prototype.batchDelete = createEndpoint({
	    method: HTTP.DELETE
	  });

	  Card.prototype.collectionSearch = createEndpoint({
	    method: HTTP.GET,
	    path: '/collections/search'
	  });

	  return Card;

	})(WrapResource);

	module.exports = Card;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Card, HTTP, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Card = (function(superClass) {
	  extend(Card, superClass);

	  function Card(_client) {
	    this._client = _client;
	    this.resourcePath = '/card_collections';
	  }

	  Card.prototype.create = createEndpoint({
	    method: HTTP.POST
	  });

	  Card.prototype.list = createEndpoint({
	    method: HTTP.GET
	  });

	  Card.prototype.get = createEndpoint({
	    method: HTTP.GET,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Card.prototype.update = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Card.prototype["delete"] = createEndpoint({
	    method: HTTP.DELETE,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  return Card;

	})(WrapResource);

	module.exports = Card;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Component, HTTP, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Component = (function(superClass) {
	  extend(Component, superClass);

	  function Component(_client) {
	    this._client = _client;
	    this.resourcePath = '/components';
	  }

	  Component.prototype.list = createEndpoint({
	    method: HTTP.GET
	  });

	  return Component;

	})(WrapResource);

	module.exports = Component;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, Job, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Job = (function(superClass) {
	  extend(Job, superClass);

	  function Job(_client) {
	    this._client = _client;
	    this.resourcePath = '/jobs';
	  }

	  Job.prototype.status = createEndpoint({
	    method: HTTP.GET,
	    path: '/status'
	  });

	  return Job;

	})(WrapResource);

	module.exports = Job;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, Layout, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Layout = (function(superClass) {
	  extend(Layout, superClass);

	  function Layout(_client) {
	    this._client = _client;
	    this.resourcePath = '/layouts';
	  }

	  Layout.prototype.list = createEndpoint({
	    method: HTTP.GET
	  });

	  Layout.prototype.get = createEndpoint({
	    method: HTTP.GET,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  return Layout;

	})(WrapResource);

	module.exports = Layout;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, Team, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Team = (function(superClass) {
	  extend(Team, superClass);

	  function Team(_client) {
	    this._client = _client;
	    this.resourcePath = '/teams';
	  }

	  Team.prototype.createWrap = createEndpoint({
	    method: HTTP.POST,
	    path: '/{id}/wraps',
	    urlParams: ['id']
	  });

	  Team.prototype.createAsset = createEndpoint({
	    method: HTTP.POST,
	    path: '/{teamId}/wraps/{wrapId}/assets',
	    urlParams: ['teamId', 'wrapId']
	  });

	  return Team;

	})(WrapResource);

	module.exports = Team;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, Wrap, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Wrap = (function(superClass) {
	  extend(Wrap, superClass);

	  function Wrap(_client) {
	    this._client = _client;
	    this.resourcePath = '/wraps';
	  }

	  Wrap.prototype.list = createEndpoint({
	    method: HTTP.GET
	  });

	  Wrap.prototype.createWrapFromCards = createEndpoint({
	    method: HTTP.POST
	  });

	  Wrap.prototype.get = createEndpoint({
	    method: HTTP.GET,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Wrap.prototype.update = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Wrap.prototype["delete"] = createEndpoint({
	    method: HTTP.DELETE,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Wrap.prototype.publish = createEndpoint({
	    method: HTTP.POST,
	    path: '/{id}/publish',
	    urlParams: ['id']
	  });

	  Wrap.prototype.rename = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}/rename',
	    urlParams: ['id']
	  });

	  Wrap.prototype.share = createEndpoint({
	    method: HTTP.POST,
	    path: '/{id}/share',
	    urlParams: ['id']
	  });

	  Wrap.prototype.insertCards = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}/insert_cards',
	    urlParams: ['id']
	  });

	  Wrap.prototype.deleteCards = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}/delete_cards',
	    urlParams: ['id']
	  });

	  Wrap.prototype.replaceCard = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}/replace_card',
	    urlParams: ['id']
	  });

	  Wrap.prototype.setCards = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}/set_cards',
	    urlParams: ['id']
	  });

	  Wrap.prototype.createPersonalized = createEndpoint({
	    method: HTTP.POST,
	    path: '/{id}/personalize',
	    urlParams: ['id']
	  });

	  Wrap.prototype.listPersonalized = createEndpoint({
	    method: HTTP.GET,
	    path: '/{id}/personalize',
	    urlParams: ['id']
	  });

	  Wrap.prototype.deletePersonalized = createEndpoint({
	    method: HTTP.DELETE,
	    path: '/{id}/personalize',
	    urlParams: ['id']
	  });

	  return Wrap;

	})(WrapResource);

	module.exports = Wrap;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var HTTP, Widget, WrapResource, createEndpoint,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	WrapResource = __webpack_require__(4);

	createEndpoint = WrapResource.createEndpoint;

	HTTP = __webpack_require__(2).HTTP_METHODS;

	Widget = (function(superClass) {
	  extend(Widget, superClass);

	  function Widget(_client) {
	    this._client = _client;
	    this.resourcePath = '/widgets';
	  }

	  Widget.prototype.list = createEndpoint({
	    method: HTTP.GET
	  });

	  Widget.prototype.get = createEndpoint({
	    method: HTTP.GET,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Widget.prototype.create = createEndpoint({
	    method: HTTP.POST
	  });

	  Widget.prototype.update = createEndpoint({
	    method: HTTP.PUT,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  Widget.prototype["delete"] = createEndpoint({
	    method: HTTP.DELETE,
	    path: '/{id}',
	    urlParams: ['id']
	  });

	  return Widget;

	})(WrapResource);

	module.exports = Widget;


/***/ }
/******/ ]);