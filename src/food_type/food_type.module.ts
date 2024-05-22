import { Module } from '@nestjs/common';
import { FoodTypeService } from './food_type.service';
import { FoodTypeController } from './food_type.controller';

@Module({
  controllers: [FoodTypeController],
  providers: [FoodTypeService],
})
export class FoodTypeModule {}
