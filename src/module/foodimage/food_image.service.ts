/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { FoodService } from '../food/food.service';

@Injectable()
export class FoodImageService {
  constructor(
    private readonly imageService: ImageService,
    private readonly foodService: FoodService,
  ) {}

  async uploadFoodImage(
    file: Express.Multer.File,
    path: string,
    fileName: string,
    _id: string,
  ) {
    const resultUrl = await this.imageService.uploadImage(
      file,
      path,
      fileName,
      _id,
    );
    if (resultUrl) {
      const result = await this.foodService.updateImage(_id, resultUrl);
      if (result) {
        return resultUrl;
      }
    }
    return null;
  }

  // async updateFoodImage(
  //   file: Express.Multer.File,
  //   arg1: string,
  //   originalname: string,
  //   _id: string,
  // ) {
  //   const resultUrl = await this.imageService.uploadImage(file, path, fileName);
  //   if (resultUrl) {
  //     const result = await this.foodService.updateImage(_id, resultUrl);
  //     if (result) {
  //       return resultUrl;
  //     }
  //   }
  //   return null;
  // }
}
