import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constant';
import { EmailModule } from 'src/common/email/email.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret, // Use the secret from constants
      signOptions: { expiresIn: jwtConstants.expiresIn }, // Use the expiration time from constants
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), // JWT strategy is the default
    forwardRef(() => UsersModule),
    forwardRef(() => EmailModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Include LocalStrategy
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
