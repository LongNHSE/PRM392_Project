import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MacroGroup } from 'src/module/macro_group/schema/macro_group.schema';
import { MealStandard } from 'src/module/meal_standard/schema/meal_standard.schema';

@Schema({
  timestamps: true,
})
export class MealItem {
  @Prop({
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MacroGroup.name,
  })
  macroGroup: MacroGroup | string | mongoose.Schema.Types.ObjectId;

  @Prop({
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: MealStandard.name,
  })
  mealStandard: MealStandard | string | mongoose.Schema.Types.ObjectId;

  @Prop({ require: true })
  description: string;

  @Prop({ required: false, default: false })
  isActive: boolean;
}

export const MealItemSchema = SchemaFactory.createForClass(MealItem);
