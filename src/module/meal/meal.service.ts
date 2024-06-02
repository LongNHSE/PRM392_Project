import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal } from './schema/meal.schema';

@Injectable()
export class MealService {
  constructor(@InjectModel(Meal.name) private mealModel: Model<Meal>) {}
  create(createMealDto: CreateMealDto) {
    return this.mealModel.create(createMealDto);
  }

  findAll() {
    return this.mealModel.find();
  }

  findOne(id: string) {
    return this.mealModel.findById(id);
  }

  update(id: string, updateMealDto: UpdateMealDto) {
    return this.mealModel.findByIdAndUpdate(id, updateMealDto, { new: true });
  }

  remove(id: string) {
    return `This action removes a #${id} meal`;
  }
}
