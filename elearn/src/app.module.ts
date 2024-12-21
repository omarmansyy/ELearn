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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';  // Import JwtModule

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/e-learning2'),
    UsersModule,
    CoursesModule,
    ModulesModule,
    QuizzesModule,
    ChatModule,
    ResponsesModule,
    ProgressModule,
    NotesModule,
    ForumModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKeyHere',  // Use environment variable or fallback to default
      signOptions: { expiresIn: '1h' },  // Set expiration time for JWT tokens
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
