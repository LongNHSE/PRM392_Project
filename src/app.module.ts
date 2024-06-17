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
import { UserModule } from './module/user/user.module';
import { OtpModule } from './module/otp/otp.module';
import { BlackListTokenModule } from './module/black-list-token/black-list-token.module';
import { MailModule } from './module/mail/mail.module';
import { AuthModule } from './module/auth/auth.module';
import { DietModule } from './module/diet/diet.module';
import { ActivityLevelModule } from './module/activity_level/activity_level.module';
import { GoalModule } from './module/goal/goal.module';
import { ExerciseModule } from './module/exercise/exercise.module';
import { ExSessionModule } from './module/ex_session/ex_session.module';
import { DayModule } from './module/day/day.module';
import { MealModule } from './module/meal/meal.module';
import { FoodDetailModule } from './module/food_detail/food_detail.module';
import { BmiModule } from './module/bmi/bmi.module';
import { BlogModule } from './module/blog/blog.module';
import { BlogReactModule } from './module/blog_react/blogReact.module';
import { MacroNutrientModule } from './module/macro_nutrient/macro_nutrient.module';
import { MacroGroupModule } from './module/macro_group/macro_group.module';
import { MealFrameModule } from './module/meal_frame/meal_frame.module';
import { MealItemModule } from './module/meal_item/meal_item.module';
import { MealStandardModule } from './module/meal_standard/meal_standard.module';
import { MealStructureModule } from './module/meal_structure/meal_structure.module';

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
    AuthModule,
    OtpModule,
    FoodModule,
    BillModule,
    ProductModule,
    ProductDetailModule,
    PaymentModule,
    PopupModule,
    BlogModule,
    BlogReactModule,
    PopupDetailModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECT_STRING'),
      }),
      inject: [ConfigService],
    }),
    DietModule,
    ActivityLevelModule,
    GoalModule,
    ExerciseModule,
    ExSessionModule,
    DayModule,
    MealModule,
    FoodDetailModule,
    BmiModule,
    MacroNutrientModule,
    MacroGroupModule,
    MealFrameModule,
    MealItemModule,
    MealStandardModule,
    MealStructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
