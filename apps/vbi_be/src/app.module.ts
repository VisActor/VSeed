import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YjsGateway } from './yjs/yjs.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, YjsGateway],
})
export class AppModule {}
