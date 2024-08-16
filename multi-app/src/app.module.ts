import { Module } from '@nestjs/common';
import { ExpenseTrackerModule } from './expense-tracker-app/app/app.module';
import { MealsModule } from './meals-app/app/app.module';

@Module({
  imports: [ExpenseTrackerModule, MealsModule],
})
export class AppModule {}
