import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Food } from 'src/module/food/schema/food.schema';
import { Meal } from 'src/module/meal/schema/meal.schema';
import { IsMealExisted } from 'src/module/meal/validator/is-meal-existed.';

export class CreateFoodDetailDto {
  @IsNotEmpty()
  @IsString()
  @IsMealExisted()
  mealId: Meal | string;

  @IsNotEmpty()
  @IsString()
  foodId: Food | string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  totalCal: number;

  @IsNotEmpty()
  @IsNumber()
  carborhydrated: number;

  @IsNotEmpty()
  @IsNumber()
  fiber: number;

  @IsNotEmpty()
  @IsNumber()
  protein: number;

  @IsNotEmpty()
  @IsNumber()
  fat: number;

  @IsNotEmpty()
  @IsNumber()
  water: number;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
