const express = require('express');
const entitySchema = require('../schemas/entitySchema');
const schemaValidator = require('../middlewares/schemaValidator');
const EntityController = require('../controllers/EntityController');
const container = require('../../container');

const entityController = new EntityController(container);

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  schemaValidator(entitySchema.create),
  entityController.create.bind(entityController),
);

router.get(
  '/:entityId',
  schemaValidator(entitySchema.get),
  entityController.get.bind(entityController),
);

module.exports = router;
