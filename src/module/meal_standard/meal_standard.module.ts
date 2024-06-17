import { Module } from '@nestjs/common';
import { MealStandardService } from './meal_standard.service';
import { MealStandardController } from './meal_standard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MealStandard,
  MealStandardSchema,
} from './schema/meal_standard.schema';

@Module({
  controllers: [MealStandardController],
  imports: [
    MongooseModule.forFeature([
      {
        name: MealStandard.name,
        schema: MealStandardSchema,
      },
    ]),
  ],
  providers: [MealStandardService],
})
export class MealStandardModule {}
