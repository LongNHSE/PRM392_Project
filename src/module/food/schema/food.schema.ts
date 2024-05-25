import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FoodType } from 'src/module/food_type/schema/food_type.schema';

@Schema({
  timestamps: true,
})
export class Food {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: FoodType.name })
  typeId: FoodType;
  @Prop({ required: true })
  foodName: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  caloricintake: number;

  @Prop({ required: true })
  carbonhydrate: number;

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

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
