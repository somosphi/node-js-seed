const winston = require('winston');
const moment = require('moment-timezone');

const {
  combine, splat, colorize, printf,
} = winston.format;

/**
 * @param {Error} err
 * @return {String}
 */
const getErrorMessage = (err) => {
  if (!err.request) {
    return err.message;
  }

  const data = {
    url: err.request._currentUrl,
    method: err.config.method.toUpperCase(),
    reqData: err.config.data,
    resData: err.response ? err.response.data : null,
    status: err.response ? err.response.status : null,
  };

  const message = Object.keys(data)
    .filter(key => !!data[key])
    .map(key => `${key}=${JSON.stringify(data[key])}`)
    .join(' ');

  return `${err.message} ${message}`;
};

const customFormat = printf((info) => {
  const message = info instanceof Error ? getErrorMessage(info) : info.message;
  return `[${moment(info.timestamp)
    .utc()
    .format('YYYY-MM-DD HH:mm:ss')}] ${info.level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(splat(), colorize(), customFormat),
  transports: [new winston.transports.Console({})],
});

module.exports = logger;
