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
import { Food } from '../food/schema/food.schema';

@Injectable()
export class DietService {
  findMyLatestDiet(userId: any) {
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
      {
        $sort: { createdAt: -1 }, // Assuming 'createdAt' is the timestamp field
      },
      {
        $limit: 1, // Limit to the latest document
      },
    ]);
  }
  async getAllDietByWeek(userId: any, week: number, dietId: string) {
    const startIndex = (week - 1) * 7 + 1;
    const endIndex = startIndex + 6;
    const day: any[] = [];
    let meal = [];
    let food = [];

    for (let i = startIndex; i <= endIndex; i++) {
      const result = await this.dayService.findAllBasedonDietIdAndIndex(
        dietId,
        i,
      );
      if (result) {
        day.push(result);
      }
    }
    for (let i = 0; i < day.length; i++) {
      const mealResult = await this.mealService.findBasedOnDayId(day[i]._id);
      meal = [...mealResult, ...meal];
    }
    for (let i = 0; i < meal.length; i++) {
      const foodResult =
        await this.foodDetailService.findAllFoodDetailsBasedOnMealId(
          meal[i]._id,
        );
      food = [...foodResult, ...food];
    }

    const groupedFoodDetails = food.reduce((acc, item) => {
      const existingItemIndex = acc.findIndex(
        (accItem) => accItem.foodId === item.foodId,
      );
      if (existingItemIndex !== -1) {
        acc[existingItemIndex] = {
          name: acc[existingItemIndex].food.foodName,
          icon: acc[existingItemIndex].icon,
          foodType: acc[existingItemIndex].foodType,
          amount: acc[existingItemIndex].amount + item.amount,
        };
      } else {
        acc.push({
          name: item.food.foodName,
          icon: item?.icon,
          foodType: item?.foodType,
          amount: item?.amount,
        });
      }
      return acc;
    }, []);

    return groupedFoodDetails;
  }
  findDuplicates = (array) => {
    const seen = new Set();
    const duplicates = new Set();

    array.forEach((item) => {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    });

    return Array.from(duplicates);
  };
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
      const mealStuctureId = await this.mealStuctureService.findBySideAndMain(
        createDietDto.side.toString(),
        createDietDto.main.toString(),
      );
      if (!mealStuctureId) {
        return null;
      }
      createDietDto.userId = userId;
      createDietDto.weight = weight;
      createDietDto.height = height;
      const result = await this.dietModel.create(createDietDto);
      if (result) {
        const diet = await this.findOne(result._id.toString());
        if (diet) {
          const days = await this.dayService.createDayBasedOnDiet(diet[0]);

          const meals = await this.mealService.generateMeal(
            days,
            mealStuctureId._id.toString() as string,
          );
          const foods = await this.foodModel.find();
          await this.foodDetailService.generateFoodDetail_2(foods, meals, days);
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
