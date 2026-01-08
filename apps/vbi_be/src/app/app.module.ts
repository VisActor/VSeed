import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaborationGateway } from '../collaboration/collaboration.gateway';
import { PrismaPersistenceService } from '../collaboration/prisma-persistence.service';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { DocumentModule } from '../document/document.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, PostModule, DocumentModule],
  controllers: [AppController],
  providers: [
    AppService,
    CollaborationGateway,
    PrismaPersistenceService,
    PrismaService,
  ],
})
export class AppModule {}
