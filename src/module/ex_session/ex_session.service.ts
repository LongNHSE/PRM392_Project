import { Injectable } from '@nestjs/common';
import { CreateExSessionDto } from './dto/create-ex_session.dto';
import { UpdateExSessionDto } from './dto/update-ex_session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise } from '../exercise/schema/exercise.schema';
import { Model } from 'mongoose';
import { ExSession } from './schema/ex_session.schema';

@Injectable()
export class ExSessionService {
  constructor(
    @InjectModel(ExSession.name) private exSessionModel: Model<ExSession>,
  ) {}
  create(createExSessionDto: CreateExSessionDto) {
    return this.exSessionModel.create(createExSessionDto);
  }

  findAll() {
    return this.exSessionModel.aggregate([
      {
        $lookup: {
          from: Exercise.name,
          localField: 'exerciseId',
          foreignField: '_id',
          as: 'exercise',
        },
      },
    ]);
  }

  findOne(id: string) {
    return this.exSessionModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: Exercise.name,
          localField: 'exerciseId',
          foreignField: '_id',
          as: 'exercise',
        },
      },
    ]);
  }

  update(id: string, updateExSessionDto: UpdateExSessionDto) {
    return this.exSessionModel.findByIdAndUpdate(id, updateExSessionDto, {
      new: true,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} exSession`;
  }
}
