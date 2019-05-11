const express = require('express');
const entitySchema = require('../schemas/entitySchema');
const schemaValidator = require('../middlewares/schemaValidator');
const entityController = require('../controllers/entityController');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  schemaValidator(entitySchema.create),
  entityController.create,
);

router.get(
  '/',
  schemaValidator(entitySchema.getAll),
  entityController.getAll,
);

router.get(
  '/:id',
  schemaValidator(entitySchema.findById),
  entityController.findById,
);

module.exports = router;
