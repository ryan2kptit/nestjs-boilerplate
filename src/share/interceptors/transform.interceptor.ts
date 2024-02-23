import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    return (
      next
        .handle()
        // .pipe(map((data) => ({ data })))
        .pipe(
          tap((data) =>
            this.logger.log(
              request?.method !== 'GET'
                ? `URL: ${request?.url} ${JSON.stringify(data)} ${
                    Date.now() - now
                  }ms`
                : `URL: ${request?.url} ${Date.now() - now}ms`,
            ),
          ),
        )
    );
  }
}
