import { IUserPayload } from '@main-module/auth/models/interfaces/payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: IUserPayload): Promise<IUserPayload> {
    if (payload.iss === process.env.ORIGIN) {
      return payload;
    }

    throw new UnauthorizedException('No tienes permiso para acceder a este sistema. Si esto es un error, ponte en contacto con el administrador');
  }
}
