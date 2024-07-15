import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Payment } from 'src/module/payment/schema/payment.schema';
import { User } from 'src/module/user/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Bill {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: User;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Payment.name })
  // paymentId: Payment;

  @Prop({ required: true, default: () => Date.now() })
  date: Date;

  @Prop({ required: false, enum: ['pending', 'paid'], default: 'pending' })
  status: string;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
