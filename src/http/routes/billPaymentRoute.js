const express = require('express');
const billPaymentSchema = require('../schemas/billPaymentSchema');
const schemaValidator = require('../middlewares/schemaValidator');
const BillPaymentController = require('../controllers/BillPaymentController');
const container = require('../../container');

const billPaymentController = new BillPaymentController(container);

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  schemaValidator(billPaymentSchema.create),
  billPaymentController.create.bind(billPaymentController),
);

router.get(
  '/:id',
  schemaValidator(billPaymentSchema.get),
  billPaymentController.get.bind(billPaymentController),
);

router.put(
  '/:id',
  schemaValidator(billPaymentSchema.pay),
  billPaymentController.pay.bind(billPaymentController),
);

router.post(
  '/topazio/postback',
  schemaValidator(billPaymentSchema.topazioPostback),
  billPaymentController.topazioPostback.bind(billPaymentController),
);

module.exports = router;
