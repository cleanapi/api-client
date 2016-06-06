var Card, CardCollection, Job, Wrap, WrapClient, constants;

constants = require('./constants');

Card = require('./Card');

CardCollection = require('./CardCollection');

Job = require('./Job');

Wrap = require('./Wrap');

WrapClient = (function() {
  function WrapClient(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl != null ? baseUrl : constants.PRODUCTION_API_URL;
    this.cards = new Card(this);
    this.cardCollections = new CardCollection(this);
    this.jobs = new Job(this);
    this.wraps = new Wrap(this);
  }

  return WrapClient;

})();

module.exports = WrapClient;