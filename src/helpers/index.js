const KnexHelper = require('./KnexHelper');
const StringHelper = require('./StringHelper');

module.exports = {
  knexHelper: new KnexHelper(),
  stringHelper: new StringHelper(),
};
