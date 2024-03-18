import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { configure } from './__shared__/config/app.config';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/home/ec2-user/certs/xertify2023.key'),
    cert: fs.readFileSync(
      '/home/ec2-user/certs/xertify2023.crt',
    ),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    rawBody: true,
  });

  //Habilitar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
   });
  //const app = await NestFactory.create(AppModule, {
  //  rawBody: true,
  //});

  configure(app);

  // const port = app.get(ConfigService).get('port');
  // const env = app.get(ConfigService).get('env');
  await app.listen(5000);
  Logger.log(`Server running on 5000 in dev mode `);
}
bootstrap();
