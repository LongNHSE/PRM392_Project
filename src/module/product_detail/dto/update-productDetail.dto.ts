import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDetailDto } from './create-productDetail.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDetailDto extends PartialType(
  CreateProductDetailDto,
) {
  @IsOptional()
  @IsString()
  billId: string;

  @IsOptional()
  @IsString()
  productId: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsNumber()
  total: number;
}
