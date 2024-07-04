import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Meal } from './schema/meal.schema';
import { Day } from '../day/schema/day.schema';
import { MealFrameService } from '../meal_frame/meal_frame.service';
import { FoodDetailService } from '../food_detail/food_detail.service';

@Injectable()
export class MealService {
  findBasedOnDayId(dayId: string) {
    return this.mealModel.aggregate([
      { $match: { dayId: new mongoose.Types.ObjectId(dayId) } },
      {
        $lookup: {
          from: 'mealframes',
          localField: 'mealFrameId',
          foreignField: '_id',
          as: 'mealFrame',
        },
      },
      {
        $unwind: '$mealFrame',
      },
      {
        $lookup: {
          from: 'mealstandards',
          localField: 'mealFrame.mealStandardId',
          foreignField: '_id',
          as: 'mealStandard',
        },
      },
      {
        $unwind: '$mealStandard',
      },
      {
        $lookup: {
          from: 'mealstructures',
          localField: 'mealFrame.mealStructureId',
          foreignField: '_id',
          as: 'mealStructure',
        },
      },
      {
        $unwind: {
          path: '$mealStructure',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }
  constructor(
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
    private foodDetailService: FoodDetailService,
    private mealFrameService: MealFrameService,
  ) {}
  create(createMealDto: CreateMealDto) {
    return this.mealModel.create(createMealDto);
  }

  findAll() {
    return this.mealModel.find();
  }

  async findOne(id: string) {
    const result = await this.mealModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'mealframes', // Assuming 'mealFrames' is the collection name for mealFrameId references
          localField: 'mealFrameId',
          foreignField: '_id',
          as: 'mealFrame',
        },
      },
      { $unwind: '$mealFrame' }, // Optional: Use if you're sure there's only one mealFrame per meal
    ]);
    if (result.length > 0) {
      const foodDetails =
        await this.foodDetailService.findAllFoodDetailsBasedOnMealId(id);
      return { ...result[0], foodDetails };
    }
    return null;
  }

  update(id: string, updateMealDto: UpdateMealDto) {
    return this.mealModel.findByIdAndUpdate(id, updateMealDto, { new: true });
  }

  remove(id: string) {
    return `This action removes a #${id} meal`;
  }

  async generateMeal(days: Day[], mealStuctureId: string) {
    const meals: any = [];
    const mealFrames =
      await this.mealFrameService.findAllByMealStructureId(mealStuctureId);

    const day: Day = days[0];

    const totalCalstd_day = day.totalCalstd;
    const carbohydratestd_day = day.carbohydratedstd;
    const fiberstd_day = day.fiberstd;
    const proteinstd_day = day.proteinstd;
    const fatstd_day = day.fatstd;
    const waterstd_day = day.waterstd;

    let mealPerMeal: Meal[] = [];

    mealFrames.forEach((mealFrame) => {
      days.forEach((day) => {
        const dayId = day._id;
        const mealFrameId = mealFrame._id;

        const proportion = mealFrame.proportion;

        const totalCalstd = parseFloat(
          (totalCalstd_day * proportion).toFixed(2),
        );
        const carbohydratestd = parseFloat(
          (carbohydratestd_day * proportion).toFixed(2),
        );
        const fiberstd = parseFloat((fiberstd_day * proportion).toFixed(2));
        const proteinstd = parseFloat((proteinstd_day * proportion).toFixed(2));
        const fatstd = parseFloat((fatstd_day * proportion).toFixed(2));
        const waterstd = parseFloat((waterstd_day * proportion).toFixed(2));

        const meal = new Meal();
        meal.totalCalstd = totalCalstd;
        meal.carbohydratedstd = carbohydratestd;
        meal.fiberstd = fiberstd;
        meal.proteinstd = proteinstd;
        meal.fatstd = fatstd;
        meal.waterstd = waterstd;
        meal.mealFrameId = mealFrameId.toString() as string;
        meal.dayId = dayId.toString() as string;
        mealPerMeal.push(meal);
      });
      meals.push(mealPerMeal);
      mealPerMeal = [];
    });
    const mealsResult: any[] = await Promise.all(
      meals.map((meal) => this.mealModel.create(meal)),
    );
    return mealsResult;
  }
}
