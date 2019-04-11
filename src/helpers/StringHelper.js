const uuid = require('uuid/v4');

class StringHelper {
  /**
   * @param {*} value
   * @return {String}
   */
  normalizeNumber(value) {
    return String(value).replace(/\D+/g, '');
  }

  /**
   * @return {String}
   */
  generateUUID() {
    return uuid();
  }
}

module.exports = StringHelper;
