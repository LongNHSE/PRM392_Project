import { Module } from '@nestjs/common';
import { MealItemService } from './meal_item.service';
import { MealItemController } from './meal_item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealItem, MealItemSchema } from './schema/meal_item.schema';

@Module({
  controllers: [MealItemController],
  imports: [
    MongooseModule.forFeature([
      { name: MealItem.name, schema: MealItemSchema },
    ]),
  ],
  providers: [MealItemService],
})
export class MealItemModule {}
