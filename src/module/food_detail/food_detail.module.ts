import { Module } from '@nestjs/common';
import { FoodDetailService } from './food_detail.service';
import { FoodDetailController } from './food_detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodDetail, FoodDetailSchema } from './schema/food_detail.schema';
import {
  MacroGroup,
  MacroGroupSchema,
} from '../macro_group/schema/macro_group.schema';
import {
  MacroNutrient,
  MacroNutrientSchema,
} from '../macro_nutrient/schema/macro_nutrient.schema';
import {
  MealFrame,
  MealFrameSchema,
} from '../meal_frame/schema/meal_frame.schema';
import {
  MealStandard,
  MealStandardSchema,
} from '../meal_standard/schema/meal_standard.schema';
import { MealItem, MealItemSchema } from '../meal_item/schema/meal_item.schema';
import { FoodModule } from '../food/food.module';
import { Meal, MealSchema } from '../meal/schema/meal.schema';
import { Day, DaySchema } from '../day/schema/day.schema';

@Module({
  controllers: [FoodDetailController],
  imports: [
    FoodModule,
    MongooseModule.forFeature([
      {
        name: FoodDetail.name,
        schema: FoodDetailSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: MacroGroup.name, schema: MacroGroupSchema },
    ]),
    MongooseModule.forFeature([
      { name: MacroNutrient.name, schema: MacroNutrientSchema },
    ]),
    MongooseModule.forFeature([
      { name: MealFrame.name, schema: MealFrameSchema },
    ]),
    MongooseModule.forFeature([
      { name: MealStandard.name, schema: MealStandardSchema },
    ]),
    MongooseModule.forFeature([
      { name: MealItem.name, schema: MealItemSchema },
    ]),
    MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
    MongooseModule.forFeature([{ name: Day.name, schema: DaySchema }]),
  ],
  providers: [FoodDetailService],
  exports: [FoodDetailService],
})
export class FoodDetailModule {}
