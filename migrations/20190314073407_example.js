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
    table.enum('type', ['CHECKING_ACCOUNT', 'SAVINGS_ACCOUNT']).notNullable();
    table.integer('account').notNullable();
    table.integer('agency').notNullable();
    table.bigInteger('balance')
      .unsigned()
      .notNullable()
      .defaultTo(0);
    table.bigInteger('scheduled')
      .unsigned()
      .notNullable()
      .defaultTo(0);
    table.enum('active', ['YES', 'NO']).notNullable();
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

  await knex.schema.createTable('event', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('name').notNullable();
    table.string('description', 400).notNullable();
    table.enum('type', ['CREDIT', 'DEBIT', 'BALANCE']).notNullable();
    table.unique(['name']);
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('transaction', (table) => {
    table.bigIncrements('id').unsigned();
    table.uuid('code').notNullable();
    table.string('description', 10000).notNullable();
    table.bigInteger('eventId').notNullable().unsigned();
    table.bigInteger('walletId').notNullable().unsigned();
    table.bigInteger('value').notNullable().unsigned();
    table.enum('type', ['CREDIT', 'DEBIT', 'BALANCE']).notNullable();
    table.enum('status', ['PENDING', 'CONFIRMED', 'CANCELLED']).notNullable();
    table.unique(['code']);
    table.foreign('eventId').references('event.id');
    table.foreign('walletId').references('wallet.id');
    table.dateTime('processed').nullable();
    table.dateTime('processedAtLocal').nullable();
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.schema.createTable('fee', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('description', 500).notNullable();
    table.bigInteger('eventId').notNullable().unsigned();
    table.bigInteger('walletId').notNullable().unsigned();
    table.bigInteger('value').notNullable().unsigned();
    table.enum('type', ['CREDIT', 'DEBIT', 'BALANCE']).notNullable();
    table.enum('status', ['PENDING', 'CONFIRMED', 'CANCELLED']).notNullable();
    table.unique(['code']);
    table.foreign('eventId').references('event.id');
    table.foreign('walletId').references('wallet.id');
    table.dateTime('processed').nullable();
    table.dateTime('processedAtLocal').nullable();
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });

  await knex.insert([
    {
      name: 'BALANCE',
      type: 'BALANCE',
      description: 'Balanço',
    }, {
      name: 'TRASNFER_IN',
      type: 'CREDIT',
      description: 'Transferência eletrônica recebida',
    }, {
      name: 'TRASNFER_OUT',
      type: 'DEBIT',
      description: 'Transferência eletrônica enviada',
    }, {
      name: 'TRASNFER_FEE_IN',
      type: 'CREDIT',
      description: 'Taxa de transferência eletrônica recebida',
    }, {
      name: 'TRASNFER_FEE_OUT',
      type: 'DEBIT',
      description: 'Taxa de transferência eletrônica enviada',
    },
  ]).from('event');
};

/**
 * @param {import('knex')} knex
 */
const down = async (knex) => {
  await knex.schema.dropTable('entity');
};

module.exports = { up, down };
