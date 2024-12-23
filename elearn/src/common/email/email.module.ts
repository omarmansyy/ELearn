import { Module } from '@nestjs/common';
import { EmailService } from 'src/common/email/email.service';
import { JwtModule } from '@nestjs/jwt';  // Import JwtModule to make JwtService available

@Module({
  imports: [JwtModule],  
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
