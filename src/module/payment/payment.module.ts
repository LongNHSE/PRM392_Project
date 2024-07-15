import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { UserModule } from '../user/user.module';
import { ProductDetailModule } from '../product_detail/productDetail.module';
import { BillModule } from '../bill/bill.module';

@Module({
  controllers: [PaymentController],
  imports: [
    UserModule,
    ProductDetailModule,
    BillModule,
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
