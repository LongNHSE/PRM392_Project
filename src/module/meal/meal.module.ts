import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meal, MealSchema } from './schema/meal.schema';
import { IsMealExistedConstraint } from './validator/is-meal-existed.';
import { MealFrameModule } from '../meal_frame/meal_frame.module';

@Module({
  controllers: [MealController],
  imports: [
    MealFrameModule,
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
      },
    ]),
  ],
  providers: [MealService, IsMealExistedConstraint],
  exports: [MealService],
})
export class MealModule {}
