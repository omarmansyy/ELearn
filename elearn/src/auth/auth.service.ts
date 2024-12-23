import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email/email.service';
import { User , UserDocument } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async registerUser(email: string, password: string, role: string): Promise<any> {
    if (!this.usersService.isValidRole(role)) {
        throw new Error('Invalid user role provided.');
    }
    
    const newUser = await this.usersService.create({ email, password, role });
    await this.emailService.sendVerificationEmail(newUser);
    return newUser;
}

  async verifyUser(token: string): Promise<boolean> {
    const decoded = this.jwtService.verify(token);
    return this.usersService.verifyEmail(decoded.email);
  }

  login(user: User) {
    const payload = { email: user.email,  role: user.role };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
}
