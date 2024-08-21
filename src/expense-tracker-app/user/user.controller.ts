import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuardExpenseTracker } from '../auth/jwt/jwt-auth.guard';
// Assuming you have a DTO for update
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuardExpenseTracker)
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<any> {
    return this.userService.update(id, body);
  }
}
