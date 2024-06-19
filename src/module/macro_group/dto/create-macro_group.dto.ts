import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';
import { IsMacroNutrientExisted } from 'src/module/macro_nutrient/decorator/is-macro-nutrient-existed';

export class CreateMacroGroupDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsMacroNutrientExisted()
  macronutrientId: string;

  @IsNotEmpty()
  @IsNumber()
  ratio: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
