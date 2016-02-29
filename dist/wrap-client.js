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

	var WrapClientFactory;

	WrapClientFactory = __webpack_require__(1);

	window.Wrap = new WrapClientFactory();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var WrapClient, WrapClientFactory, constants;

	WrapClient = __webpack_require__(2);

	constants = __webpack_require__(3);

	WrapClientFactory = (function() {
	  function WrapClientFactory() {}

	  WrapClientFactory.prototype.createClient = function(url) {
	    if (url == null) {
	      url = constants.PRODUCTION_API_URL;
	    }
	    return new WrapClient(url);
	  };

	  return WrapClientFactory;

	})();

	module.exports = WrapClientFactory;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Wrap, WrapClient, constants, http;

	constants = __webpack_require__(3);

	http = __webpack_require__(4);

	Wrap = __webpack_require__(6);

	WrapClient = (function() {
	  function WrapClient(baseUrl) {
	    this.baseUrl = baseUrl;
	  }

	  WrapClient.prototype.getAuthHeader = function() {
	    return {
	      'Authorization': this._authorization
	    };
	  };

	  WrapClient.prototype.authorize = function(credentials) {
	    if (credentials == null) {
	      credentials = {};
	    }
	    credentials.client_id = constants.CLIENT_ID;
	    return http.post(this.baseUrl + "/auth/sign_in", {
	      body: credentials
	    }).then((function(_this) {
	      return function(response) {
	        _this._authorization = response.authorization;
	      };
	    })(this));
	  };

	  WrapClient.prototype.listWraps = function(search) {
	    return http.get(this.baseUrl + "/wraps", {
	      headers: this.getAuthHeader(),
	      search: search
	    }).then((function(_this) {
	      return function(wraps) {
	        return wraps.map(function(wrap) {
	          return new Wrap(wrap, _this);
	        });
	      };
	    })(this));
	  };

	  WrapClient.prototype.getWrap = function(wrapId, search) {
	    return http.get(this.baseUrl + "/wraps/" + wrapId, {
	      headers: this.getAuthHeader(),
	      search: search
	    }).then((function(_this) {
	      return function(wrap) {
	        return new Wrap(wrap, _this);
	      };
	    })(this));
	  };

	  return WrapClient;

	})();

	module.exports = WrapClient;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var constants;

	constants = {
	  CLIENT_ID: 'authoring',
	  PRODUCTION_API_URL: 'https://wrapi.wrap.co/api',
	  HTTP_METHODS: {
	    GET: 'get',
	    POST: 'post',
	    PUT: 'put',
	    DELETE: 'delete'
	  },
	  MESSAGE_SERVICES: {
	    SMS: 'sms',
	    MMS: 'mms'
	  }
	};

	module.exports = constants;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(fetch) {var checkStatus, formatQueryString, http, isNullBodyStatus, makeRequest, methods, parseJson;

	methods = __webpack_require__(3).HTTP_METHODS;

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
	  return "?" + (Object.keys(parameters).map(callback).join('&'));
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
	  if (options.method !== methods.GET) {
	    options.headers = options.headers || {};
	    Object.assign(options.headers, {
	      'Accepts': 'application/json',
	      'Content-Type': 'application/json'
	    });
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
	    return makeRequest(methods.GET, url, options);
	  },
	  post: function(url, options) {
	    return makeRequest(methods.POST, url, options);
	  },
	  put: function(url, options) {
	    return makeRequest(methods.PUT, url, options);
	  },
	  "delete": function(url, options) {
	    return makeRequest(methods.DELETE, url, options);
	  }
	};

	module.exports = http;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	(function() {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
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

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
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
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
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

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

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

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
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


	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.fetch
	}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Wrap, constants, http, isObject;

	constants = __webpack_require__(3);

	isObject = __webpack_require__(7);

	http = __webpack_require__(4);

	Wrap = (function() {
	  function Wrap(resource, _client) {
	    this._client = _client;
	    Object.assign(this, resource);
	    this._wrapUrl = this._client.baseUrl + "/wraps/" + this.id;
	  }

	  Wrap.prototype._createCardMap = function(sourceCards, targetCards) {
	    var cardMap;
	    cardMap = {};
	    sourceCards.forEach(function(card, index) {
	      return cardMap[card.id] = targetCards[index].id;
	    });
	    return cardMap;
	  };

	  Wrap.prototype._convertSchemaMapToCards = function(schemaMap) {
	    var id, results, schema;
	    results = [];
	    for (id in schemaMap) {
	      schema = schemaMap[id];
	      results.push({
	        id: id,
	        schema: schema
	      });
	    }
	    return results;
	  };

	  Wrap.prototype._assignTargetIds = function(sourceCards, targetCards) {
	    var card, cardMap, i, len;
	    cardMap = this._createCardMap(this.cards, targetCards);
	    for (i = 0, len = sourceCards.length; i < len; i++) {
	      card = sourceCards[i];
	      card.id = cardMap[card.id];
	    }
	    return sourceCards;
	  };

	  Wrap.prototype._convertCardsToSchemaMap = function(cards) {
	    var cardMap;
	    cardMap = {};
	    cards.forEach(function(card, index) {
	      return cardMap[card.id] = card.schema;
	    });
	    return cardMap;
	  };

	  Wrap.prototype._createPersonalizedWrap = function(body) {
	    return http.post(this._wrapUrl + "/personalize", {
	      headers: this._client.getAuthHeader(),
	      body: body
	    }).then((function(_this) {
	      return function(wrap) {
	        return new Wrap(wrap, _this._client);
	      };
	    })(this));
	  };

	  Wrap.prototype.listPersonalized = function(search) {
	    return http.get(this._wrapUrl + "/personalize", {
	      headers: this._client.getAuthHeader(),
	      search: search
	    }).then((function(_this) {
	      return function(wraps) {
	        return wraps.map(function(wrap) {
	          return new Wrap(wrap, _this._client);
	        });
	      };
	    })(this));
	  };

	  Wrap.prototype.createPersonalized = function(schemaMap, tags) {
	    return this._client.getWrap(this.id, {
	      published: true
	    }).then((function(_this) {
	      return function(publishedWrap) {
	        var body, cards;
	        body = {
	          tags: tags
	        };
	        if (isObject(schemaMap)) {
	          cards = _this._convertSchemaMapToCards(schemaMap);
	          cards = _this._assignTargetIds(cards, publishedWrap.cards);
	          body.personalized_json = _this._convertCardsToSchemaMap(cards);
	        } else {
	          body.url = schemaMap;
	        }
	        return _this._createPersonalizedWrap(body);
	      };
	    })(this));
	  };

	  Wrap.prototype.deletePersonalized = function(body) {
	    return http["delete"](this._wrapUrl + "/personalize", {
	      headers: this._client.getAuthHeader(),
	      body: body
	    });
	  };

	  Wrap.prototype.share = function(mobileNumber, body) {
	    return http.get(this._wrapUrl + "/share", {
	      headers: this._client.getAuthHeader(),
	      search: {
	        type: constants.MESSAGE_SERVICES.SMS,
	        phone_number: mobileNumber,
	        body: body
	      }
	    });
	  };

	  return Wrap;

	})();

	module.exports = Wrap;


/***/ },
/* 7 */
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


/***/ }
/******/ ]);