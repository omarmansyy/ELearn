import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async registerUser(name: string, email: string, password: string, role: string): Promise<any> {
    if (!this.usersService.isValidRole(role)) {
      throw new Error('Invalid user role provided.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersService.create(name, email, hashedPassword, role);
  }

  // Validate user credentials during login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (isMatch) {
        const { passwordHash, ...result } = user.toObject();
        return result;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }
  }

  // Generate JWT after successful login
  async login(user: User) {
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
