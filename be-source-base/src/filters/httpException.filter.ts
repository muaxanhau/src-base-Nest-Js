import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ExceptionResponseBaseModel } from 'src/models'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response<ExceptionResponseBaseModel>>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const errorMessage =
      status === 400
        ? ((exception.getResponse() as any).message as string[])
        : exception.message

    response.status(status).json({
      statusCode: status,
      method: request.method,
      path: request.url,
      timestamp: new Date(),
      message: errorMessage,
    })
  }
}
