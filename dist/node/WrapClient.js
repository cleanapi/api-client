var Asset, Card, CardCollection, Component, Job, Layout, Permission, Team, Widget, Wrap, WrapClient, constants;

constants = require('./constants');

Asset = require('./Asset');

Card = require('./Card');

CardCollection = require('./CardCollection');

Component = require('./Component');

Job = require('./Job');

Layout = require('./Layout');

Permission = require('./Permission');

Team = require('./Team');

Wrap = require('./wrap');

Widget = require('./Widget');

WrapClient = (function() {
  function WrapClient(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl != null ? baseUrl : constants.PRODUCTION_API_URL;
    this.assets = new Asset(this);
    this.cards = new Card(this);
    this.cardCollections = new CardCollection(this);
    this.components = new Component(this);
    this.jobs = new Job(this);
    this.layouts = new Layout(this);
    this.permission = new Permission(this);
    this.teams = new Team(this);
    this.wraps = new Wrap(this);
    this.widgets = new Widget(this);
  }

  return WrapClient;

})();

module.exports = WrapClient;
