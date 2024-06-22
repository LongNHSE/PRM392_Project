import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Popup } from 'src/module/popup/schema/popup.schema';
import { Product } from 'src/module/product/schema/product.schema';

@Schema({
  timestamps: true,
})
export class PopupDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Popup.name })
  popupId: Popup;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: Product;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const PopupDetailSchema = SchemaFactory.createForClass(PopupDetail);
