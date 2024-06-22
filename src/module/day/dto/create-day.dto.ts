import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Diet } from 'src/module/diet/schema/diet.schema';
import { IsDietExist } from 'src/module/diet/validator/is-diet-exist';

export class CreateDayDto {
  @IsNotEmpty()
  @IsString()
  @IsDietExist()
  dietId: Diet | string;

  @IsNotEmpty()
  @IsNumber()
  index: number;

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
