import { Injectable } from '@nestjs/common';
import { CreateMealFrameDto } from './dto/create-meal_frame.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MealFrame } from './schema/meal_frame.schema';
import { Model } from 'mongoose';

@Injectable()
export class MealFrameService {
  constructor(
    @InjectModel(MealFrame.name)
    private readonly mealFrameModel: Model<MealFrame>,
  ) {}
  create(createMealFrameDto: CreateMealFrameDto) {
    return this.mealFrameModel.create(createMealFrameDto);
  }

  findAll() {
    return this.mealFrameModel
      .find()
      .populate('mealStandard')
      .populate('mealStucture');
  }

  findOne(id: string) {
    return this.mealFrameModel
      .findById(id)
      .populate('mealStandard')
      .populate('mealStucture');
  }
}
