var WrapClient, WrapClientFactory, constants;

WrapClient = require('./wrapClient');

constants = require('./constants');

WrapClientFactory = (function() {
  function WrapClientFactory() {}

  WrapClientFactory.prototype.createClient = function(url) {
    if (url == null) {
      url = constants.PRODUCTION_API_URL;
    }
    return new WrapClient(url);
  };

  return WrapClientFactory;

})();

module.exports = WrapClientFactory;
