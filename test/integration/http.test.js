const { expect, request } = require('./helpers');

const validateEntity = (entity) => {
  expect(typeof entity).to.be.eql('object');
  expect(typeof entity.id).to.be.eql('string');
  expect(typeof entity.name).to.be.eql('string');
  expect(typeof entity.documentNumber).to.be.eql('string');
  expect(typeof entity.documentType).to.be.eql('string');
};

describe('Http routes', () => {
  let createdEntityId = null;

  describe('POST /entity', () => {
    it('should return a new created entity', async () => {
      const response = await request.post('/entity').send({
        name: 'Fulano da Silva',
        documentNumber: '03010836066',
        documentType: 'CPF',
      });

      expect(response.status).to.be.eql(200);
      validateEntity(response.body);

      createdEntityId = response.body.id;
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
