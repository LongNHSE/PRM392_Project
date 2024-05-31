import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Food } from 'src/module/food/schema/food.schema';
import { Meal } from 'src/module/meal/schema/meal.schema';

@Schema({
  timestamps: true,
})
export class FoodDetail {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Meal.name,
  })
  mealId: Meal | string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Food.name,
  })
  foodId: Food | string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  totalCal: number;

  @Prop({ required: true })
  carborhydrated: number;

  @Prop({ required: true })
  fiber: number;

  @Prop({ required: true })
  protein: number;

  @Prop({ required: true })
  fat: number;

  @Prop({ required: true })
  water: number;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  description: string;
}

export const FoodDetailSchema = SchemaFactory.createForClass(FoodDetail);
