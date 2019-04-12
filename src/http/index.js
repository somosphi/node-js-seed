const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('../i18n');
const { NotFoundError } = require('../errors');
const { NODE_ENV } = require('../env');

/* Routes */
const walletRoute = require('./routes/walletRoute');

/* Middlewares */
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

/* Express initialization */
const app = express();

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get(['/info', '/status'], async (req, res, next) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

if (NODE_ENV === 'production') {
  // app.use(auth(['ADMIN']));
}

/* Instatiate routes */
app.use('/bill-payments', walletRoute);

app.all('*', (req, res, next) => {
  next(new NotFoundError(res.__('error.notFound')));
});

app.use(errorHandler);

module.exports = app;
