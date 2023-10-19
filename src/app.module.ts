import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PostgresqlModule } from './pkg/database/postgresql/postgresql.module';
import { ConfigModule } from './app/config/config.module';
import { APP_PIPE } from '@nestjs/core';
import { entitiesList } from './entities.list';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    PostgresqlModule.forRoot({ entities: entitiesList }),
    TaskModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule {}
