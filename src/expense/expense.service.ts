import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from '../schemas/expense.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<ExpenseDocument>,
  ) {}
  async create(body: CreateExpenseDto): Promise<Expense> {
    try {
      // Ensure the user exists before creating the expense
      const user = await this.userModel.findById(body.userId);
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const createExpense = new this.expenseModel({
        ...body,
        user: body.userId, // Set the user field with userId
      });

      const expense = await createExpense.save();
      return expense;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
  async findAllByUser(userId: string): Promise<Expense[]> {
    try {
      // Validate the userId as a valid ObjectId
      if (!Types.ObjectId.isValid(userId)) {
        throw new HttpException('Invalid user ID ', 400);
      }

      // Check if the user exists
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      // Find all expenses by the user
      return this.expenseModel.find({ user: userId }).exec();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
