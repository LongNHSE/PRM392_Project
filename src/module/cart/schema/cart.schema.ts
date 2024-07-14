import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductDetail } from 'src/module/product_detail/schema/productDetail.schema';
import { User } from 'src/module/user/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Cart {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ProductDetail.name }],
  })
  productDetailId: mongoose.Schema.Types.ObjectId[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
