import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        ...(exception.getResponse() as object),
        message:
          exception.getResponse()['message'] instanceof String
            ? exception.getResponse()['message']
            : exception.getResponse()['message'] instanceof Array
              ? exception.getResponse()['message'].join('\n')
              : 'Contact support for more information.',
      });
    }

    if (
      typeof exception === 'object' &&
      exception.message &&
      Number(exception.status)
    ) {
      return response.status(exception.status).json({
        statusCode: exception.status,
        message: exception.message,
      });
    }

    console.log(exception);

    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
