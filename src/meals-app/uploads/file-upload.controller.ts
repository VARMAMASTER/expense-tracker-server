// src/files/files.controller.ts
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuardMealsApp } from '../auth/jwt/jwt-auth.guard';
import { UploadFileDto } from './dto/upload-file';
import { FileUploadService } from './file-upload.service';
@UseGuards(JwtAuthGuardMealsApp)
@Controller('')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return await this.fileUploadService.uploadFile(file, body);
  }
}
