const Crypto = require('expo-crypto');

module.exports = {
  randomUUID: () => Crypto.randomUUID(),
  getRandomValues: Crypto.getRandomValues,
};
