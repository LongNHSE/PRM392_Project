import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Payment {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
