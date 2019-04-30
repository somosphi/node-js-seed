const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex
 */
const up = async (knex) => {
  await knex.schema.createTable('entity', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('name', 350).notNullable();
    table.specificType('documentNumber', 'CHAR(14)').notNullable();
    table.enum('documentType', ['CPF', 'CNPJ']).notNullable();
    table.unique(['documentNumber', 'documentType']);
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('wallet', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('description', 10000).notNullable();
    table.enum('type', ['CHECKING_ACCOUNT', 'SAVINGS_ACCOUNT'])
      .notNullable();
    table.bigInteger('balance')
      .unsigned()
      .notNullable()
      .defaultTo(0);
    table.bigInteger('scheduled')
      .unsigned()
      .notNullable()
      .defaultTo(0);
    table.enum('active', ['YES', 'NO']).notNullable();
    table.unique(['agency', 'account']);
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('entityWalletRef', (table) => {
    table.bigInteger('entityId')
      .unsigned()
      .notNullable();
    table.bigInteger('walletId')
      .unsigned()
      .notNullable();
    table.enum('active', ['YES', 'NO']).notNullable();
    table.foreign('entityId').references('entity.id');
    table.foreign('walletId').references('wallet.id');
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('walletDailyPosition', (table) => {
    table.bigIncrements('id').unsigned();
    table.bigInteger('walletId')
      .unsigned()
      .notNullable();
    table.bigInteger('balance')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .comment('Saldo');
    table.bigInteger('rows')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .comment('Transações processadas');
    table.bigInteger('cancelled')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .comment('Transações canceladas');
    table.bigInteger('confirmed')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .comment('Transações confirmadas');
    table.bigInteger('pending')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .comment('Transações pendentes');
    table.bigInteger('scheduled')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      .comment('Total agendando');
    table.dateTime('startDate').comment('Data de referência inícial');
    table.dateTime('endDate').comment('Data de referência final');
    table.date('date').comment('Data de referência');
    table.enum('timeZone', ['BRT', 'UTC']).notNullable();
    table.unique(['walletId', 'date', 'timeZone']);
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('entityWalletRef', (table) => {
    table.bigInteger('entityId')
      .unsigned()
      .notNullable();
    table.bigInteger('walletId')
      .unsigned()
      .notNullable();
    table.enum('active', ['YES', 'NO']).notNullable();
    table.foreign('entityId').references('entity.id');
    table.foreign('walletId').references('wallet.id');
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('service', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('name', 100).notNullable();
    table.string('description', 400).notNullable();
    table.enum('active', ['YES', 'NO']).notNullable();
    table.unique(['name']);
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('event', (table) => {
    table.bigIncrements('id').unsigned();
    table.bigInteger('serviceId')
      .unsigned()
      .notNullable();
    table.string('name', 100).notNullable();
    table.string('description', 400).notNullable();
    table.enum('type', ['CREDIT', 'DEBIT', 'BALANCE']).notNullable();
    table.unique(['name']);
    table.foreign('serviceId').references('service.id');
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('transaction', (table) => {
    table.bigIncrements('id').unsigned();
    table.uuid('authorizationCode').notNullable();
    table.string('description', 10000).notNullable();
    table.bigInteger('eventId').notNullable().unsigned();
    table.bigInteger('walletId').notNullable().unsigned();
    table.bigInteger('value').notNullable().unsigned();
    table.dateTime('processed').nullable();
    table.dateTime('processedAtLocal').nullable();
    table.foreign('eventId').references('event.id');
    table.foreign('walletId').references('wallet.id');
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex('service').insert([
    {
      id: '1',
      name: 'WALLET',
      active: 'YES',
      description: 'Wallet',
    }, {
      id: '2',
      name: 'TRASNFER',
      active: 'YES',
      description: 'Transferência',
    },
  ]);

  await knex('event').insert([
    {
      serviceId: '1',
      name: 'BALANCE',
      type: 'BALANCE',
      description: 'Balanço',
    }, {
      serviceId: '2',
      name: 'TRASNFER_IN',
      type: 'CREDIT',
      description: 'Transferência eletrônica recebida',
    }, {
      serviceId: '2',
      name: 'TRASNFER_OUT',
      type: 'DEBIT',
      description: 'Transferência eletrônica enviada',
    }, {
      serviceId: '2',
      name: 'TRASNFER_FEE_IN',
      type: 'CREDIT',
      description: 'Taxa de transferência eletrônica recebida',
    }, {
      serviceId: '2',
      name: 'TRASNFER_FEE_OUT',
      type: 'DEBIT',
      description: 'Taxa de transferência eletrônica enviada',
    },
  ]);
};

/**
 * @param {import('knex')} knex
 */
const down = async (knex) => {
  await knex.schema.dropTable('entity');
};

module.exports = { up, down };
