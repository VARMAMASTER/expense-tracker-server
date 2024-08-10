import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { createUserDto, loginUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signUp(body: createUserDto): Promise<UserDocument | any> {
    try {
      const { email, phoneNumber } = body;

      // Check if a user with the same email or phone number already exists
      const existingUser = await this.findExistingUser(email, phoneNumber);
      if (existingUser) {
        throw new BadRequestException(
          'A user with this email or mobile number already exists',
        );
      }

      // Create and save the new user
      const createUser = new this.userModel(body);
      const userData = await createUser.save();
      return {
        success: true,
        message: 'User created successfully',
        access_token: this.jwtService.sign({
          id: userData.id,
          userId: userData.id,
        }),
        data: userData,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  private async findExistingUser(
    email: string,
    phoneNumber: string,
  ): Promise<UserDocument | null> {
    return await this.userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
  }

  async login(body: loginUserDto) {
    try {
      const { email, password } = body;

      // Find the user by email
      const existingUser = await this.userModel.findOne({ email });
      if (!existingUser) {
        throw new BadRequestException('Invalid login credentials');
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid login password');
      }

      // Generate a JWT token if the login is successful
      const token = this.jwtService.sign({
        id: existingUser.id,
        userId: existingUser.id,
      });

      return {
        success: true,
        message: 'Login successful',
        access_token: token,
        data: existingUser,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
