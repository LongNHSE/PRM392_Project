import { Injectable, NotFoundException } from '@nestjs/common';
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
  async findByName(name: string) {
    return await this.foodTypeModel.findOne({ name: name });
  }
  async create(createFoodTypeDto: CreateFoodTypeDto): Promise<FoodType> {
    try {
      return await this.foodTypeModel.create(createFoodTypeDto);
    } catch (error) {
      return null;
    }
  }

  async findAll() {
    try {
      return await this.foodTypeModel.find().populate('macroGroup');
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(_id: string) {
    return (await this.foodTypeModel.findById(_id)).populated('macroGroup');
  }

  async update(_id: string, updateFoodTypeDto: UpdateFoodTypeDto) {
    const foodType = await this.foodTypeModel.findById(_id);
    if (!foodType) {
      throw new NotFoundException(`FoodType with id ${_id} not found`);
    }
    return await this.foodTypeModel.findByIdAndUpdate(_id, updateFoodTypeDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} foodType`;
  }
}
