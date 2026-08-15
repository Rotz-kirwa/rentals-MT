import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../config/logger.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    type: `https://api.mynyumba.co.ke/errors/${err.code || 'INTERNAL_SERVER_ERROR'}`,
    title: err.name || 'Internal Server Error',
    status: statusCode,
    detail: err.message || 'An unexpected error occurred.',
    instance: req.originalUrl,
    code: err.code || 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString(),
  };

  if (err instanceof ZodError) {
    res.status(400).json({
      ...errorResponse,
      status: 400,
      title: 'Validation Error',
      code: 'INVALID_INPUT',
      detail: 'One or more request parameters failed validation.',
      errors: err.errors,
    });
    return;
  }

  logger.error({ err, req: { method: req.method, url: req.url } }, 'API Error');

  res.status(statusCode).json(errorResponse);
}
