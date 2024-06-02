import { Injectable } from '@nestjs/common';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodDetail } from './schema/food_detail.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodDetailService {
  constructor(
    @InjectModel(FoodDetail.name) private foodDetailModel: Model<FoodDetail>,
  ) {}
  create(createFoodDetailDto: CreateFoodDetailDto) {
    return this.foodDetailModel.create(createFoodDetailDto);
  }

  findAll() {
    return this.foodDetailModel.find();
  }

  findOne(id: string) {
    return this.foodDetailModel.findById(id);
  }

  update(id: string, updateFoodDetailDto: UpdateFoodDetailDto) {
    return this.foodDetailModel.findByIdAndUpdate(id, updateFoodDetailDto, {
      new: true,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} foodDetail`;
  }
}
