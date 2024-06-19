import { Module } from '@nestjs/common';
import { FoodFactorService } from './food_fact.service';
import { FoodFactorController } from './food_fact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodFactor, FoodFactorSchema } from './schema/food_fact.schema';

@Module({
  controllers: [FoodFactorController],
  imports: [
    MongooseModule.forFeature([
      { name: FoodFactor.name, schema: FoodFactorSchema },
    ]),
  ],
  providers: [FoodFactorService],
  exports: [FoodFactorService],
})
export class FoodFactorModule {}
