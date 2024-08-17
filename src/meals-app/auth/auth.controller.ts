import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto, loginUserDto } from './dto/auth.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: createUserDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  login(@Body() body: loginUserDto) {
    return this.authService.login(body);
  }
}
