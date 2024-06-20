import { Injectable } from '@nestjs/common';
import { CreateDietDto } from './dto/create-diet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Diet } from './schema/diet.schema';
import mongoose, { Model } from 'mongoose';
import { BmiService } from '../bmi/bmi.service';
import { DayService } from '../day/day.service';
import { MealService } from '../meal/meal.service';
import { MealStructureService } from '../meal_structure/meal_structure.service';
import { FoodDetailService } from '../food_detail/food_detail.service';
import { FoodService } from '../food/food.service';
import { Food } from '../food/schema/food.schema';

@Injectable()
export class DietService {
  constructor(
    @InjectModel(Diet.name) private dietModel: Model<Diet>,
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private readonly bmiService: BmiService,
    private readonly dayService: DayService,
    private readonly mealService: MealService,
    private readonly mealStuctureService: MealStructureService,
    private readonly foodDetailService: FoodDetailService,
  ) {}
  findAll() {
    return this.dietModel.aggregate([
      {
        $lookup: {
          from: 'activitylevels',
          localField: 'activityLevelId',
          foreignField: '_id',
          as: 'activity_levels',
        },
      },
      {
        $lookup: {
          from: 'goals',
          localField: 'goalId',
          foreignField: '_id',
          as: 'goals',
        },
      },
      {
        $lookup: {
          from: 'preferences',
          localField: 'preferenceId',
          foreignField: '_id',
          as: 'preferences',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: '$users',
      },
      {
        $unwind: '$preferences',
      },
      {
        $unwind: '$goals',
      },
      {
        $unwind: '$activity_levels',
      },
    ]);
  }
  async create(createDietDto: CreateDietDto, userId: string) {
    try {
      //Get height and weight from latest BMI
      const { weight, height } = await this.bmiService.findMyLatestBMI(userId);

      createDietDto.userId = userId;
      createDietDto.weight = weight;
      createDietDto.height = height;
      const result = await this.dietModel.create(createDietDto);
      if (result) {
        const diet = await this.findOne(result._id.toString());
        if (diet) {
          const days = await this.dayService.createDayBasedOnDiet(diet[0]);
          const mealStuctureId =
            await this.mealStuctureService.findBySideAndMain(
              diet[0].side,
              diet[0].main,
            );
          const meals = await this.mealService.generateMeal(
            days,
            mealStuctureId._id.toString() as string,
          );
          const foods = await this.foodModel.find();
          await this.foodDetailService.generateFoodDetail_2(
            foods,
            meals[0],
            days,
          );
        }
        return result;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: string) {
    return this.dietModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'activitylevels',
          localField: 'activityLevelId',
          foreignField: '_id',
          as: 'activity_levels',
        },
      },
      {
        $lookup: {
          from: 'goals',
          localField: 'goalId',
          foreignField: '_id',
          as: 'goals',
        },
      },
      {
        $lookup: {
          from: 'preferences',
          localField: 'preferenceId',
          foreignField: '_id',
          as: 'preferences',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: '$users',
      },
      {
        $unwind: '$preferences',
      },
      {
        $unwind: '$goals',
      },
      {
        $unwind: '$activity_levels',
      },
    ]);
  }

  update(id: string, updateDietDto: CreateDietDto) {
    return this.dietModel.findByIdAndUpdate(id, updateDietDto, { new: true });
  }

  remove(id: string) {
    return this.dietModel.findByIdAndUpdate(id, { isActive: false });
  }

  findMyDiet(userId: string) {
    return this.dietModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'activitylevels',
          localField: 'activityLevelId',
          foreignField: '_id',
          as: 'activity_levels',
        },
      },
      {
        $lookup: {
          from: 'goals',
          localField: 'goalId',
          foreignField: '_id',
          as: 'goals',
        },
      },
      {
        $lookup: {
          from: 'preferences',
          localField: 'preferenceId',
          foreignField: '_id',
          as: 'preferences',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: '$users',
      },
      {
        $unwind: '$preferences',
      },
      {
        $unwind: '$goals',
      },
      {
        $unwind: '$activity_levels',
      },
    ]);
  }
}
