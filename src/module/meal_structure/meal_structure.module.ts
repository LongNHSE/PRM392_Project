import { Module } from '@nestjs/common';
import { MealStructureService } from './meal_structure.service';
import { MealStructureController } from './meal_structure.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MealStructure,
  MealStructureSchema,
} from './schema/meal_structure.schema';

@Module({
  controllers: [MealStructureController],
  imports: [
    MongooseModule.forFeature([
      { name: MealStructure.name, schema: MealStructureSchema },
    ]),
  ],
  providers: [MealStructureService],
})
export class MealStructureModule {}
