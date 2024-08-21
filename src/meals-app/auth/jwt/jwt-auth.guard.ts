import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuardMealsApp extends AuthGuard('jwt-meals-app') {}
