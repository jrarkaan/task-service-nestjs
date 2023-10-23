import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SentryService } from '@ntegral/nestjs-sentry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(SentryService));
  await app.listen(3000);
}
bootstrap();
