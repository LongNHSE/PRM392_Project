import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MacroNutrient } from 'src/module/macro_nutrient/schema/macro_nutrient.schema';

@Schema({
  timestamps: true,
})
export class MacroGroup {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MacroNutrient.name,
  })
  macronutrientId: MacroNutrient | mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true })
  ratio: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const MacroGroupSchema = SchemaFactory.createForClass(MacroGroup);
