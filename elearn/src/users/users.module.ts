import { Module , forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {AuthModule} from 'src/auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService ],
  exports: [UsersService] // Exporting UsersService if it needs to be used in other modules
})
export class UsersModule {}
