import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './schema/exercise.schema';
import { IsExerciseExistsConstraint } from './validator/is-exercise-exist';
import { ImageService } from '../image/image.service';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [ExerciseController],
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  providers: [ExerciseService, IsExerciseExistsConstraint, ImageService],
})
export class ExerciseModule {}
