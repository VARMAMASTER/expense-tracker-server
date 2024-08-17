import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'expense-tracker')
    private readonly userModel: Model<UserDocument>,
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean; data: User; message: string }> {
    if (!id) {
      throw new BadRequestException('ID should not be empty');
    }

    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, {
          new: true, // Return the updated document
          runValidators: true, // Ensure the update adheres to schema validation
        })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return {
        success: true,
        message: 'Details Updated Successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Failed to update user');
    }
  }
}
