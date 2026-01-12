import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HocuspocusServer } from './collaboration/hocuspocus-server';
import { PrismaService } from './app/prisma.service';

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
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
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
  await app.listen(3030, '0.0.0.0');

  // 7. Start Hocuspocus server on separate port
  const prisma = app.get(PrismaService);
  const hocuspocusServer = new HocuspocusServer(prisma);
  await hocuspocusServer.start();
};

bootstrap()
  .then(() => {
    console.log('🟢 Application is running:');
    console.log(`🟢 Nest       Server on: 0.0.0.0:3030`);
    console.log(`🟢 Hocuspocus server on: 0.0.0.0:1234`);
  })
  .catch((err) => {
    console.error('Application failed to start', err);
  });
