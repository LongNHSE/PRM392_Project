import { Module } from '@nestjs/common';
import { FoodTypeService } from './food_type.service';
import { FoodTypeController } from './food_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodType, FoodTypeSchema } from './schema/food_type.schema';
import { IsFoodTypeExistedConstraint } from './validator/is-food-existed';

@Module({
  controllers: [FoodTypeController],
  imports: [
    MongooseModule.forFeature([
      {
        name: FoodType.name,
        schema: FoodTypeSchema,
      },
    ]),
  ],
  providers: [FoodTypeService, IsFoodTypeExistedConstraint],
})
export class FoodTypeModule {}
