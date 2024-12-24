import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {User , UserSchema } from './users.schema';
import { AuthenticationMiddleware } from '../auth/middleware/authentication.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/authentication.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // Exporting UsersService if it needs to be used in other modules
})

// @Module({
//   imports:[ MongooseModule.forFeature([{ name: 'student', schema: StudentSchema }])],
//   controllers: [StudentController],
//   providers: [StudentService,{
//     provide: APP_GUARD, // to apply guard globally to all routes instead of specifying one by one
//     useClass: AuthGuard,
//   },],
//   exports:[StudentService]
// })




export class UsersModule  implements NestModule {
   configure(consumer: MiddlewareConsumer) {
     consumer
       .apply(AuthenticationMiddleware)
       .forRoutes(UsersController);
   }
 }{}

