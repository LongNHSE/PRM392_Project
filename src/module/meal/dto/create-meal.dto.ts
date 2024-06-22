import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Day } from 'src/module/day/schema/day.schema';
import { IsDayExist } from 'src/module/day/validator/is-day-exist';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  @IsDayExist()
  dayId: Day | string;

  @IsNotEmpty()
  @IsNumber()
  mealIndex: number;

  @IsNotEmpty()
  @IsNumber()
  totalCalstd: number;

  @IsNotEmpty()
  @IsNumber()
  carbohydratedstd: number;

  @IsNotEmpty()
  @IsNumber()
  fiberstd: number;

  @IsNotEmpty()
  @IsNumber()
  proteinstd: number;

  @IsNotEmpty()
  @IsNumber()
  fatstd: number;

  @IsNotEmpty()
  @IsNumber()
  waterstd: number;

  @IsNotEmpty()
  @IsNumber()
  totalCal: number;

  @IsNotEmpty()
  @IsNumber()
  carbohydrated: number;

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
}
