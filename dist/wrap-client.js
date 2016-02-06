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

	Wrap = __webpack_require__(5);

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
	    var options;
	    options = {
	      headers: this.getAuthHeader(),
	      search: search
	    };
	    return http.get(this.baseUrl + "/wraps", options);
	  };

	  WrapClient.prototype.getWrap = function(wrapId, search) {
	    var options;
	    options = {
	      headers: this.getAuthHeader(),
	      search: search
	    };
	    return http.get(this.baseUrl + "/wraps/" + wrapId, options).then((function(_this) {
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
	  }
	};

	module.exports = constants;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(fetch) {var checkStatus, formatQueryString, http, makeRequest, methods, parseJson;

	methods = __webpack_require__(3).HTTP_METHODS;

	formatQueryString = function(parameters) {
	  var callback;
	  if (parameters == null) {
	    parameters = {};
	  }
	  callback = function(key) {
	    return (encodeURIComponent(key)) + "=" + (encodeURIComponent(parameters[key]));
	  };
	  return "?" + (Object.keys(parameters).map(callback).join('&'));
	};

	parseJson = function(response) {
	  return response != null ? response.json() : void 0;
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
	  if (options.method === methods.POST || options.method === methods.PUT) {
	    options.headers = options.headers || {};
	    Object.assign(options.headers, {
	      'Accepts': 'application/json',
	      'Content-Type': 'application/json'
	    });
	  }
	  if (options.body) {
	    options.body = JSON.stringify(options.body);
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"imports?this=>global!exports?global.fetch!whatwg-fetch\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Wrap, http;

	http = __webpack_require__(4);

	Wrap = (function() {
	  function Wrap(resource, _client) {
	    this._client = _client;
	    Object.assign(this, resource);
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
	    cardMap = this._createCardMap(sourceCards, targetCards);
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
	    var options;
	    options = {
	      headers: this._client.getAuthHeader(),
	      body: body
	    };
	    return http.post(this._client.baseUrl + "/wraps/" + this.id + "/personalize", options);
	  };

	  Wrap.prototype.personalize = function(schemaMap) {
	    return this._client.getWrap(this.id, {
	      published: true
	    }).then((function(_this) {
	      return function(publishedWrap) {
	        var cards;
	        cards = _this._convertSchemaMapToCards(schemaMap);
	        cards = _this._assignTargetIds(cards, publishedWrap.cards);
	        schemaMap = _this._convertCardsToSchemaMap(cards);
	        return _this._createPersonalizedWrap({
	          personalized_json: schemaMap
	        });
	      };
	    })(this));
	  };

	  return Wrap;

	})();

	module.exports = Wrap;


/***/ }
/******/ ]);