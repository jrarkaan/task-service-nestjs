import {
  Module,
  ValidationPipe,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PostgresqlModule } from './pkg/database/postgresql/postgresql.module';
import { ConfigModule } from './app/config/config.module';
import { APP_PIPE } from '@nestjs/core';
import { entitiesList } from './entities.list';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { SentryModule } from './sentry/sentry.module';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { ProfilingIntegration } from '@sentry/profiling-node';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    PostgresqlModule.forRoot({ entities: entitiesList }),
    TaskModule,
    ConfigModule,
    SentryModule.forRoot({
      dsn: 'https://92d78fb507147ff68b07d10af95c6cb7@o1018177.ingest.sentry.io/4506097899732992',
      environment: 'production',
      integrations: [new ProfilingIntegration()],
      // Performance Monitoring
      tracesSampleRate: 1.0,
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
      debug: true,
    }),
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
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
