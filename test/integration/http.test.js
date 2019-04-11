const { expect, request } = require('./helpers');
const { billPaymentService } = require('../../src/container');

const validateBillPayment = (billPayment) => {
  expect(typeof billPayment).to.be.eql('object');
  expect(typeof billPayment.id).to.be.eql('number');
  expect(typeof billPayment.agreementId).to.be.eql('number');
  if (billPayment.segment) {
    expect(typeof billPayment.segment).to.be.eql('string');
  }
  expect(typeof billPayment.bank).to.be.eql('string');
  expect(typeof billPayment.type).to.be.eql('string');
  expect(typeof billPayment.typeableLine).to.be.eql('string');
  expect(typeof billPayment.dueDate).to.be.eql('string');
  expect(new Date(billPayment.dueDate).toISOString()).to.be.eql(billPayment.dueDate);
  expect(typeof billPayment.paymentDeadLine).to.be.eql('string');
  expect(new Date(billPayment.paymentDeadLine).toISOString()).to.be
    .eql(billPayment.paymentDeadLine);
  expect(typeof billPayment.nextWorkDate).to.be.eql('string');
  expect(new Date(billPayment.nextWorkDate).toISOString()).to.be.eql(billPayment.nextWorkDate);
  if (billPayment.allowsChangeValue) {
    expect(typeof billPayment.allowsChangeValue).to.be.eql('string');
  }
  expect(typeof billPayment.nominalValue).to.be.eql('number');
  if (billPayment.paidValue) {
    expect(typeof billPayment.paidValue).to.be.eql('number');
  }
  expect(typeof billPayment.updatePaymentAmount).to.be.eql('number');
  expect(typeof billPayment.discountCalculatedValue).to.be.eql('number');
  expect(typeof billPayment.interestCalculatedValue).to.be.eql('number');
  expect(typeof billPayment.minValuePayment).to.be.eql('number');
  expect(typeof billPayment.maxValuePayment).to.be.eql('number');
  expect(typeof billPayment.fineCalculatedValue).to.be.eql('number');
  expect(typeof billPayment.totalRebateValue).to.be.eql('number');
  expect(typeof billPayment.totalAdditionValue).to.be.eql('number');
  expect(typeof billPayment.drawee.name).to.be.eql('string');
  expect(typeof billPayment.drawee.documentNumber).to.be.eql('string');
  expect(typeof billPayment.drawee.documentType).to.be.eql('string');
  expect(typeof billPayment.beneficiary.name).to.be.eql('string');
  expect(typeof billPayment.beneficiary.documentNumber).to.be.eql('string');
  expect(typeof billPayment.beneficiary.documentType).to.be.eql('string');
  expect(typeof billPayment.createdAt).to.be.eql('string');
  expect(new Date(billPayment.createdAt).toISOString()).to.be.eql(billPayment.createdAt);
  expect(typeof billPayment.updatedAt).to.be.eql('string');
  expect(new Date(billPayment.updatedAt).toISOString()).to.be.eql(billPayment.updatedAt);
};

describe('Http routes', () => {
  const createdBillPaymentIds = [];

  describe('POST /bill-payments', () => {
    it('should return a new created bill payment', async () => {
      const response = await request.post('/bill-payments').send({
        callbackURL: 'http://localhost:3000',
        agreementId: 59,
        drawee: {
          name: 'Giuseppe Menti',
          documentNumber: '03514555079',
        },
        '2barcode': '23796783600000199000504041990319104800810920',
        typeableLine: '23793380296041079641523006333308178360000006000',
      });

      expect(response.status).to.be.eql(200);
      validateBillPayment(response.body);

      createdBillPaymentIds.push(response.body.id);
    });
  });

  describe('GET /bill-payments', () => {
    it('should get all created bill payments by id', async () => {
      await Promise.all(createdBillPaymentIds.map(async (id) => {
        const response = await request.get(`/bill-payments/${id}`);
        expect(response.status).to.be.eql(200);
        validateBillPayment(response.body);
      }));
    });
  });

  describe('POST /bill-payments/:id/topazio/postback', () => {
    it('should return bill payment postback status ok', async () => {
      const billPayment = await billPaymentService.getById(createdBillPaymentIds[0]);
      const response = await request.post(`/bill-payments/${billPayment.id}/topazio/postback`).set('transaction_id', billPayment.bankMetaId).send();
      expect(response.status).to.be.eql(204);
    });
  });

  describe('POST /bill-payments/:id/topazio/postback', () => {
    it('should return bill payment resource not found error', async () => {
      const response = await request.post('/bill-payments/999999/topazio/postback').set('transaction_id', '1').send();
      expect(response.status).to.be.eql(404);
      expect(response.body.code).to.be.eql('RESOURCE_NOT_FOUND');
    });
  });

  describe('POST /bill-payments/:id/topazio/postback', () => {
    it('should return bill payment postback invalid transaction_id error', async () => {
      const response = await request.post(`/bill-payments/${createdBillPaymentIds[0]}/topazio/postback`)
        .set('transaction_id', '1')
        .send();
      expect(response.status).to.be.eql(400);
      expect(response.body.code).to.be.eql('INVALID_TRANSACTION_ID');
    });
  });
});

