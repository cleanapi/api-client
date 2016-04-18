var Card, HTTP, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Card = (function(superClass) {
  extend(Card, superClass);

  function Card(_client) {
    this._client = _client;
    this.resourcePath = '/card_collections';
  }

  Card.prototype.create = createEndpoint({
    method: HTTP.POST
  });

  Card.prototype.list = createEndpoint({
    method: HTTP.GET
  });

  Card.prototype.get = createEndpoint({
    method: HTTP.GET,
    path: '/{id}',
    urlParams: ['id']
  });

  Card.prototype.update = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}',
    urlParams: ['id']
  });

  Card.prototype["delete"] = createEndpoint({
    method: HTTP.DELETE,
    path: '/{id}',
    urlParams: ['id']
  });

  return Card;

})(WrapResource);

module.exports = Card;
