import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diet, DietSchema } from './schema/diet.schema';
import { IsDietExistsConstraint } from './validator/is-diet-exist';
import { BmiModule } from '../bmi/bmi.module';
import { DayModule } from '../day/day.module';
import { MealModule } from '../meal/meal.module';
import { MealStructureModule } from '../meal_structure/meal_structure.module';
import { FoodDetailModule } from '../food_detail/food_detail.module';
import { FoodModule } from '../food/food.module';
import { Food, FoodSchema } from '../food/schema/food.schema';

@Module({
  controllers: [DietController],
  imports: [
    DayModule,
    MealStructureModule,
    BmiModule,
    MealModule,
    FoodDetailModule,
    MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  providers: [DietService, IsDietExistsConstraint],
})
export class DietModule {}
