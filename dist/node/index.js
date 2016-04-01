var WrapClientFactory;

WrapClientFactory = require('./wrapClientFactory');

if (typeof window !== "undefined" && window !== null) {
  window.Wrap = new WrapClientFactory();
} else if (typeof process !== "undefined" && process !== null) {
  module.exports = new WrapClientFactory();
}
