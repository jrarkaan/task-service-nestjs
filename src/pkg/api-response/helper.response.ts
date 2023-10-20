import { MetaEntity, ResponseEntity } from './model/response.entity';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
interface IHttpResponse {
  BadRequest(errorMessage: Error): Response<any, Record<any, any>>;
  StatusOK(message: string): Response<any, Record<any, any>>;
  Success(data: any, message: string): Response<any, Record<any, any>>;
  NotFound(message: string): Response<any, Record<any, any>>;
  ServerError(message: string): Response<any, Record<any, any>>;
}
export class HttpResponse implements IHttpResponse {
  private response: Response;
  constructor(resp: Response) {
    this.response = resp;
  }
  BadRequest(errorMessage: Error): Response<any, Record<any, any>> {
    const resp: MetaEntity = {
      message: errorMessage,
      status: HttpStatus.BAD_REQUEST,
      code: 'BAD_REQUEST',
    };
    return this.response.status(HttpStatus.BAD_REQUEST).send(resp);
  }

  StatusOK(message: string): Response<any, Record<any, any>> {
    try {
      const resp: MetaEntity = {
        message: message,
        status: HttpStatus.OK,
        code: 'STATUS_OK',
      };
      return this.response.status(HttpStatus.OK).send(resp);
    } catch (err) {
      console.error('err: ', err);
    }
  }

  Success(data: any, message: string): Response<any, Record<any, any>> {
    const resp: ResponseEntity = {
      message: message,
      status: HttpStatus.OK,
      code: 'SUCCESS',
      data: data,
    };
    return this.response.status(HttpStatus.OK).send(resp);
  }

  NotFound(message: string): Response<any, Record<any, any>> {
    const resp: MetaEntity = {
      message: message,
      status: HttpStatus.NOT_FOUND,
      code: 'NOT_FOUND',
    };
    return this.response.status(HttpStatus.NOT_FOUND).send(resp);
  }

  ServerError(message: string): Response<any, Record<any, any>> {
    const resp: MetaEntity = {
      message: message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
    };
    return this.response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resp);
  }
}
