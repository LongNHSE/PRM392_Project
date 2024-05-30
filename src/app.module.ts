import { ImageModule } from './module/image/image.module';
import { Food_imageModule } from './module/foodimage/food_image.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FoodTypeModule } from './module/food_type/food_type.module';
import { FoodModule } from './module/food/food.module';
import { BillModule } from './module/bill/bill.module';
import { ProductModule } from './module/product/product.module';
import { ProductDetailModule } from './module/product_detail/productDetail.module';
import { PaymentModule } from './module/payment/payment.module';
import { PopupModule } from './module/popup/popup.module';
import { PopupDetailModule } from './module/popup_detail/productDetail.module';

@Module({
  imports: [
    ImageModule,
    Food_imageModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
    }),
    FoodTypeModule,
    FoodModule,
    BillModule,
    ProductModule,
    ProductDetailModule,
    PaymentModule,
    PopupModule,
    PopupDetailModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECT_STRING'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
