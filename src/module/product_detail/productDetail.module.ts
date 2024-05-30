import { Module } from '@nestjs/common';
import { ProductDetailService } from './productDetail.service';
import { ProductDetailController } from './productDetail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductDetail,
  ProductDetailSchema,
} from './schema/productDetail.schema';
import { Product } from '../product/schema/product.schema';
import { Bill } from '../bill/schema/bill.schema';

@Module({
  controllers: [ProductDetailController],
  imports: [
    Product,
    Bill,
    MongooseModule.forFeature([
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
  ],
  providers: [ProductDetailService],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
