const R = require('ramda');
const axios = require('axios');

// @ts-ignore
const packageJson = require('../../../package.json');

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': `${packageJson.name}/${packageJson.version}`,
  },
};

/**
 * @param {import('axios').AxiosRequestConfig} options
 * @return {import('axios').AxiosInstance}
 */
const httpIntegration = options => axios.default
  .create(R.merge(defaultOptions, options));

module.exports = httpIntegration;
