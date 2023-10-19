import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { TaskDto } from './model/task.dto';

interface ITaskController {
  // @ts-ignore
  create(@Res() response: Response, @Body() taskPayload: TaskDto): void
}

@Controller('task')
export class TaskController implements ITaskController {
  constructor(private taskService: TaskService) {}
  @Post('')
  create(@Res() response: Response, @Body() taskPayload: TaskDto) {
    try {
      const [httpStatus, messageError] = this.taskService.create(taskPayload);
      if (messageError !== null) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          status_code: httpStatus,
          result: null,
          message: messageError.message,
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
