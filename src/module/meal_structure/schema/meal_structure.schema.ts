import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MealStructure {
  @Prop({ require: true })
  mainMealNo: number;

  @Prop({ require: true })
  sideMealNo: number;

  @Prop({ require: true })
  description: string;

  @Prop({ required: false, default: false })
  isActive: boolean;
}

export const MealStructureSchema = SchemaFactory.createForClass(MealStructure);
