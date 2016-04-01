var Wrap, WrapClient, constants, http;

constants = require('./constants');

http = require('./http');

Wrap = require('./wrap');

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
