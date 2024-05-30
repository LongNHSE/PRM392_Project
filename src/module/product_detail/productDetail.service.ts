import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-productDetail.dto';
import { UpdateProductDetailDto } from './dto/update-productDetail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDetail } from './schema/productDetail.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductDetailService {
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(ProductDetail.name)
    private readonly productDetailModel: Model<ProductDetail>,
  ) {}
  async create(createProductDetailDto: CreateProductDetailDto) {
    try {
      const result = await this.productDetailModel.create(
        createProductDetailDto,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productDetailModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.productDetailModel.findById(id);
  }

  async update(id: string, updateProductDetailDto: UpdateProductDetailDto) {
    return await this.productDetailModel.findByIdAndUpdate(
      id,
      updateProductDetailDto,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id}`;
  }
}
