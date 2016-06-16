var HTTP, Widget, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Widget = (function(superClass) {
  extend(Widget, superClass);

  function Widget(_client) {
    this._client = _client;
    this.resourcePath = '/widgets';
  }

  Widget.prototype.list = createEndpoint({
    method: HTTP.GET
  });

  Widget.prototype.get = createEndpoint({
    method: HTTP.GET,
    path: '/{id}',
    urlParams: ['id']
  });

  Widget.prototype.create = createEndpoint({
    method: HTTP.POST
  });

  Widget.prototype.update = createEndpoint({
    method: HTTP.PUT,
    path: '/{id}',
    urlParams: ['id']
  });

  Widget.prototype["delete"] = createEndpoint({
    method: HTTP.DELETE,
    path: '/{id}',
    urlParams: ['id']
  });

  return Widget;

})(WrapResource);

module.exports = Widget;
