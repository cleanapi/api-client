var HTTP, checkStatus, formatQueryString, http, isNullBodyStatus, keys, makeRequest, parseJson;

require('isomorphic-fetch');

keys = require('lodash/keys');

HTTP = require('./constants').HTTP_METHODS;

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
  } else if (response.headers._headers['content-type'][0].indexOf('json') > -1) {
    return response.json().then(function(responseJson) {
      var error;
      error = new Error(response.statusText);
      error.response = responseJson;
      throw error;
    });
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
