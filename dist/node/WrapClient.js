var Card, CardCollection, Job, Widget, Wrap, WrapClient, constants;

constants = require('./constants');

Card = require('./Card');

CardCollection = require('./CardCollection');

Job = require('./Job');

Wrap = require('./wrap');

Widget = require('./Widget');

WrapClient = (function() {
  function WrapClient(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl != null ? baseUrl : constants.PRODUCTION_API_URL;
    this.cards = new Card(this);
    this.cardCollections = new CardCollection(this);
    this.jobs = new Job(this);
    this.wraps = new Wrap(this);
    this.widgets = new Widget(this);
  }

  return WrapClient;

})();

module.exports = WrapClient;
