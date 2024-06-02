import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './schema/exercise.schema';
import { IsExerciseExistsConstraint } from './validator/is-exercise-exist';

@Module({
  controllers: [ExerciseController],
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  providers: [ExerciseService, IsExerciseExistsConstraint],
})
export class ExerciseModule {}
