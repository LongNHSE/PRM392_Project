/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadRequestException,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodImageService } from './food_image.service';
import { apiFailed, apiSuccess } from 'src/common/api-response';
import path from 'path';

@Controller('food_image')
export class FoodImageController {
  constructor(private readonly foodImageService: FoodImageService) {}

  @Post(':_id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        const ext = file.originalname.split('.').pop().toLowerCase();
        if (ext !== 'png' && ext !== 'svg' && ext !== 'jpg' && ext !== 'jpeg') {
          return callback(
            new BadRequestException('Only PNG and SVG files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFoodImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('_id') _id: string,
  ) {
    try {
      const result = await this.foodImageService.uploadFoodImage(
        file,
        'food',
        file.originalname,
        _id,
      );
      if (result) {
        return apiSuccess(201, result, 'Uploaded image successfully');
      } else {
        return apiFailed(404, null, 'Uploaded image failed');
      }
    } catch (error) {
      return apiFailed(404, null, 'Uploaded image failed');
    }
  }

  @Patch(':_id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        const ext = file.originalname.split('.').pop().toLowerCase();
        if (ext !== 'png' && ext !== 'svg' && ext !== 'jpg' && ext !== 'jpeg') {
          return callback(
            new BadRequestException('Only PNG and SVG files are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async updateFoodImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('_id') _id: string,
  ) {
    try {
      const result = await this.foodImageService.uploadFoodImage(
        file,
        'food',
        file.originalname,
        _id,
      );
      if (result) {
        return apiSuccess(201, result, 'Uploaded image successfully');
      } else {
        return apiFailed(404, null, 'Uploaded image failed');
      }
    } catch (error) {
      return apiFailed(404, null, 'Uploaded image failed');
    }
  }
}
