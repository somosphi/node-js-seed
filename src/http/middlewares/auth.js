const MiddlewareSecurity = require('@4alltecnologia/node-middleware-security');
const { AUTHORIZATION_SERVER } = require('../../env');

const Security = MiddlewareSecurity({
  endpoint: AUTHORIZATION_SERVER,
});

module.exports = roles => (new Security()).hasAnyRole(roles).authenticate();
