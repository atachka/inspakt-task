import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authKeys = [
      'pdfAuthenticationKey',
      'pdfAuthenticationKey1',
      'pdfAuthenticationKey2',
      'pdfAuthenticationKey3',
      'pdfAuthenticationKey4',
      'pdfAuthenticationKey5',
    ];
    if (authKeys.includes(req.headers.authentication as string)) {
      req.body.authKey = req.headers.authentication;
      next();
    } else {
      throw new UnauthorizedException('Auth key is invalid');
    }
  }
}
