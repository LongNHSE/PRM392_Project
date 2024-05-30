import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Popup {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  theme: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const PopupSchema = SchemaFactory.createForClass(Popup);
