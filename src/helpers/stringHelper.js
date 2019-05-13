const uuid = require('uuid/v4');

/**
 * @param {*} value
 * @return {String}
 */

const normalizeNumber = value => String(value).replace(/\D+/g, '');

exports.normalizeNumber = normalizeNumber;

/**
 * @return {String}
 */
const generateUUID = () => uuid();

exports.generateUUID = generateUUID;
