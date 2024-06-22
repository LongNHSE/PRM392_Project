import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ActivityLevel {
  @Prop({ required: true, unique: true })
  levelName: string;
  @Prop({ required: true })
  level: number;
  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const ActivityLevelSchema = SchemaFactory.createForClass(ActivityLevel);
