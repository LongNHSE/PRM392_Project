import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MacroGroup } from 'src/module/macro_group/schema/macro_group.schema';

@Schema({
  timestamps: true,
})
export class FoodType {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MacroGroup.name,
  })
  macroGroupId: MacroGroup | string | mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, default: false })
  isActive: boolean;
}

export const FoodTypeSchema = SchemaFactory.createForClass(FoodType);
