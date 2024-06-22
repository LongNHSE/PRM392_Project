import { PartialType } from '@nestjs/mapped-types';
import { CreateExSessionDto } from './create-ex_session.dto';

export class UpdateExSessionDto extends PartialType(CreateExSessionDto) {}
