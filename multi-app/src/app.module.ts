import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseTrackerModule } from './expense-tracker-app/app/app.module';
import { MealsModule } from './meals-app/app/app.module';

@Module({
  imports: [ExpenseTrackerModule, MealsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
