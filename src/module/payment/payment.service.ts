import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schema/payment.schema';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';
import { ProductDetailService } from '../product_detail/productDetail.service';
import { BillService } from '../bill/bill.service';

dotenv.config();

type payloadType = {
  orderCode: number;
  amount: number;
  description: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  items: any;
};

const config = {
  PAYOS_CLIENT_ID: process.env.PAYOS_CLIENT_ID,
  PAYOS_API_KEY: process.env.PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY: process.env.PAYOS_CHECKSUM_KEY,
};

@Injectable()
export class PaymentService {
  returnURL = process.env.RETURN_URL;
  cancelURL = process.env.CANCEL_URL;
  async generateHmac(payload: payloadType) {
    const data = `amount=${payload.amount}&cancelUrl=${this.cancelURL}&description=${payload.description}&orderCode=${payload.orderCode}&returnUrl=${this.returnURL}`;
    const checksum = config.PAYOS_CHECKSUM_KEY || '';
    const hmac = crypto.createHmac('sha256', checksum);
    hmac.update(data);
    return hmac.digest('hex');
  }

  async createPaymentLink(userId: string): Promise<any> {
    // setup payload
    const payload: payloadType = {
      orderCode: Date.now(),
      amount: 0,
      description: '',
      buyerName: '',
      buyerEmail: '',
      buyerPhone: '',
      items: [],
    };

    const user = await this.userService.findById(userId);
    const productDetail =
      await this.productDetailService.findMyProductDetail(userId);
    const toltaPrice = productDetail.reduce((acc, cur) => acc + cur.total, 0);
    payload.amount = toltaPrice;
    payload.description = 'Thanh toán đơn hàng';
    payload.buyerName = user?.username || '';
    payload.buyerEmail = user?.email || '';
    payload.buyerPhone = user?.phone || '';

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    // generate hmac
    const hmac = await this.generateHmac(payload);
    const result = await fetch(
      'https://api-merchant.payos.vn/v2/payment-requests',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': config.PAYOS_CLIENT_ID || '',
          'x-api-key': config.PAYOS_API_KEY || '',
        },
        body: JSON.stringify({
          ...payload,
          cancelUrl: this.cancelURL,
          returnUrl: this.returnURL,
          expiredAt: Math.floor(Date.now() / 1000) + 2 * 60, // 5 minutes
          signature: hmac,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new HttpException(error, 400);
      });
    if (result) {
      const bill = await this.billService.create({
        userId: userId,
        status: 'paid',
        date: new Date(),
      });

      if (bill) {
        productDetail.forEach(async (item) => {
          await this.productDetailService.update(item._id, {
            status: 'paid',
            billId: bill._id,
          });
        });
      }
    }
    return result;
  }

  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private readonly userService: UserService,
    private readonly billService: BillService,
    private readonly productDetailService: ProductDetailService,
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
