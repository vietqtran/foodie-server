import { NestInterceptor, ExecutionContext, Injectable, CallHandler } from '@nestjs/common'
import { instanceToPlain as classToPlain } from 'class-transformer'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(map((data) => classToPlain(data)))
    }
}
