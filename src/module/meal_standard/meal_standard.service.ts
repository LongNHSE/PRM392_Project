import { Injectable } from '@nestjs/common';
import { CreateMealStandardDto } from './dto/create-meal_standard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MealStandard } from './schema/meal_standard.schema';
import { Model } from 'mongoose';

@Injectable()
export class MealStandardService {
  constructor(
    @InjectModel(MealStandard.name)
    private readonly mealStandardModel: Model<MealStandard>,
  ) {}
  create(createMealStandardDto: CreateMealStandardDto) {
    return this.mealStandardModel.create(createMealStandardDto);
  }

  findAll() {
    return this.mealStandardModel.find();
  }

  findOne(id: string) {
    return this.mealStandardModel.findById(id);
  }
}
