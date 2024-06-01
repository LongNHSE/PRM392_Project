import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsActivityLevelExist } from 'src/module/activity_level/validator/is-activity-existed';
import { IsGoalExist } from 'src/module/goal/validator/is-goal-exist';

export class CreateDietDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsActivityLevelExist()
  activityLevelId: string;

  @IsNotEmpty()
  @IsString()
  @IsGoalExist()
  goalId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  main: number;

  @IsNotEmpty()
  @IsNumber()
  side: number;

  @IsNotEmpty()
  @IsNumber()
  session: number;

  @IsNotEmpty()
  @IsNumber()
  amountOfChange: number;
}
