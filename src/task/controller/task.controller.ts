import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Response } from 'express';
import { TaskDto } from '../model/task.dto';
import { HttpResponse } from '../../pkg/api-response/helper.response';

interface ITaskController {
  // @ts-ignore
  create(@Res() response: Response, @Body() taskPayload: TaskDto): void
  // @ts-ignore
  loadTesting(@Res() response: Response): void
}
@Controller('task')
export class TaskController implements ITaskController {
  constructor(private taskService: TaskService) {}
  @Post('')
  create(@Res() response: Response, @Body() taskPayload: TaskDto): void {
    const httpResponse: HttpResponse = new HttpResponse(response);
    try {
      const [httpStatus, messageError] = this.taskService.create(taskPayload);
      if (messageError !== null) {
        httpResponse.ServerError(messageError.message)
      } else {
        httpResponse.StatusOK('Success')
      }
    } catch (error) {
      httpResponse.ServerError(error);
    }
  }
  @Get('/load-testing/heavy')
  loadTesting(@Res() response: Response): void {
    let total = 0;
    for (let i = 0; i < 5_000_000; i++) {
      total++;
    }
    response.send(`The result of the CPU intensive task is ${total}\n`);
  }
}
