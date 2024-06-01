import { PartialType } from '@nestjs/mapped-types';
import { CreateBmiDto } from './create-bmi.dto';

export class UpdateBmiDto extends PartialType(CreateBmiDto) {}
