import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { ThreadSchema } from './schemas/thread.schema';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { ReplySchema } from './schemas/reply.schema';
import { NotificationsModule } from 'src/notfications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Thread', schema: ThreadSchema }]),
    MongooseModule.forFeature([{ name: 'Reply', schema: ReplySchema }]),NotificationsModule,
  ],
  controllers: [ThreadController, ReplyController],
  providers: [ThreadService, ReplyService],
})
export class ForumModule {}
