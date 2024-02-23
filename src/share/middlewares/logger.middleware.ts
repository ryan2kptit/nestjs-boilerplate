import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('[REQUEST]');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    const { statusCode } = response;

    this.logger.log(
      `${method} ${originalUrl} ${statusCode} - BODY: ${JSON.stringify(
        request.body,
      )} - PARAM: ${JSON.stringify(request.params)}`,
    );

    next();
  }
}
