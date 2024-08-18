// src/firebase/firebase.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from '../firebase/firebase.module';
import { Media, MediaSchema } from '../schemas/media-object.schema';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature(
      [{ name: Media.name, schema: MediaSchema }],
      'meals-app',
    ),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
