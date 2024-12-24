import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from '../dto/RegisterRequestDto';
import { ObjectId, Types } from 'mongoose';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    async register(user: RegisterRequestDto): Promise<string> {
        const existingUser = await this.usersService.findByEmail(user.email);
        if (existingUser) {
          throw new ConflictException('email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser: RegisterRequestDto = { ...user, password: hashedPassword };
        await this.usersService.createUser(newUser);
        return 'registered successfully';
      }

      async signIn(email: string, password: string): Promise<{ access_token: string, payload: { userid: ObjectId, role: string } }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { userid: user._id as ObjectId, role: user.role };
    
        return {
            access_token: await this.jwtService.signAsync(payload),
            payload
        };
    }
    
}