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
import { ProductTypeService } from './product_type.service';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('product_type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createProductDto: CreateProductTypeDto) {
    try {
      const result = await this.productTypeService.create(createProductDto);
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
      const result = await this.productTypeService.findAll();
      return apiSuccess(200, result, 'Get all products successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all products failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.productTypeService.findOne(_id);
      return apiSuccess(200, result, 'Get prouduct successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get prouduct failed');
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProducTypeDto: UpdateProductTypeDto,
  ) {
    try {
      const result = this.productTypeService.update(id, updateProducTypeDto);
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
    return this.productTypeService.remove(+id);
  }
}
