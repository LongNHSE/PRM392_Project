import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Day } from 'src/module/day/schema/day.schema';
import { Exercise } from 'src/module/exercise/schema/exercise.schema';

@Schema({
  timestamps: true,
})
export class ExSession {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Exercise.name,
  })
  exerciseId: Exercise | string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Day.name,
  })
  dayId: Exercise | string;

  @Prop({ required: true })
  icon: string;
}

export const ExSessionSchema = SchemaFactory.createForClass(ExSession);
