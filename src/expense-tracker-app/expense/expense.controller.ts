import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateExpenseDto } from './dto/expense.dto';
import { ExpenseService } from './expense.service';
@UseGuards(JwtAuthGuard)
@Controller('')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() body: CreateExpenseDto) {
    return this.expenseService.create(body);
  }

  @Get(':userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.expenseService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
