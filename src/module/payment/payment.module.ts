import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schema/payment.schema';

@Module({
  controllers: [PaymentController],
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
