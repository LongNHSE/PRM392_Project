import { Module } from '@nestjs/common';
import { FoodDetailService } from './food_detail.service';
import { FoodDetailController } from './food_detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodDetail, FoodDetailSchema } from './schema/food_detail.schema';

@Module({
  controllers: [FoodDetailController],
  imports: [
    MongooseModule.forFeature([
      {
        name: FoodDetail.name,
        schema: FoodDetailSchema,
      },
    ]),
  ],
  providers: [FoodDetailService],
})
export class FoodDetailModule {}
