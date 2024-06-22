import { PartialType } from '@nestjs/mapped-types';
import { CreateMacroGroupDto } from './create-macro_group.dto';

export class UpdateMacroGroupDto extends PartialType(CreateMacroGroupDto) {}
