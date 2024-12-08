import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const user = req['user']; // assuming 'user' is already attached from a previous auth middleware
    const roles = ['admin', 'instructor']; // example roles that have access

    if (user && roles.includes(user.role)) {
      next();
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
