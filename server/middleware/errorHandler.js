const multer = require('multer');
const { AppError } = require('../utils/AppError');

function toAppError(err) {
  if (!err) return new AppError({ message: 'Internal server error.' });
  if (err instanceof AppError) return err;

  // Express JSON/body parser errors (bad JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return new AppError({
      status: 400,
      code: 'INVALID_JSON',
      message: 'Invalid JSON in request body.',
    });
  }

  // Multer (file upload) errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return new AppError({
        status: 413,
        code: 'FILE_TOO_LARGE',
        message: 'Uploaded file is too large. Max allowed size is 10MB.',
      });
    }
    return new AppError({
      status: 400,
      code: 'UPLOAD_ERROR',
      message: err.message || 'File upload failed.',
    });
  }

  // Axios errors (GitHub, etc.)
  if (err.isAxiosError) {
    const status = err.response?.status;
    const url = err.config?.url;

    if (status === 404) {
      return new AppError({
        status: 404,
        code: 'GITHUB_NOT_FOUND',
        message: 'GitHub user was not found. Please check the username or profile link.',
        details: url ? { url } : undefined,
      });
    }

    if (status === 403) {
      const remaining = err.response?.headers?.['x-ratelimit-remaining'];
      const isRateLimited = remaining === '0';
      const resetAt = err.response?.headers?.['x-ratelimit-reset'];
      const hasGithubToken = Boolean(String(process.env.GITHUB_TOKEN || '').trim());
      const waitHint = resetAt
        ? ` Try again after ${new Date(Number(resetAt) * 1000).toISOString()}.`
        : '';
      return new AppError({
        status: 429,
        code: isRateLimited ? 'GITHUB_RATE_LIMIT' : 'GITHUB_FORBIDDEN',
        message: isRateLimited
          ? `GitHub rate limit reached.${hasGithubToken ? '' : ' Configure GITHUB_TOKEN on the server to increase limit.'}${waitHint}`
          : 'GitHub request was forbidden. Please try again later.',
      });
    }

    if (status === 401) {
      return new AppError({
        status: 401,
        code: 'EXTERNAL_UNAUTHORIZED',
        message: 'External service rejected the request.',
      });
    }

    if (status) {
      return new AppError({
        status: status >= 400 && status < 600 ? status : 502,
        code: 'EXTERNAL_SERVICE_ERROR',
        message: 'External service request failed. Please try again.',
      });
    }

    if (err.code === 'ECONNABORTED') {
      return new AppError({
        status: 504,
        code: 'UPSTREAM_TIMEOUT',
        message: 'External service timed out. Please try again.',
      });
    }

    return new AppError({
      status: 502,
      code: 'UPSTREAM_NETWORK_ERROR',
      message: 'Network error while contacting external service.',
    });
  }

  // Generic fallback
  return new AppError({
    status: err.status && Number.isInteger(err.status) ? err.status : 500,
    code: err.code && typeof err.code === 'string' ? err.code : 'INTERNAL_ERROR',
    message: err.message || 'Internal server error.',
    cause: err,
  });
}

function notFoundHandler(req, _res, next) {
  next(
    new AppError({
      status: 404,
      code: 'NOT_FOUND',
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    })
  );
}

function errorHandler(err, _req, res, _next) {
  const appErr = toAppError(err);

  const isProd = process.env.NODE_ENV === 'production';
  const status = appErr.status || 500;

  // Ensure we never leak internals for non-operational errors
  const safeMessage =
    appErr.isOperational === false && isProd ? 'Internal server error.' : appErr.message;

  if (!isProd) {
    // log full error in dev for debugging
    // eslint-disable-next-line no-console
    console.error('[Server Error]', err);
  } else {
    // eslint-disable-next-line no-console
    console.error('[Server Error]', safeMessage);
  }

  const payload = {
    error: safeMessage,
    code: appErr.code || 'INTERNAL_ERROR',
  };

  if (!isProd && appErr.details) payload.details = appErr.details;
  if (!isProd && err?.stack) payload.stack = err.stack;

  res.status(status).json(payload);
}

module.exports = { errorHandler, notFoundHandler };

