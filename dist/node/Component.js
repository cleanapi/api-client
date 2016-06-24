var Component, HTTP, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Component = (function(superClass) {
  extend(Component, superClass);

  function Component(_client) {
    this._client = _client;
    this.resourcePath = '/components';
  }

  Component.prototype.list = createEndpoint({
    method: HTTP.GET
  });

  return Component;

})(WrapResource);

module.exports = Component;
