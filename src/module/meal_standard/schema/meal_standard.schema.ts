import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MealStandard {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  displayTime: string;

  @Prop({ required: false, default: true })
  isActive: boolean;

  _id: string;
}

export const MealStandardSchema = SchemaFactory.createForClass(MealStandard);
