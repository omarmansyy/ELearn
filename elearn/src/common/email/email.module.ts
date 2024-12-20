// Example of using forwardRef in EmailModule if it depends back on AuthModule
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import {EmailService} from 'src/common/email/email.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    forwardRef(() =>AuthModule),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
