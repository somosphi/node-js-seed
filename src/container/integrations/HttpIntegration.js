const axios = require('axios');

class HttpIntegration {
  /**
   * @param {import('axios').AxiosRequestConfig} options
   */
  constructor(options) {
    this.instance = axios.default.create(options);
  }
}

module.exports = HttpIntegration;
