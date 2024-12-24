// src/middleware/authentication.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer YOUR_TOKEN_HERE
    if (!token) {
      res.status(401).send({ error: 'No token provided' });
      return;
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET); // Ensure your JWT_SECRET is set in your environment
      req['user'] = decoded;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Invalid token' });
    }
  }
}
