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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
