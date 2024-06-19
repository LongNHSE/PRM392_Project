import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MacroNutrient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  caloricValue: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const MacroNutrientSchema = SchemaFactory.createForClass(MacroNutrient);
