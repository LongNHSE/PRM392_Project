import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schema/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const result = await this.paymentModel.create(createPaymentDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.paymentModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.paymentModel.findById(id);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
