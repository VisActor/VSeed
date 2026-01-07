import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaborationGateway } from './collaboration/collaboration.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CollaborationGateway],
})
export class AppModule {}
