import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskDto } from './model/task.dto';
import { Tasks } from './model/task.entity';
import { v4 as uuidv4 } from 'uuid';

interface ITaskService {
  create(data: TaskDto): [number, Error];
}

@Injectable()
export class TaskService implements ITaskService {
  constructor(private taskRepo: TaskRepository) {}
  create(data: TaskDto): [number, Error] {
    try {
      let taskEntity: Tasks;
      const createdAt: Date = new Date();
      // eslint-disable-next-line prefer-const
      taskEntity = {
        id: null,
        uuid: uuidv4(),
        task_description: data.task_description,
        created_at: createdAt,
        updated_at: null,
      };
      console.info("taskEntity: ", taskEntity);
      this.taskRepo.create(taskEntity);
    } catch (e) {
      return [500, e];
    }
    return [200, null];
  }
}
