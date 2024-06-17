import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MacroGroup } from 'src/module/macro_group/schema/macro_group.schema';

@Schema({
  timestamps: true,
})
export class FoodType {
  @Prop({ require: true })
  name: string;

  @Prop({
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MacroGroup.name,
  })
  macroGroup: MacroGroup | string | mongoose.Schema.Types.ObjectId;

  @Prop({ required: false, default: false })
  isDeleted: boolean;
}

export const FoodTypeSchema = SchemaFactory.createForClass(FoodType);
