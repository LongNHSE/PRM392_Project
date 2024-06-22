import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFoodFactorDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
