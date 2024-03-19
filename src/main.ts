import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configure } from './__shared__/config/app.config';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const certPath = path.resolve(__dirname, '..', 'server.cert');
  const keyPath = path.resolve(__dirname, '..', 'server.key');
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(keyPath)),
    cert: fs.readFileSync(path.resolve(certPath)),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    rawBody: true,
  });

  configure(app);

  // const port = app.get(ConfigService).get('port');
  // const env = app.get(ConfigService).get('env');
  await app.listen(5000);
  Logger.log(`Server running on 5000 in dev mode `);
}
bootstrap();
