import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diet, DietSchema } from './schema/diet.schema';
import { IsDietExistsConstraint } from './validator/is-diet-exist';
import { BmiModule } from '../bmi/bmi.module';
import { DayModule } from '../day/day.module';
import { MealModule } from '../meal/meal.module';
import { MealStructureService } from '../meal_structure/meal_structure.service';
import { MealStructureModule } from '../meal_structure/meal_structure.module';

@Module({
  controllers: [DietController],
  imports: [
    DayModule,
    MealStructureModule,
    BmiModule,
    MealModule,
    MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
  ],
  providers: [DietService, IsDietExistsConstraint],
})
export class DietModule {}
