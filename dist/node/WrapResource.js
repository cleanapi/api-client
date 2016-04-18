var HTTP, WrapResource, isObject, wrapFetch,
  slice = [].slice;

wrapFetch = require('./wrapFetch');

HTTP = require('./constants').HTTP_METHODS;

isObject = require('lodash/isObject');

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
    var arg, args, options, param, params, url;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    url = this._getUrl(path);
    while (urlParams.length) {
      param = urlParams.shift();
      arg = args.shift();
      url = url.replace("{" + param + "}", arg);
    }
    options = {
      headers: this._getAuthHeader()
    };
    params = args.shift();
    if (isObject(params)) {
      if (method === HTTP.GET) {
        options.search = params;
      } else {
        options.body = params;
      }
    }
    method = method.toLowerCase();
    return wrapFetch[method](url, options);
  };
};

module.exports = WrapResource;
