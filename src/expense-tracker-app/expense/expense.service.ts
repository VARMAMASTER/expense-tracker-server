import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from '../schemas/expense.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(User.name, 'expense-tracker')
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Expense.name, 'expense-tracker')
    private readonly expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(body: CreateExpenseDto): Promise<any> {
    try {
      // Ensure the user exists before creating the expense
      const user = await this.userModel.findById(body.userId);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      // Create the new Expense document with the user's ID as a string
      const newExpense = new this.expenseModel({
        ...body,
        user: body.userId, // Store user ID as a string
      });

      const savedExpense = await newExpense.save();

      // Add the saved Expense's ObjectId to the user's expenses array as a string
      user.expenses.push(savedExpense?._id?.toString());
      await user.save();

      // Populate the user field in the savedExpense before returning
      await savedExpense.populate('user');

      return {
        success: true,
        message: 'Expense created successfully',
        data: savedExpense, // Return the populated Expense
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async findAllByUser(userId: string): Promise<any> {
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
      const expenses = await this.expenseModel.find({ user: userId }).exec();

      return { expenses: expenses, count: expenses.length };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  async remove(id: string): Promise<any> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid expense ID', 400);
      }

      const result = await this.expenseModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new HttpException('Expense not found', 404);
      } else {
        return { success: true, message: 'Expense deleted successfully' };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
