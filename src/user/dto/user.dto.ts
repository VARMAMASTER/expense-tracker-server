import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, {
    message: 'phoneNumber must be a valid 10-digit number',
  })
  readonly phoneNumber?: string;
}
