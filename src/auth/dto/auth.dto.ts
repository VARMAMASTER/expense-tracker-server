import { IsNotEmpty, IsString } from 'class-validator';

import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsPhoneNumber('IN')
  phoneNumber?: string;

  @IsString()
  @Length(1, 255)
  address?: string;

  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class loginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
