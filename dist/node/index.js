var WrapClient;

WrapClient = require('./WrapClient');

if (typeof window !== "undefined" && window !== null) {
  window.Wrap = WrapClient;
} else if (typeof process !== "undefined" && process !== null) {
  module.exports = WrapClient;
}
