import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Meal, MealSchema } from '../schemas/meal.schema';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Meal.name, schema: MealSchema },
        { name: Category.name, schema: CategorySchema },
      ],
      'meals-app',
    ),
  ],
  exports: [MealService],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
