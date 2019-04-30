class TransactionService {
  /**
   * @param {import('../index').ServiceContext} container
   */
  constructor(container) {
    this.placeholder = container.placeholder;
  }
}

module.exports = TransactionService;
