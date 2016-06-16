var HTTP, Wrap, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Wrap = (function(superClass) {
  extend(Wrap, superClass);

  function Wrap(_client) {
    this._client = _client;
    this.resourcePath = '/wraps';
  }

  Wrap.prototype.list = createEndpoint({
    method: HTTP.GET
  });

  Wrap.prototype.createWrapFromCards = createEndpoint({
    method: HTTP.POST
  });

  Wrap.prototype.get = createEndpoint({
    method: HTTP.GET,
    path: '/{id}',
    urlParams: ['id']
  });

  Wrap.prototype["delete"] = createEndpoint({
    method: HTTP.DELETE,
    path: '/{id}',
    urlParams: ['id']
  });

  Wrap.prototype.publish = createEndpoint({
    method: HTTP.POST,
    path: '/{id}/publish',
    urlParams: ['id']
  });

  Wrap.prototype.rename = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}/rename',
    urlParams: ['id']
  });

  Wrap.prototype.share = createEndpoint({
    method: HTTP.POST,
    path: '/{id}/share',
    urlParams: ['id']
  });

  Wrap.prototype.insertCards = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}/insert_cards',
    urlParams: ['id']
  });

  Wrap.prototype.deleteCards = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}/delete_cards',
    urlParams: ['id']
  });

  Wrap.prototype.replaceCard = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}/replace_card',
    urlParams: ['id']
  });

  Wrap.prototype.setCards = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}/set_cards',
    urlParams: ['id']
  });

  Wrap.prototype.createPersonalized = createEndpoint({
    method: HTTP.POST,
    path: '/{id}/personalize',
    urlParams: ['id']
  });

  Wrap.prototype.listPersonalized = createEndpoint({
    method: HTTP.GET,
    path: '/{id}/personalize',
    urlParams: ['id']
  });

  Wrap.prototype.deletePersonalized = createEndpoint({
    method: HTTP.DELETE,
    path: '/{id}/personalize',
    urlParams: ['id']
  });

  return Wrap;

})(WrapResource);

module.exports = Wrap;
