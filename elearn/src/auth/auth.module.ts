// src/auth/auth.module.ts
import { Module ,  forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule , JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constant';
import {EmailModule} from 'src/common/email/email.module'

@Module({
    imports: [
        JwtModule.register({
          secret: jwtConstants.secret ||'your_default_secret',  // Make sure this is defined in your environment or hard-coded securely
          signOptions: { expiresIn: jwtConstants.expiresIn}
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() =>EmailModule),
        forwardRef(() => UsersModule)
      ],
    providers: [AuthService, LocalStrategy, JwtService , JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService , JwtService],
})
export class AuthModule {}
