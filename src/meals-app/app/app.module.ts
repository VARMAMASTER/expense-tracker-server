import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core/router/router-module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI_MEALS_APP),
    RouterModule.register([
      {
        path: 'meals',
        module: MealsModule,
        children: [],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class MealsModule {}
