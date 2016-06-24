var Asset, HTTP, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Asset = (function(superClass) {
  extend(Asset, superClass);

  function Asset(_client) {
    this._client = _client;
    this.resourcePath = '/';
  }

  Asset.prototype.upload = createEndpoint({
    method: HTTP.POST,
    path: '/assets/upload'
  });

  Asset.prototype.create = createEndpoint({
    method: HTTP.POST,
    path: '/teams/{teamId}/wraps/{wrapId}/assets',
    urlParams: ['teamId', 'wrapId']
  });

  return Asset;

})(WrapResource);

module.exports = Asset;
