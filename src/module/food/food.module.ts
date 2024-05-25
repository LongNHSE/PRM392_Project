import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schema/food.schema';
import { IsFoodTypeExistedConstraint } from '../food_type/validator/is-food-existed';
import { FoodTypeModule } from '../food_type/food_type.module';

@Module({
  controllers: [FoodController],
  imports: [
    FoodTypeModule,
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  providers: [FoodService],
})
export class FoodModule {}
