import { FoodImageService } from './food_image.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { FoodModule } from '../food/food.module';
import { FoodImageController } from './food_image.controller';

@Module({
  imports: [ImageModule, FoodModule],
  providers: [FoodImageService],
  controllers: [FoodImageController],
  exports: [FoodImageService],
})
export class Food_imageModule {}
