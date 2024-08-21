import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MealDto } from './dto/meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  create(@Body() body: MealDto) {
    return this.mealService.create(body);
  }

  @Get()
  findAll() {
    return this.mealService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: MealDto) {
    return this.mealService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }
}
