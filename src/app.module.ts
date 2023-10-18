import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PostgresqlModule } from './pkg/database/postgresql/postgresql.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [TaskModule, PostgresqlModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
