import { IsNotEmpty, IsString } from 'class-validator';
import { Exercise } from 'src/module/exercise/schema/exercise.schema';
import { Day } from 'src/module/day/schema/day.schema';
import { IsDayExist } from 'src/module/day/validator/is-day-exist';
import { IsExerciseExist } from 'src/module/exercise/validator/is-exercise-exist';

export class CreateExSessionDto {
  @IsNotEmpty()
  @IsString()
  @IsExerciseExist()
  exerciseId: Exercise | string;

  @IsNotEmpty()
  @IsString()
  @IsDayExist()
  dayId: Day | string;

  @IsNotEmpty()
  @IsString()
  icon: string;
}
