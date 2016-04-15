var HTTP, WrapResource, isObject, wrapFetch;

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

WrapResource.createEndpoint = function(spec) {
  var method, urlParams;
  method = (spec != null ? spec.method : void 0) || HTTP.GET;
  urlParams = (spec != null ? spec.urlParams : void 0) || [];
  return function() {
    var arg, args, options, param, params, url;
    args = [].slice.call(arguments);
    url = this._getUrl(spec != null ? spec.path : void 0);
    while (urlParams != null ? urlParams.length : void 0) {
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
