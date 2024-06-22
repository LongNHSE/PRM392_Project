import { Module } from '@nestjs/common';
import { MacroNutrientService } from './macro_nutrient.service';
import { MacroNutrientController } from './macro_nutrient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MacroNutrient,
  MacroNutrientSchema,
} from './schema/macro_nutrient.schema';
import { IsMacroNutrientExistedConstraint } from './decorator/is-macro-nutrient-existed';

@Module({
  controllers: [MacroNutrientController],
  imports: [
    MongooseModule.forFeature([
      { name: MacroNutrient.name, schema: MacroNutrientSchema },
    ]),
  ],
  providers: [MacroNutrientService, IsMacroNutrientExistedConstraint],
})
export class MacroNutrientModule {}
