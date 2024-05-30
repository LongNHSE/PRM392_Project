import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Payment } from 'src/module/payment/schema/payment.schema';

@Schema({
  timestamps: true,
})
export class Bill {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Payment.name })
  paymentId: Payment;

  @Prop({ required: true, default: () => Date.now() })
  date: Date;

  @Prop({ required: false, default: true })
  status: boolean;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
