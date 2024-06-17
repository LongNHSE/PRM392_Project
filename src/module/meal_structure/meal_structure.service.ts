import { Injectable } from '@nestjs/common';
import { CreateMealStructureDto } from './dto/create-meal_structure.dto';
import { MealStructure } from './schema/meal_structure.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MealStructureService {
  constructor(
    @InjectModel(MealStructure.name)
    private readonly mealStructureModel: Model<MealStructure>,
  ) {}
  create(createMealStructureDto: CreateMealStructureDto) {
    return this.mealStructureModel.create(createMealStructureDto);
  }

  findAll() {
    return this.mealStructureModel.find();
  }

  findOne(id: string) {
    return this.mealStructureModel.findById(id);
  }
}
