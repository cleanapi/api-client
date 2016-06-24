var HTTP, Team, WrapResource, createEndpoint,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

WrapResource = require('./WrapResource');

createEndpoint = WrapResource.createEndpoint;

HTTP = require('./constants').HTTP_METHODS;

Team = (function(superClass) {
  extend(Team, superClass);

  function Team(_client) {
    this._client = _client;
    this.resourcePath = '/teams';
  }

  Team.prototype.createWrap = createEndpoint({
    method: HTTP.POST,
    path: '/{id}/wraps',
    urlParams: ['id']
  });

  Team.prototype.createAsset = createEndpoint({
    method: HTTP.POST,
    path: '/{teamId}/wraps/{wrapId}/assets',
    urlParams: ['teamId', 'wrapId']
  });

  return Team;

})(WrapResource);

module.exports = Team;
