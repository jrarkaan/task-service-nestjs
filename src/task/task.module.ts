import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskRepository } from './repository/task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './model/task.entity';
import { TaskController } from './controller/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
