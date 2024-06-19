import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal } from './schema/meal.schema';
import { Day } from '../day/schema/day.schema';
import { MealFrameService } from '../meal_frame/meal_frame.service';
import { Diet } from '../diet/schema/diet.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
    private mealFrameService: MealFrameService,
  ) {}
  create(createMealDto: CreateMealDto) {
    return this.mealModel.create(createMealDto);
  }

  findAll() {
    return this.mealModel.find();
  }

  findOne(id: string) {
    return this.mealModel.findById(id);
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

        const totalCalstd = Math.round(totalCalstd_day * proportion);
        const carbohydratestd = Math.round(carbohydratestd_day * proportion);
        const fiberstd = Math.round(fiberstd_day * proportion);
        const proteinstd = Math.round(proteinstd_day * proportion);
        const fatstd = Math.round(fatstd_day * proportion);
        const waterstd = Math.round(waterstd_day * proportion);

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
    meals.forEach(async (meal) => {
      await this.mealModel.create(meal);
    });
    return meals;
  }
}
