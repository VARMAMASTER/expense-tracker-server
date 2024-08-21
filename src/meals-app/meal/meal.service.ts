import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MealDto } from './dto/meal.dto';

import { Category, CategoryDocument } from '../schemas/category.schema';
import { Meal, MealDocument } from '../schemas/meal.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name, 'meals-app')
    private readonly mealModel: Model<MealDocument>,
    @InjectModel(Category.name, 'meals-app')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(body: MealDto) {
    try {
      const createdMeal = new this.mealModel(body);
      return await createdMeal.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create meal');
    }
  }

  async findAll() {
    try {
      return await this.mealModel.find().populate('categories').exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve meals');
    }
  }

  async findOne(id: string) {
    try {
      const meal = await this.mealModel
        .findById(id)
        .populate('categories')
        .exec();
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
      return meal;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to retrieve meal');
    }
  }

  async update(id: string, body: MealDto) {
    try {
      const updatedMeal = await this.mealModel
        .findByIdAndUpdate(id, body, { new: true })
        .populate('categories')
        .exec();
      if (!updatedMeal) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
      return updatedMeal;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update meal');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.mealModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
      return { message: `Meal with ID ${id} has been deleted` };
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete meal');
    }
  }
}
