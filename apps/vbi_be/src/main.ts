import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  // 1. Normalize API prefix to 'api'
  app.setGlobalPrefix('api');

  // 2. Enable versioning (e.g., /api/v1/...)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Enable ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 3. Unified response format { code, message, data }
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 4. Enable CORS and WebSocket Adapter
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));

  // 5. Generate Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('VBI API')
    .setDescription('The VBI API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 6. Start the application
  await app.listen(process.env.PORT ?? 3030, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
};

bootstrap()
  .then(() => {
    console.log('Application is running');
  })
  .catch((err) => {
    console.error('Application failed to start', err);
  });
