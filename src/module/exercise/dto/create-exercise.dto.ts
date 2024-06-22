import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  exName: string;

  @IsNotEmpty()
  @IsNumber()
  lowerWeight: number;

  @IsNotEmpty()
  @IsNumber()
  upperWeight: number;

  @IsNotEmpty()
  @IsNumber()
  calorexp: number;

  @IsOptional()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
