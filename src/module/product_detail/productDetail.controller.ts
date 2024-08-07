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
} from '@nestjs/common';
import { ProductDetailService } from './productDetail.service';
import { CreateProductDetailDto } from './dto/create-productDetail.dto';
import { UpdateProductDetailDto } from './dto/update-productDetail.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';

@Controller('productDetail')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() createProductDetailDto: CreateProductDetailDto,
    @GetUser() user: any,
  ) {
    try {
      const result = await this.productDetailService.create(
        createProductDetailDto,
        user.userId,
      );
      if (result) {
        return apiSuccess(201, result, 'Created product detail succesfully');
      } else {
        return apiFailed(400, null, 'Created product detail failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created product detail failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.productDetailService.findAll();
      return apiSuccess(200, result, 'Get all product detail successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all product detail failed');
    }
  }

  @Patch('')
  @UseGuards(AuthGuard('jwt'))
  async updateImage(
    @Body() updateProductDetailDto: UpdateProductDetailDto,
    @GetUser() user: any,
  ) {
    try {
      const result = await this.productDetailService.updateCart(
        user.userId,
        updateProductDetailDto,
      );
      return apiSuccess(
        200,
        result,
        'Updated image product detail successfully',
      );
    } catch (error) {
      return apiFailed(400, {}, 'Updated image product detail failed');
    }
  }
  @Get('/my')
  @UseGuards(AuthGuard('jwt'))
  async findMyProductDetail(@GetUser() user: any) {
    try {
      const result = await this.productDetailService.findMyProductDetail(
        user.userId,
      );
      return apiSuccess(200, result, 'Get all product detail successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all product detail failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.productDetailService.findOne(_id);
      return apiSuccess(200, result, 'Get product detail successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get product detail failed');
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ) {
    try {
      const result = this.productDetailService.update(
        id,
        updateProductDetailDto,
      );
      if (result) {
        return apiSuccess(200, result, 'Updated product detail successfully');
      } else {
        return apiFailed(400, null, 'Updated product detail failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated product detail failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDetailService.remove(+id);
  }
}
