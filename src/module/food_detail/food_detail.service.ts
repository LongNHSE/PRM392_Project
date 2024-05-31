import { Injectable } from '@nestjs/common';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';

@Injectable()
export class FoodDetailService {
  create(createFoodDetailDto: CreateFoodDetailDto) {
    return 'This action adds a new foodDetail';
  }

  findAll() {
    return `This action returns all foodDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodDetail`;
  }

  update(id: number, updateFoodDetailDto: UpdateFoodDetailDto) {
    return `This action updates a #${id} foodDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodDetail`;
  }
}
