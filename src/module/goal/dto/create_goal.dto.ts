import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
  goalName: string;

  @IsNotEmpty()
  sign: number;
}
