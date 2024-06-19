import { Module } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import { ProductTypeController } from './product_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductType, ProductTypeSchema } from './schema/product_type.schema';
@Module({
  controllers: [ProductTypeController],
  imports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
  ],
  providers: [ProductTypeService],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
