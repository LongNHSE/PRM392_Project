import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Goal {
  @Prop({ required: true })
  goalName: string;

  @Prop({ required: true })
  sign: number;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
