import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    console.log('AllExceptionsFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (
      typeof exception === 'object' &&
      exception.message &&
      exception.status
    ) {
      return response.status(exception.status).json({
        statusCode: exception.status,
        message: exception.message,
      });
    }

    console.log('Exception:', exception);
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
