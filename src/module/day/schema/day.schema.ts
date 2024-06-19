import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Diet } from 'src/module/diet/schema/diet.schema';

@Schema({
  timestamps: true,
})
export class Day {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Diet.name,
  })
  dietId: Diet | string;

  @Prop({ required: true })
  index: number;

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

  @Prop({ required: true, default: true })
  isActive: boolean;

  _id: string;
}

export const DaySchema = SchemaFactory.createForClass(Day);
