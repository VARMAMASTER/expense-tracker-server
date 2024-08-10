import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('sign-up')
  // signUp(@Body() body: createUserDto) {
  //   return this.authService.signUp(body);
  // }

  // @Post('login')
  // login(@Body() body: loginUserDto) {
  //   return this.authService.login(body);
  // }
}
