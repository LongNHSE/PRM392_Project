import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFoodTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
