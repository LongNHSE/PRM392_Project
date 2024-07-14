import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-productDetail.dto';
import { UpdateProductDetailDto } from './dto/update-productDetail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDetail } from './schema/productDetail.schema';
import mongoose, { Model } from 'mongoose';
import { ProductService } from '../product/product.service';

@Injectable()
export class ProductDetailService {
  async updateCart(
    userId: any,
    createProductDetailDto: UpdateProductDetailDto,
  ) {
    try {
      const product = await this.productSevice.findOne(
        createProductDetailDto.productId,
      );
      const price = product.price * createProductDetailDto.quantity;

      // Step 1: Find the existing document
      const existingProductDetail = await this.productDetailModel.findOne({
        productId: new mongoose.Types.ObjectId(
          createProductDetailDto.productId,
        ),
        userId: new mongoose.Types.ObjectId(userId),
        billId: null,
      });

      // // Step 2: Calculate the new total price
      let newTotalPrice = price;
      // if (existingProductDetail) {
      //   newTotalPrice += existingProductDetail.total;
      // }

      // Step 3: Update the document with the new total price
      const result = await this.productDetailModel.findOneAndUpdate(
        {
          productId: new mongoose.Types.ObjectId(
            createProductDetailDto.productId,
          ),
          userId: new mongoose.Types.ObjectId(userId),
          billId: null,
        },
        {
          $set: {
            unitPrice: product.price,
          },
          $inc: {
            total: newTotalPrice,
            quantity: createProductDetailDto.quantity,
          }, // Increment the total by newTotalPrice
        },
        { upsert: true, new: true },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  findMyProductDetail(userId: any) {
    return this.productDetailModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId), billId: null },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $unwind: '$products',
      },
    ]);
  }
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    private readonly productSevice: ProductService,
    @InjectModel(ProductDetail.name)
    private readonly productDetailModel: Model<ProductDetail>,
  ) {}
  async create(createProductDetailDto: CreateProductDetailDto, userId: string) {
    try {
      const product = await this.productSevice.findOne(
        createProductDetailDto.productId,
      );
      const price = product.price * createProductDetailDto.quantity;

      const result = await this.productDetailModel.findOneAndUpdate(
        {
          productId: new mongoose.Types.ObjectId(
            createProductDetailDto.productId,
          ),
          userId: new mongoose.Types.ObjectId(userId),
          billId: null,
        },
        {
          productId: new mongoose.Types.ObjectId(
            createProductDetailDto.productId,
          ),
          userId: new mongoose.Types.ObjectId(userId),
          quantity: createProductDetailDto.quantity,
          unitPrice: product.price,
          total: price,
        },
        { upsert: true, new: true },
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
