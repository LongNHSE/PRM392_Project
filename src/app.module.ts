import { ImageModule } from './module/image/image.module';
import { Food_imageModule } from './module/foodimage/food_image.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FoodTypeModule } from './module/food_type/food_type.module';
import { FoodModule } from './module/food/food.module';
import { UserModule } from './module/user/user.module';
import { OtpModule } from './module/otp/otp.module';
import { BlackListTokenModule } from './module/black-list-token/black-list-token.module';
import { MailModule } from './module/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: true,
    }),
    ImageModule,
    BlackListTokenModule,
    MailModule,
    Food_imageModule,
    FoodTypeModule,
    UserModule,
    OtpModule,
    FoodModule,
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
