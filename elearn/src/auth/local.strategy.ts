// src/auth/local.strategy.ts
import { Strategy } from 'passport-local'; // Correct import for local strategy
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy , 'jwt') {
    constructor(private authService: AuthService ) {
        super({
            usernameField: 'email',  // Use 'email' to authenticate if that's your identifier
            passwordField: 'password',  // Explicitly setting the default field for password
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return user;
    }
}
