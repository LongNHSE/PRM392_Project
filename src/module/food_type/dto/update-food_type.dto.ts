import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodTypeDto } from './create-food_type.dto';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateFoodTypeDto extends PartialType(CreateFoodTypeDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
