import { PartialType } from '@nestjs/mapped-types';
import { CreatePopupDetailDto } from './create-popupDetail.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePopupDetailDto extends PartialType(CreatePopupDetailDto) {
  @IsOptional()
  @IsString()
  popupId: string;

  @IsOptional()
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  theme: string;
}
