import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdConversionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { id } = request.params;

    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ObjectId format');
      }

      request.params.id = new Types.ObjectId(id);
    }

    // if (request.body && request.body.someId) {
    //   request.body.someId = new Types.ObjectId(request.body.someId);
    // }

    return next.handle();
  }
}
