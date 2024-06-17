import { PartialType } from '@nestjs/mapped-types';
import { CreateMealItemDto } from './create-meal_item.dto';

export class UpdateMealItemDto extends PartialType(CreateMealItemDto) {}
