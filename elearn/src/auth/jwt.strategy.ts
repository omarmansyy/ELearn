import { Injectable , UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constant'; // Ensure this contains the secret key

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy , 'jwt') {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your_default_secret',
        });
    }

    async validate(payload: any) {
        // Payload typically contains sub (subject, which is the user ID) and email
        const user = await this.usersService.findOne(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
