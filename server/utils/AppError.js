class AppError extends Error {
  /**
   * @param {object} args
   * @param {string} args.message - safe message to show to client
   * @param {number} [args.status=500] - HTTP status code
   * @param {string} [args.code="INTERNAL_ERROR"] - stable machine-readable code
   * @param {object} [args.details] - optional extra context (avoid sensitive data)
   * @param {Error} [args.cause] - original error
   */
  constructor({ message, status = 500, code = 'INTERNAL_ERROR', details, cause } = {}) {
    super(message || 'Internal server error.');
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.cause = cause;
    this.isOperational = true;
  }
}

module.exports = { AppError };

