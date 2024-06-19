import { Injectable } from '@nestjs/common';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodDetail } from './schema/food_detail.schema';
import { Model } from 'mongoose';
import { Food } from '../food/schema/food.schema';
import { Meal } from '../meal/schema/meal.schema';

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

  // public generateLoadsOfFoodDetail(
  //   allApplicableFood: Food[],
  //   meal: Meal,
  //   numDay: number,
  // ): FoodDetail[][] {
  //   const listOfFoodDetail: string[] = Constants.FOOD_DETAIL_BY_MEAL.get(
  //     meal.getMealIndex(),
  //   );
  //   const details: FoodDetail[][] = []; // MEALS-DAYS-DETAILS

  //   let foodOfCategory: Food[];
  //   let foodDetailByDay: FoodDetail[] = [];
  //   for (let j = 0; j < numDay; j++) {
  //     // DAYS
  //     for (let i = 0; i < listOfFoodDetail.length; i++) {
  //       // DETAILS
  //       foodOfCategory = this.listFoodByCategory(
  //         allApplicableFood,
  //         listOfFoodDetail[i],
  //       );
  //       foodDetailByDay.push(
  //         this.generateFoodDetail(meal, foodOfCategory, listOfFoodDetail[i]),
  //       );
  //     }
  //     details.push(foodDetailByDay);

  //     // RESET foodDetailByDay
  //     foodDetailByDay = [];
  //   }
  //   return details;
  // }

  private listFoodByCategory(
    allApplicableFood: Food[],
    category: string,
  ): Food[] {
    // Implementation of listFoodByCategory
    // This is a placeholder. You need to implement this method based on your application's logic.
    return [];
  }

  private generateFoodDetail(
    meal: Meal,
    foodOfCategory: Food[],
    category: string,
  ): FoodDetail {
    // Implementation of generateFoodDetail
    // This is a placeholder. You need to implement this method based on your application's logic.
    return new FoodDetail();
  }
}
