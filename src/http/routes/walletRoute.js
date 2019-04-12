const express = require('express');
const walletSchema = require('../schemas/walletSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const WalletController = require('../controllers/WalletController');
const container = require('../../container');

const walletController = new WalletController(container);

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  schemaValidator(walletSchema.create),
  walletController.create.bind(walletController),
);

router.get(
  '/:id',
  schemaValidator(walletSchema.get),
  walletController.get.bind(walletController),
);

module.exports = router;
