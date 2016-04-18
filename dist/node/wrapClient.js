var Card, CardCollection, Job, Wrap, WrapClient, constants, wrapFetch;

constants = require('./constants');

wrapFetch = require('./wrapFetch');

Wrap = require('./Wrap');

Card = require('./Card');

CardCollection = require('./CardCollection');

Job = require('./Job');

WrapClient = (function() {
  function WrapClient(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl != null ? baseUrl : constants.PRODUCTION_API_URL;
    this.cards = new Card(this);
    this.cardCollections = new CardCollection(this);
    this.jobs = new Job(this);
  }

  WrapClient.prototype.getAuthHeader = function() {
    return {
      'Authorization': "Bearer " + this.apiKey
    };
  };

  WrapClient.prototype.listWraps = function(search) {
    return wrapFetch.get(this.baseUrl + "/wraps", {
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
    return wrapFetch.get(this.baseUrl + "/wraps/" + wrapId, {
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
