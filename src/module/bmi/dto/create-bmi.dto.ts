import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBmiDto {
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;
}
