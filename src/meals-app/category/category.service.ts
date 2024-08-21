import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CreateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name, 'meals-app') // Inject the Category model from the meals-app connection
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  // Create a new category
  async create(body: CreateCategoryDto): Promise<Category> {
    if (!body || !body.title || !body.color) {
      throw new BadRequestException(
        'Invalid input: title and color are required',
      );
    }

    try {
      const newCategory = new this.categoryModel(body);
      return await newCategory.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  // Find all categories
  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  // Find a category by ID
  async findOne(id: string): Promise<Category> {
    if (!id) {
      throw new BadRequestException('Invalid input: ID is required');
    }

    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to fetch category');
      }
    }
  }

  // Remove a category by ID
  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    if (!id) {
      throw new BadRequestException('Invalid input: ID is required');
    }

    try {
      const result = await this.categoryModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return { deleted: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to delete category');
      }
    }
  }
}
