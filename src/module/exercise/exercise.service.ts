import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise } from './schema/exercise.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
  ) {}
  create(createExerciseDto: CreateExerciseDto) {
    return this.exerciseModel.create(createExerciseDto);
  }

  findAll() {
    return this.exerciseModel.find();
  }

  findOne(id: string) {
    return this.exerciseModel.findById(id);
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseModel.findByIdAndUpdate(id, updateExerciseDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.exerciseModel.findByIdAndUpdate(id, {
      isActive: false,
    });
  }
}
