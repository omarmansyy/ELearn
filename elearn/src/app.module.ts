import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './courses/modules/modules.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';
import { ProgressModule } from './progress/progress.module';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/e-learning2'),
    UsersModule, CoursesModule, ModulesModule, QuizzesModule,ChatModule, ResponsesModule, ProgressModule, NotesModule, ForumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}