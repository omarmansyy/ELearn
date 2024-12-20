import { Controller, Post, Body, Get, Query ,UseGuards , Request,  HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: {name:string, email: string, password: string, role: string }) {
    return await this.authService.registerUser(body.name ,body.email, body.password, body.role);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    return await this.authService.verifyUser(token);
  }
  @UseGuards(AuthGuard('local')) // Ensures credentials are checked before generating a JWT
    @Post('login')
    async login(@Request() req) {
        // This route is accessed after successful local auth guard check
        if (!req.user.isEmailVerified) {
            throw new HttpException('Email not verified', HttpStatus.FORBIDDEN);
        }
        return this.authService.login(req.user);
    }
}
