var HTTP, Layout, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Layout = (function(superClass) {
  extend(Layout, superClass);

  function Layout(_client) {
    this._client = _client;
    this.resourcePath = '/layouts';
  }

  Layout.prototype.list = createEndpoint({
    method: HTTP.GET
  });

  Layout.prototype.get = createEndpoint({
    method: HTTP.GET,
    path: '/{id}',
    urlParams: ['id']
  });

  return Layout;

})(WrapResource);

module.exports = Layout;
