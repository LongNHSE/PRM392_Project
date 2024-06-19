import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product_type.dto';
import { UpdateProductTypeDto } from './dto/update-product_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductType } from './schema/product_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name)
    private readonly productTypeModel: Model<ProductType>,
  ) {}
  async create(createProductTypeDto: CreateProductTypeDto) {
    try {
      const result = await this.productTypeModel.create(createProductTypeDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productTypeModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.productTypeModel.findById(id);
  }

  async update(id: string, updateProductTypeDto: UpdateProductTypeDto) {
    return await this.productTypeModel.findByIdAndUpdate(
      id,
      updateProductTypeDto,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
