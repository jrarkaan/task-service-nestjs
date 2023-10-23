import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
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
      const con = getConnection();
      console.info('conf: ', con);
      this.taskRepository.save(result);
    } catch (e) {
      console.error(`--- Task Repository / Create / Error: ${e} ---`);
      return [500, e];
    }
    return [200, null];
  }
}
