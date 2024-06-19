import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productTypeID: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  brand: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsNumber()
  volumn: number;

  @IsNotEmpty()
  @IsString()
  effect: string;

  @IsNotEmpty()
  @IsString()
  rate: string;

  @IsNotEmpty()
  @IsNumber()
  purchase: number;
}
