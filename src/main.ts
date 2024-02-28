import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configure } from './__shared__/config/app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  configure(app);

  // const port = app.get(ConfigService).get('port');
  // const env = app.get(ConfigService).get('env');
  await app.listen(5000);
  Logger.log(`Server running on 5000 in dev mode `);
}
bootstrap();
