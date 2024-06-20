import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsFoodTypeExisted } from 'src/module/food_type/validator/is-food-existed';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  @IsFoodTypeExisted()
  typeId: string;

  @IsNotEmpty()
  @IsString()
  foodName: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsNumber()
  caloricintake: number;

  @IsNotEmpty()
  @IsNumber()
  carbohydrate: number;

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
  description: string;
}
