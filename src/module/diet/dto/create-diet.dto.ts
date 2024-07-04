import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsActivityLevelExist } from 'src/module/activity_level/validator/is-activity-existed';
import { IsGoalExist } from 'src/module/goal/validator/is-goal-exist';
import { IsPreferenceExists } from 'src/module/preference/decorator/is-preference-existed';

export class CreateDietDto {
  @ApiProperty({ description: 'User ID', example: '507f1f77bcf86cd799439011' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsActivityLevelExist()
  @ApiProperty({
    description: 'Activity Level ID',
    example: '507f1f77bcf86cd799439011',
  })
  activityLevelId: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsPreferenceExists()
  @ApiProperty({
    description: 'Preference ID',
    example: '507f1f77bcf86cd799439011',
  })
  preferenceId: string;

  @IsNotEmpty()
  @IsString()
  @IsGoalExist()
  @ApiProperty({ description: 'Goal ID', example: '507f1f77bcf86cd799439011' })
  goalId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Duration', example: 30 })
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Main', example: 3 })
  main: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Side', example: 2 })
  side: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Session', example: 5 })
  session: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Amount of Change', example: 1 })
  amountOfChange: number;

  @ApiProperty({ description: 'Height', example: 175, required: false })
  height: number;

  @ApiProperty({ description: 'Weight', example: 70, required: false })
  weight: number;
}
