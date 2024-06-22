import { PartialType } from '@nestjs/mapped-types';
import { CreateMealStandardDto } from './create-meal_standard.dto';

export class UpdateMealStandardDto extends PartialType(CreateMealStandardDto) {}
