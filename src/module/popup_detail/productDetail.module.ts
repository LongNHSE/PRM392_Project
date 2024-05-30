import { Module } from '@nestjs/common';
import { PopupDetailService } from './popupDetail.service';
import { PopupDetailController } from './popupDetail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PopupDetail, PopupDetailSchema } from './schema/popupDetail.schema';
import { PopupModule } from '../popup/popup.module';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [PopupDetailController],
  imports: [
    ProductModule,
    PopupModule,
    MongooseModule.forFeature([
      { name: PopupDetail.name, schema: PopupDetailSchema },
    ]),
  ],
  providers: [PopupDetailService],
  exports: [PopupDetailService],
})
export class PopupDetailModule {}
