import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Bill } from 'src/module/bill/schema/bill.schema';
import { Product } from 'src/module/product/schema/product.schema';

@Schema({
  timestamps: true,
})
export class ProductDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Bill.name })
  billId: Bill;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  total: number;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
