import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class FoodFactor {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const FoodFactorSchema = SchemaFactory.createForClass(FoodFactor);
