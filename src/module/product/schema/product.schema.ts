import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProductType } from 'src/module/product_type/schema/product_type.schema';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductType.name })
  productTypeID: ProductType;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  image: string[];

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  volumn: number;

  @Prop({ required: true })
  effect: string;

  @Prop({ required: false })
  rate: string;

  @Prop({ required: true })
  purchase: number;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
