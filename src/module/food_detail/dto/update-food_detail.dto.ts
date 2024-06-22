import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDetailDto } from './create-food_detail.dto';

export class UpdateFoodDetailDto extends PartialType(CreateFoodDetailDto) {}
