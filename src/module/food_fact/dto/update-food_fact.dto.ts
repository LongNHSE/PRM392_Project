import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodFactorDto } from './create-food_fact.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFoodFactorDto extends PartialType(CreateFoodFactorDto) {
  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  description: string;
}
