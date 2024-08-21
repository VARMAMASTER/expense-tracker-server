import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Affordability, Complexity } from '../../utils/enums';
// Adjust the import path

export class MealDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(Affordability)
  affordability: Affordability;

  @IsEnum(Complexity)
  complexity: Complexity;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsInt()
  duration: number;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @IsBoolean()
  isGlutenFree: boolean;

  @IsBoolean()
  isVegan: boolean;

  @IsBoolean()
  isVegetarian: boolean;

  @IsBoolean()
  isLactoseFree: boolean;
}
