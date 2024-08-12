import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateExpenseDto } from './dto/expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
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
    return this.expenseService.remove(+id);
  }
}
