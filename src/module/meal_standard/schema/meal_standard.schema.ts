import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class MealStandard {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  displayTime: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const MealStandardSchema = SchemaFactory.createForClass(MealStandard);
