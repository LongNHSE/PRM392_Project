import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MealStructure {
  @Prop({ required: true })
  mainMealNo: number;

  @Prop({ required: true })
  sideMealNo: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: false })
  isActive: boolean;
}

export const MealStructureSchema = SchemaFactory.createForClass(MealStructure);
