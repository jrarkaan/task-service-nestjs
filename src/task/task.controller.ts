import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { TaskDto } from './model/task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('')
  create(@Res() response: Response, @Body() taskPayload: TaskDto) {
    try {
      const [httpStatus, messageError] = this.taskService.create(taskPayload);
      if (messageError !== null) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          status_code: httpStatus,
          result: null,
          message: 'internal server errror',
        });
      } else {
        response.status(HttpStatus.OK).send({
          status_code: httpStatus,
          result: null,
          message: 'Success',
        });
      }
    } catch (error) {
      response
        .status(error ? error.status : HttpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status_code: error ? error.status : 500,
          result: null,
          message: error.response.error,
        });
    }
  }
}