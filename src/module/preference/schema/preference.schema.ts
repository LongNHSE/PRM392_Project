import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Preference {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  carbohydrate: number;

  @Prop({ required: true })
  fiber: number;

  @Prop({ required: true })
  protein: number;

  @Prop({ required: true })
  standardProtein: number;

  @Prop({ required: true })
  fat: number;

  @Prop({ required: true })
  water: number;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const PreferenceSchema = SchemaFactory.createForClass(Preference);
