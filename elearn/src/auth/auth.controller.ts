import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register a new user
  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string; role: string }) {
    return await this.authService.registerUser(body.name, body.email, body.password, body.role);
  }

  // Login and generate JWT token
  @UseGuards(AuthGuard('local')) // Ensures credentials are checked before generating a JWT
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);  // Passes the authenticated user to the service for JWT generation
  }
}
