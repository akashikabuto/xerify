import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ChatGateway } from 'src/chat/chat.gateway';
import { IAppConfig } from '../interfaces';
import { HttpsIoAdapter } from '../https-io.adapter';

export function appConfig(): IAppConfig {
  return {
    port: +process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
}

export function configureSwagger(app: INestApplication): void {
  const API_TITLE = 'Xerify';
  const API_DESCRIPTION = 'API Doc. for Xerify API';
  const API_VERSION = '1.0';
  const SWAGGER_URL = '/swagger';
  const options = new DocumentBuilder()
    .setTitle(API_TITLE)
    .setDescription(API_DESCRIPTION)
    .setVersion(API_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document, {
    customSiteTitle: 'Xerify API',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
      apisSorter: 'alpha',
      operationsSorter: 'method',
      tagsSorter: 'alpha',
    },
  });
}

export function chatSetup(app: INestApplication): void {
  app.get(ChatGateway);
  app.useWebSocketAdapter(new HttpsIoAdapter(app));
}

export function configure(app: INestApplication): void {
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*', preflightContinue: false });
  // corsConfig()
  chatSetup(app);
  configureSwagger(app);
  const configService = app.get(ConfigService<IAppConfig>);
  if (configService.get('swaggerEnabled')) {
    configureSwagger(app);
  }
}
