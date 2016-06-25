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
    this.resourcePath = '/assets';
  }

  Asset.prototype.createUpload = createEndpoint({
    method: HTTP.POST,
    path: '/uploads'
  });

  return Asset;

})(WrapResource);

module.exports = Asset;
