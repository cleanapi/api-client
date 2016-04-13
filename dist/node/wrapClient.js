var Wrap, WrapClient, constants, http;

constants = require('./constants');

http = require('./http');

Wrap = require('./wrap');

WrapClient = (function() {
  function WrapClient(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl != null ? baseUrl : constants.PRODUCTION_API_URL;
  }

  WrapClient.prototype.getAuthHeader = function() {
    return {
      'Authorization': "Bearer " + this.apiKey
    };
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
