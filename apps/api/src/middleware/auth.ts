import { Request, Response, NextFunction } from 'express';
import { verifyToken, AuthTokenPayload } from '../utils/auth.js';
import { UserRole } from '@my-nyumba/database';

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.mn_token) {
    token = req.cookies.mn_token;
  }

  if (!token) {
    res.status(401).json({
      type: 'https://api.mynyumba.co.ke/errors/UNAUTHORIZED',
      title: 'Unauthorized',
      status: 401,
      detail: 'Missing or invalid Authorization credential.',
      code: 'UNAUTHORIZED',
    });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (_err) {
    res.status(401).json({
      type: 'https://api.mynyumba.co.ke/errors/INVALID_TOKEN',
      title: 'Unauthorized',
      status: 401,
      detail: 'Token is expired or invalid.',
      code: 'INVALID_TOKEN',
    });
  }
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        type: 'https://api.mynyumba.co.ke/errors/UNAUTHORIZED',
        title: 'Unauthorized',
        status: 401,
        detail: 'User authentication required.',
        code: 'UNAUTHORIZED',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      res.status(403).json({
        type: 'https://api.mynyumba.co.ke/errors/FORBIDDEN',
        title: 'Forbidden',
        status: 403,
        detail: `Role ${req.user.role} does not have permission to access this resource.`,
        code: 'FORBIDDEN',
      });
      return;
    }

    next();
  };
}
