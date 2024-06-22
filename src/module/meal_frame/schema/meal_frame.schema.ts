import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MealStandard } from 'src/module/meal_standard/schema/meal_standard.schema';
import { MealStructure } from 'src/module/meal_structure/schema/meal_structure.schema';

@Schema({
  timestamps: true,
})
export class MealFrame {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MealStandard.name,
  })
  mealStandardId: MealStandard | string | mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MealStructure.name,
  })
  mealStructureId: MealStructure | string | mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  proportion: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  index: number;

  @Prop({ required: false, default: false })
  isActive: boolean;
}

export const MealFrameSchema = SchemaFactory.createForClass(MealFrame);
