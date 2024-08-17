// src/firebase/firebase.module.ts
import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [FirebaseModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
