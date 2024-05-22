import { Injectable } from '@nestjs/common';
import { CreateFoodTypeDto } from './dto/create-food_type.dto';
import { UpdateFoodTypeDto } from './dto/update-food_type.dto';

@Injectable()
export class FoodTypeService {
  create(createFoodTypeDto: CreateFoodTypeDto) {
    return 'This action adds a new foodType';
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
