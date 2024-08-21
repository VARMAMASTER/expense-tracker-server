import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core/router/router-module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { FileUploadModule } from '../uploads/file-upload.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI_MEALS_APP, {
      connectionName: 'meals-app',
    }),
    CacheModule.register({
      isGlobal: true, // Optional: Set to true if you want the cache to be available globally
      ttl: 5, // seconds, optional (default is 5 seconds)
      max: 100, // maximum number of items in cache, optional
    }),
    RouterModule.register([
      {
        path: 'meals',
        module: MealsModule,
        children: [
          { path: 'auth', module: AuthModule },
          {
            path: 'files',
            module: FileUploadModule,
          },
          { path: 'category', module: CategoryModule },
        ],
      },
    ]),
    AuthModule,
    FirebaseModule,
    FileUploadModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class MealsModule {}
