import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { FirebaseModule } from '../firebase/firebase.module';
import { ImageService } from '../image/image.service';

@Module({
  controllers: [ProductController],
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ImageService],
  exports: [ProductService],
})
export class ProductModule {}
