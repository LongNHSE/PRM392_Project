import { Injectable } from '@nestjs/common';
import { CreateMealItemDto } from './dto/create-meal_item.dto';
import { UpdateMealItemDto } from './dto/update-meal_item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MealItem } from './schema/meal_item.schema';
import { Model } from 'mongoose';

@Injectable()
export class MealItemService {
  constructor(
    @InjectModel(MealItem.name) private readonly mealItemModel: Model<MealItem>,
  ) {}
  create(createMealItemDto: CreateMealItemDto) {
    return this.mealItemModel.create(createMealItemDto);
  }

  findAll() {
    return this.mealItemModel
      .find()
      .populate('macroGroup')
      .populate('mealStandard');
  }

  findOne(id: string) {
    return this.mealItemModel
      .findById(id)
      .populate('macroGroup')
      .populate('mealStandard');
  }

  update(id: number, updateMealItemDto: UpdateMealItemDto) {
    return `This action updates a #${id} mealItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealItem`;
  }
}
