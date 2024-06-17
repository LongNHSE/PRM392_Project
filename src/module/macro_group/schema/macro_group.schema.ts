import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MacroNutrient } from 'src/module/macro_nutrient/schema/macro_nutrient.schema';

@Schema({
  timestamps: true,
})
export class MacroGroup {
  @Prop({
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MacroNutrient.name,
  })
  macronutrient: MacroNutrient | mongoose.Schema.Types.ObjectId | string;

  @Prop({ require: true })
  ratio: number;

  @Prop({ require: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const MacroGroupSchema = SchemaFactory.createForClass(MacroGroup);
