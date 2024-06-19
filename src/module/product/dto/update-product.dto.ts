import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  productTypeID: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  brand: string;

  @IsOptional()
  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  effect: string;

  @IsOptional()
  @IsString()
  rate: string;

  @IsOptional()
  @IsNumber()
  purchase: number;
}
