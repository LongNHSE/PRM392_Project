import { Module } from '@nestjs/common';
import { MacroNutrientService } from './macro_nutrient.service';
import { MacroNutrientController } from './macro_nutrient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MacroNutrient,
  MacroNutrientSchema,
} from './schema/macro_nutrient.schema';

@Module({
  controllers: [MacroNutrientController],
  imports: [
    MongooseModule.forFeature([
      { name: MacroNutrient.name, schema: MacroNutrientSchema },
    ]),
  ],
  providers: [MacroNutrientService],
})
export class MacroNutrientModule {}
