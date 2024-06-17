import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MacroNutrient {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  caloricValue: number;

  @Prop({ require: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const MacroNutrientSchema = SchemaFactory.createForClass(MacroNutrient);
