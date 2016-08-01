var HTTP, checkJobStatus, checkStatus, formatQueryString, http, isNullBodyStatus, keys, makeRequest, parseJson;

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

checkJobStatus = function(token, baseUrl, authorization, fulfill, reject) {
  var options;
  options = {
    method: 'GET',
    headers: {
      Authorization: authorization,
      Accepts: 'application/json'
    }
  };
  return fetch(baseUrl + "/jobs/status?token=" + token, options).then(function(response) {
    return response.json();
  }).then(function(response) {
    var jobStatus;
    jobStatus = response.status;
    if (jobStatus === 202) {
      return setTimeout(function() {
        return checkJobStatus(token, baseUrl, fulfill, reject);
      }, 500);
    } else if (jobStatus >= 200 && jobStatus < 300) {
      return fulfill(response);
    } else {
      return reject(response);
    }
  })["catch"](function(exception) {
    return reject(exception);
  });
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
  var baseUrl;
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
  if (options.baseUrl) {
    baseUrl = options.baseUrl;
    delete options.baseUrl;
  }
  return fetch(url, options).then(checkStatus).then(parseJson).then(function(response) {
    if (((response != null ? response.token : void 0) != null) && baseUrl) {
      return new Promise(function(fulfill, reject) {
        return checkJobStatus(response.token, baseUrl, options.headers.Authorization, fulfill, reject);
      });
    } else {
      return Promise.resolve(response);
    }
  });
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
