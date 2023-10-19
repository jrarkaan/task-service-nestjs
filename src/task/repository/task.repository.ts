import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '../model/task.entity';

interface IUserRepository {
  create(data: Tasks): [number, Error];
}

@Injectable()
export class TaskRepository implements IUserRepository {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}
  create(data: Tasks): [number, Error] {
    try {
      const result: Tasks = this.taskRepository.create(data);
      this.taskRepository.save(result);
    } catch (e) {
      console.error(`--- Task Repository / Create / Error: ${e} ---`);
      return [500, e];
    }
    return [200, null];
  }
}
