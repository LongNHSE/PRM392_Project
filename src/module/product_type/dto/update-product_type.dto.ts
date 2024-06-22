import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTypeDto } from './create-product_type.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
  @IsOptional()
  @IsString()
  productName: string;
}
