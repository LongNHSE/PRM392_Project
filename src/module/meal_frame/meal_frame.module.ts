import { Module } from '@nestjs/common';
import { MealFrameService } from './meal_frame.service';
import { MealFrameController } from './meal_frame.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealFrame, MealFrameSchema } from './schema/meal_frame.schema';

@Module({
  controllers: [MealFrameController],
  imports: [
    MongooseModule.forFeature([
      { name: MealFrame.name, schema: MealFrameSchema },
    ]),
  ],
  providers: [MealFrameService],
  exports: [MealFrameService],
})
export class MealFrameModule {}
