var WrapClient;

WrapClient = require('./WrapClient');

if (typeof window !== "undefined" && window !== null) {
  window.Wrap = WrapClient;
}

module.exports = WrapClient;
