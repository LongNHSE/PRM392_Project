import { PartialType } from '@nestjs/mapped-types';
import { CreatePopupDto } from './create-popup.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePopupDto extends PartialType(CreatePopupDto) {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  theme: string;
}
