import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ActivityLevel } from 'src/module/activity_level/schema/activity_level.schema';
import { Goal } from 'src/module/goal/schema/goal.schema';
import { Preference } from 'src/module/preference/schema/preference.schema';
import { User } from 'src/module/user/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Diet {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: User | string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: Preference.name,
  })
  preferenceId: Preference | string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: ActivityLevel.name,
  })
  activityLevelId: ActivityLevel | string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Goal.name,
  })
  goalId: Goal | string;

  @Prop({
    required: true,
  })
  height: number;

  @Prop({
    required: true,
  })
  weight: number;

  @Prop({ required: true, type: Number })
  duration: number;

  @Prop({ required: true })
  main: number;

  @Prop({ required: true })
  side: number;

  @Prop({ required: true })
  session: number;

  @Prop({ required: false, default: 0 })
  amountOfChange: number;

  @Prop({ required: false, default: true })
  isActive: boolean;

  @Prop({ required: false, default: 'active' })
  status: string;

  users: User;
  preferences: Preference;
  goals: Goal;
  activity_levels: ActivityLevel;
  _id: string;
}

export const DietSchema = SchemaFactory.createForClass(Diet);
