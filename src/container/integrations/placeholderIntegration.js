const httpIntegration = require('./httpIntegration');
const { PLACEHOLDER_URL } = require('../../env');

const placeholderIntegration = httpIntegration({
  baseURL: PLACEHOLDER_URL,
  timeout: 10000,
});

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

/**
 * @param {String} id
 * @return {Promise<UserResponse?>}
 */
const getUserById = async (id) => {
  try {
    const response = await placeholderIntegration.get(`/users/${id}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response === 404) {
      return null;
    }
    throw err;
  }
};

exports.getUserById = getUserById;
