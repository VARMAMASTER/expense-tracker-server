import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID should not be empty');
    }

    try {
      const user = await this.userModel.findById(id).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { success: true, data: user };
    } catch (error) {
      console.error(error);

      // Re-throw error for proper NestJS error handling
      throw new BadRequestException('User not found');
    }
  }
}
