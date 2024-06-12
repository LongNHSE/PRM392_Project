import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';
import { ImageService } from '../image/image.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/common/dto/response.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await this.productService.create(createProductDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created prouduct succesfully');
      } else {
        return apiFailed(400, null, 'Created prouduct failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created prouduct failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.productService.findAll();
      return apiSuccess(200, result, 'Get all products successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all products failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.productService.findOne(_id);
      return apiSuccess(200, result, 'Get prouduct successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get prouduct failed');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const result = this.productService.update(id, updateProductDto);
      if (result) {
        return apiSuccess(200, result, 'Updated prouduct successfully');
      } else {
        return apiFailed(400, null, 'Updated prouduct failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated prouduct failed');
    }
  }

  @Post(':id/image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async postAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse> {
    console.log('file', file);
    try {
      const urlResult = await this.imageService.uploadImage(
        file,
        'products',
        file.originalname,
        id,
      );
      if (!urlResult) {
        throw apiFailed(400, null, 'Upload image failed');
      }
      const updatedProduct = await this.productService.updateImage(
        id,
        urlResult,
      );
      return apiSuccess(
        200,
        { updatedProduct },
        'Add product image successfully',
      );
    } catch (error) {
      console.log(error);
      return apiFailed(error.statusCode, null, error.message);
    }
  }

  @Delete(':id/image')
  @UseGuards(AuthGuard('jwt'))
  async deleteImage(
    @Param('id') id: string,
    @Body('url') url: string,
  ): Promise<ApiResponse> {
    try {
      const result = await this.productService.deleteImage(id, url);
      if (result) {
        return apiSuccess(200, result, 'Deleted product image successfully');
      } else {
        return apiFailed(400, null, 'Deleted product image failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Deleted product image failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
