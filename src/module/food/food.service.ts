import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schema/food.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<Food>,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    try {
      const result = await this.foodModel.create(createFoodDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all food`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
