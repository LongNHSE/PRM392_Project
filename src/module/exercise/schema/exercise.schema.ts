import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Exercise {
  @Prop({ required: true })
  exName: string;

  @Prop({ required: true })
  lowerWeight: number;

  @Prop({ required: true })
  upperWeight: number;

  @Prop({ required: true })
  calorexp: number;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
