import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));
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
