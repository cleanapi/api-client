var HTTP, Job, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Job = (function(superClass) {
  extend(Job, superClass);

  function Job(_client) {
    this._client = _client;
    this.resourcePath = '/jobs';
  }

  Job.prototype.status = createEndpoint({
    method: HTTP.GET,
    path: '/status'
  });

  return Job;

})(WrapResource);

module.exports = Job;
