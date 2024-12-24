import { Body, Controller, HttpStatus, Post, HttpException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from '../dto/RegisterRequestDto';
import { SignInDto } from '../dto/SignInDto';
import { getCookieOptions } from 'src/common/utils/cookieHelper';
import { Response } from 'express';  // Ensure this import is correct


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        try {
            const result = await this.authService.signIn(signInDto.email, signInDto.password);

            // Correct setting of the SameSite option based on the environment
            res.cookie('Authentication', result.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',  // True in production, false otherwise
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // 'none' requires secure: true
                maxAge: 3600000,  // 1 hour
                path: '/'
            });

            return res.status(HttpStatus.OK).json({
                message: 'Login successful',
                user: result.payload
            });
        } catch (error) {
            console.error('Login failed:', error);
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }


  @Post('register')
  async signup(@Body() registerRequestDto: RegisterRequestDto) {
    try {
      // Call the AuthService to handle registration
      const result = await this.authService.register(registerRequestDto);

      // Return a success response with HTTP 201 Created status
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: result,
      };
    } catch (error) {
      // Handle specific errors, such as email already exists or validation errors
      if (error.status === 409) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'User already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      // Catch any other errors and throw a generic internal server error
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during registration',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  


}