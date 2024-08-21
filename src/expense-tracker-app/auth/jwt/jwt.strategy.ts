import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyExpenseTracker extends PassportStrategy(
  Strategy,
  'jwt-expense-tracker',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_EXPENSE_TRACKER,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      userId: payload.userId,
    };
  }
}
