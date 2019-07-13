import {Catch,ExceptionFilter, HttpException,ArgumentsHost, HttpStatus} from '@nestjs/common'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse()

        const request = ctx.getRequest();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const errorResponse = {
            code:status,
            timestamp : new Date().toLocaleDateString(),
            path : request.method,
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.message.error || exception.message || null : 'Internal Server Error'
        }

        return response.code(status).send(errorResponse)

    }
}