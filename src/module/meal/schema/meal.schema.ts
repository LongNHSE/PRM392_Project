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
  mealFrame: MealFrame | string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Day.name })
  dayId: Day | string;

  @Prop({ required: true })
  mealIndex: number;

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

  @Prop({ required: true })
  totalCal: number;

  @Prop({ required: true })
  carbohydrated: number;

  @Prop({ required: true })
  fiber: number;

  @Prop({ required: true })
  protein: number;

  @Prop({ required: true })
  fat: number;

  @Prop({ required: true })
  water: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
