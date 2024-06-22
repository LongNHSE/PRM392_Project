import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsActivityLevelExist } from 'src/module/activity_level/validator/is-activity-existed';
import { IsGoalExist } from 'src/module/goal/validator/is-goal-exist';
import { IsPreferenceExists } from 'src/module/preference/decorator/is-preference-existed';

export class CreateDietDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsActivityLevelExist()
  activityLevelId: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsPreferenceExists()
  preferenceId: string;

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

  height: number;

  weight: number;
}
