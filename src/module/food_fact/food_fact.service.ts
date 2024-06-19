import { Injectable } from '@nestjs/common';
import { CreateFoodFactorDto } from './dto/create-food_fact.dto';
import { UpdateFoodFactorDto } from './dto/update-food_fact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodFactor } from './schema/food_fact.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodFactorService {
  constructor(
    @InjectModel(FoodFactor.name)
    private readonly foodFactorModel: Model<FoodFactor>,
  ) {}
  async create(createFoodFactorDto: CreateFoodFactorDto) {
    try {
      const result = await this.foodFactorModel.create(createFoodFactorDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.foodFactorModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.foodFactorModel.findById(id);
  }

  async update(id: string, updateFoodFactorDto: UpdateFoodFactorDto) {
    return await this.foodFactorModel.findByIdAndUpdate(
      id,
      updateFoodFactorDto,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
