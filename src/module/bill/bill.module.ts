import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema, Bill } from './schema/bill.schema';
import { PaymentModule } from '../payment/payment.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [BillController],
  imports: [
    UserModule,
    PaymentModule,
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
