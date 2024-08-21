import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuardExpenseTracker extends AuthGuard(
  'jwt-expense-tracker',
) {}
