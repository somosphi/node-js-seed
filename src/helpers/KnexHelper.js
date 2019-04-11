class KnexHelper {
  /**
   * @param {import('knex')} knex
   * @param {import('knex').TableBuilder} tableBuilder
   */
  addUpdatedAt(knex, tableBuilder, opts = {}) {
    const { fieldName = 'updatedAt', convert = false } = opts;
    const dateRaw = false && convert
      ? `CONVERT_TZ(${knex.fn.now()}, 'GMT', 'America/Sao_Paulo')`
      : 'CURRENT_TIMESTAMP';

    return tableBuilder
      .dateTime(fieldName)
      .notNullable()
      .defaultTo(knex.raw(`${dateRaw} ON UPDATE ${dateRaw}`));
  }

  /**
   * @param {import('knex')} knex
   * @param {import('knex').TableBuilder} tableBuilder
   */
  addCreatedAt(knex, tableBuilder, opts = {}) {
    const { fieldName = 'createdAt', convert = false } = opts;
    return tableBuilder
      .dateTime(fieldName)
      .notNullable()
      .defaultTo(false && convert
        ? knex.raw(`CONVERT_TZ(${knex.fn.now()}, 'GMT', 'America/Sao_Paulo')`)
        : knex.fn.now());
  }
}

module.exports = KnexHelper;
