import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception?.message || 'Internal server error';
    const responseObject: any =
      exception instanceof HttpException ? exception?.getResponse() : null;

    if (request.path !== '/') {
      this.logger.error(
        responseObject
          ? `
          [${request.method}] ${request.path}
          [RESPONSE] ${JSON.stringify(responseObject)}
          [STACK] ${exception?.stack}
        `
          : `[URL] ${request.path} [STACK] ${exception?.stack}`,
      );
    }

    response.status(status).json({
      message,
      timestamp: new Date().toISOString(),
      errors: responseObject?.errors || responseObject?.message,
    });
  }
}
