import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ProductType {
  @Prop({ required: true })
  typeName: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
