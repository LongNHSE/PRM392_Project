import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class FoodType {
  @Prop({ require: true })
  name: string;

  @Prop({ required: false, default: false })
  isDeleted: boolean;
}

export const FoodTypeSchema = SchemaFactory.createForClass(FoodType);
