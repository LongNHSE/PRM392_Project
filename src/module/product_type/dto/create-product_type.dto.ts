import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductTypeDto {
  @IsNotEmpty()
  @IsString()
  typeName: string;

  @IsNotEmpty()
  @IsNumber()
  purchase: number;
}
