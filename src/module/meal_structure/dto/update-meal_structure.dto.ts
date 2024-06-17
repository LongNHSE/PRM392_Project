import { PartialType } from '@nestjs/mapped-types';
import { CreateMealStructureDto } from './create-meal_structure.dto';

export class UpdateMealStructureDto extends PartialType(CreateMealStructureDto) {}
