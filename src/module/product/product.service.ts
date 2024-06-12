import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  updateImage(productId: any, urlResult: string) {
    return this.productModel.findByIdAndUpdate(productId, {
      $push: { image: urlResult },
    });
  }

  deleteImage(productId: any, urlResult: string) {
    return this.productModel.findByIdAndUpdate(productId, {
      $pull: { image: urlResult },
    });
  }
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const result = await this.productModel.create(createProductDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
