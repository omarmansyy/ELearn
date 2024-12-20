import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email/email.service';
import { User  } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async registerUser(name:string ,email: string, password: string, role: string): Promise<any> {
    if (!this.usersService.isValidRole(role)) {
        throw new Error('Invalid user role provided.');
    }
    
    const newUser = await this.usersService.create({ name ,email, password, role });
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
// src/auth/auth.service.ts
async validateUser(email: string, password: string): Promise<any> {
  const user = await this.usersService.findOneByEmail(email); // Assume this method fetches a user by email
  if (user && user.passwordHash === password) {  // Implement proper password hashing and comparison
      const { passwordHash, ...result } = user;  // Exclude password from the returned object
      return result;
  }
  return null;
}

}
