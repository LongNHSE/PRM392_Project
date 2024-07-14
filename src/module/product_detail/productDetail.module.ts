import { Module } from '@nestjs/common';
import { ProductDetailService } from './productDetail.service';
import { ProductDetailController } from './productDetail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductDetail,
  ProductDetailSchema,
} from './schema/productDetail.schema';
import { Bill } from '../bill/schema/bill.schema';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [ProductDetailController],
  imports: [
    ProductModule,

    MongooseModule.forFeature([
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
  ],
  providers: [ProductDetailService],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
