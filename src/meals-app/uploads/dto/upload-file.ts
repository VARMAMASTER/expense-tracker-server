// src/files/dto/upload-file.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  CategoryId: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  subType: string;
}
