import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @IsNotEmpty()
  @IsString()
  billId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
