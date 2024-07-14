import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
