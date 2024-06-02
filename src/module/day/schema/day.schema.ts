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

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const DaySchema = SchemaFactory.createForClass(Day);
