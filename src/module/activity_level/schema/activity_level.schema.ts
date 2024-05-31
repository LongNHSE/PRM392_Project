import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ActivityLevel {
  @Prop({ required: true })
  levelName: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const ActivityLevelSchema = SchemaFactory.createForClass(ActivityLevel);
