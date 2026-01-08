import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('VBI API')
    .setDescription('The VBI API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3030);

  console.log(`Application is running on: ${await app.getUrl()}`);
};

bootstrap()
  .then(() => {
    console.log('Application is running');
  })
  .catch((err) => {
    console.error('Application failed to start', err);
  });
