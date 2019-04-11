const HttpIntegration = require('./HttpIntegration');
const { PLACEHOLDER_URL, SERVICE_NAME } = require('../../env');
const pjson = require('../../../package.json');

/**
 * @typedef UserResponse
 * @type {Object}
 * @property {Number} id
 * @property {String} name
 * @property {String} username
 * @property {String} email
 * @property {Object} address
 * @property {String} address.street
 * @property {String} address.suite
 * @property {String} address.city
 * @property {String} address.zipcode
 * @property {Object} address.geo
 * @property {String} address.geo.lat
 * @property {String} address.geo.lng
 * @property {String} phone
 * @property {String} website
 * @property {Object} company
 * @property {String} company.name
 * @property {String} company.catchPhrase
 * @property {String} company.bs
 */


class Placeholder extends HttpIntegration {
  constructor() {
    super({
      baseURL: PLACEHOLDER_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': `${SERVICE_NAME}/${pjson.version}`,
      },
    });
  }

  /**
   * @param {Number} id
   * @return {UserResponse?}
   */
  async get(id) {
    try {
      const response = await this.instance.get(`/users/${id}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response === 404) {
        return null;
      }
      throw err;
    }
  }
}

module.exports = Placeholder;
