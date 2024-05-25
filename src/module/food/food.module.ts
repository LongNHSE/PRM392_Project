import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schema/food.schema';
import { FoodTypeModule } from '../food_type/food_type.module';

@Module({
  controllers: [FoodController],
  imports: [
    FoodTypeModule,
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
