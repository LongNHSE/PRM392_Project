import { Injectable } from '@nestjs/common';
import { CreateFoodTypeDto } from './dto/create-food_type.dto';
import { UpdateFoodTypeDto } from './dto/update-food_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodType } from './schema/food_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodTypeService {
  constructor(
    @InjectModel(FoodType.name) private readonly foodTypeModel: Model<FoodType>,
  ) {}

  async create(createFoodTypeDto: CreateFoodTypeDto): Promise<FoodType> {
    try {
      const result = await this.foodTypeModel.create(createFoodTypeDto);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  findAll() {
    return `This action returns all foodType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodType`;
  }

  update(id: number, updateFoodTypeDto: UpdateFoodTypeDto) {
    return `This action updates a #${id} foodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodType`;
  }
}
