const { expect, request } = require('./helpers');

const validateEntity = (entity) => {
  expect(typeof entity).to.be.eql('object');
  expect(typeof entity.id).to.be.eql('number');
  expect(typeof entity.name).to.be.eql('string');
  expect(typeof entity.documentNumber).to.be.eql('string');
  expect(typeof entity.documentType).to.be.eql('string');
};

describe('Http routes', () => {
  let createdEntityId = null;
  let createdEntityDocumentNumber = null;

  describe('POST /entity', () => {
    it('should return a new created entity', async () => {
      createdEntityDocumentNumber = Date.now().toString().substr(0, 11);

      const response = await request.post('/entity').send({
        name: 'Fulano da Silva',
        documentNumber: createdEntityDocumentNumber,
        documentType: 'CPF',
      });

      expect(response.status).to.be.eql(200);
      validateEntity(response.body);

      createdEntityId = response.body.id;
    });

    it('should throw duplicated resource', async () => {
      const response = await request.post('/entity').send({
        name: 'Fulano da Silva',
        documentNumber: createdEntityDocumentNumber,
        documentType: 'CPF',
      });

      expect(response.status).to.be.eql(409);
      expect(response.body.code).to.be.eql('DUPLICATED_RESOURCE');
    });
  });

  describe('GET /entity/{id}', () => {
    it('should get created entity by id', async () => {
      const response = await request.get(`/entity/${createdEntityId}`);
      expect(response.status).to.be.eql(200);
      validateEntity(response.body);
    });
  });
});
