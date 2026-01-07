import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const server = await app.listen(process.env.PORT ?? 3030);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const wss = new WebSocketServer({ server });

  wss.on('connection', (conn, req) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setupWSConnection(conn, req, { gc: true });
  });

  console.log(`Application is running on: ${await app.getUrl()}`);
};

bootstrap()
  .then(() => {
    console.log('Application is running');
  })
  .catch((err) => {
    console.error('Application failed to start', err);
  });
