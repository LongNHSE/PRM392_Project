import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './schema/bill.schema';
import { Model } from 'mongoose';

@Injectable()
export class BillService {
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    try {
      const result = await this.billModel.create(createBillDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.billModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.billModel.findById(id);
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    return await this.billModel.findByIdAndUpdate(id, updateBillDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} `;
  }
}
