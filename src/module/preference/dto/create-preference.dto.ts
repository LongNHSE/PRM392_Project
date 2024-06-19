import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePreferenceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  carbohydrate: number;

  @IsNumber()
  @IsNotEmpty()
  fiber: number;

  @IsNumber()
  @IsNotEmpty()
  protein: number;

  @IsNumber()
  @IsNotEmpty()
  standardProtein: number;

  @IsNumber()
  @IsNotEmpty()
  fat: number;

  @IsNumber()
  @IsNotEmpty()
  water: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
