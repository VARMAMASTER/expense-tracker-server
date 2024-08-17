import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core/router';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ExpenseModule } from '../expense/expense.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI_Expense_TRACKER, {
      connectionName: 'expense-tracker',
    }),
    AuthModule,
    UserModule,
    ExpenseModule,
    RouterModule.register([
      {
        path: 'expense-tracker',
        module: ExpenseTrackerModule,
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'expense',
            module: ExpenseModule,
          },
          {
            path: 'user',
            module: UserModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ExpenseTrackerModule {}
