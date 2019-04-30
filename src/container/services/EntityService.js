class EntityService {
  /**
   * @param {import('../index').ServiceContext} container
   */
  constructor(container) {
    this.placeholder = container.placeholder;
  }
}

module.exports = EntityService;
