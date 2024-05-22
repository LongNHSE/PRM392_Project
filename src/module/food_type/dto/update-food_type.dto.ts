import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodTypeDto } from './create-food_type.dto';

export class UpdateFoodTypeDto extends PartialType(CreateFoodTypeDto) {}
