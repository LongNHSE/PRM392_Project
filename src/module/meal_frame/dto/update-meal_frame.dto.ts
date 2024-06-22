import { PartialType } from '@nestjs/mapped-types';
import { CreateMealFrameDto } from './create-meal_frame.dto';

export class UpdateMealFrameDto extends PartialType(CreateMealFrameDto) {}
