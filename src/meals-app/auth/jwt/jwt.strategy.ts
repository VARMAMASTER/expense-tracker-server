import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export default class JwtStrategyMealsApp extends PassportStrategy(
  Strategy,
  'jwt-meals-app',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_MEALS_APP,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      userId: payload.userId,
    };
  }
}
