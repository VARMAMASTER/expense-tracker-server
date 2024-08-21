import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtStrategyMealsApp from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt-meals-app',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_MEALS_APP,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'meals-app',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyMealsApp],
  exports: [AuthService],
})
export class AuthModule {}
//
