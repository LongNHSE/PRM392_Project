import { PartialType } from '@nestjs/mapped-types';
import { CreateMacroNutrientDto } from './create-macro_nutrient.dto';

export class UpdateMacroNutrientDto extends PartialType(CreateMacroNutrientDto) {}
