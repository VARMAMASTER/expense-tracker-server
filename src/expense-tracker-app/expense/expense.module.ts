import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from '../schemas/expense.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Expense.name, schema: ExpenseSchema },
        { name: User.name, schema: UserSchema },
      ],
      'expense-tracker',
    ),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
