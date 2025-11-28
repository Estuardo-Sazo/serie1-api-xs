import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        'change_this_secret',
      ),
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      uuid: payload.uuid,
      id: payload.sub,
      role: payload.role,
    };
  }
}
