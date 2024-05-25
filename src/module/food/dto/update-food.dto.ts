import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { IsFoodTypeExisted } from 'src/module/food_type/validator/is-food-existed';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @IsOptional()
  @IsString()
  @IsFoodTypeExisted()
  typeId: string;

  @IsOptional()
  @IsString()
  foodName: string;

  @IsOptional()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsNumber()
  caloricintake: number;

  @IsOptional()
  @IsNumber()
  carbonhydrate: number;

  @IsOptional()
  @IsNumber()
  fiber: number;

  @IsOptional()
  @IsNumber()
  protein: number;

  @IsOptional()
  @IsNumber()
  fat: number;

  @IsOptional()
  @IsNumber()
  water: number;

  @IsOptional()
  @IsString()
  description: string;
}
