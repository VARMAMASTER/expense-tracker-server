import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Category } from '../../utils/enums';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
