var HTTP, Permission, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Permission = (function(superClass) {
  extend(Permission, superClass);

  function Permission(_client) {
    this._client = _client;
    this.resourcePath = '/permissions';
  }

  Permission.prototype.list = createEndpoint({
    method: HTTP.GET
  });

  return Permission;

})(WrapResource);

module.exports = Permission;
