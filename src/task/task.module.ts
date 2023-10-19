import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './model/task.entity';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
