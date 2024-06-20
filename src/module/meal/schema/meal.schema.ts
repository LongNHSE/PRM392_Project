import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Day } from 'src/module/day/schema/day.schema';
import { MealFrame } from 'src/module/meal_frame/schema/meal_frame.schema';

@Schema({
  timestamps: true,
})
export class Meal {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MealFrame.name,
    required: false,
  })
  mealFrameId: MealFrame | string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Day.name })
  dayId: Day | string;

  @Prop({ required: true })
  totalCalstd: number;

  @Prop({ required: true })
  carbohydratedstd: number;

  @Prop({ required: true })
  fiberstd: number;

  @Prop({ required: true })
  proteinstd: number;

  @Prop({ required: true })
  fatstd: number;

  @Prop({ required: true })
  waterstd: number;

  @Prop({ required: false, default: 0 })
  totalCal: number;

  @Prop({ required: false, default: 0 })
  carbohydrated: number;

  @Prop({ required: false, default: 0 })
  fiber: number;

  @Prop({ required: false, default: 0 })
  protein: number;

  @Prop({ required: false, default: 0 })
  fat: number;

  @Prop({ required: false, default: 0 })
  water: number;

  _id: string;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
