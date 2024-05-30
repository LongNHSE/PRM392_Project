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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const result = await this.paymentService.create(createPaymentDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created payment succesfully');
      } else {
        return apiFailed(400, null, 'Created payment failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created payment failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.paymentService.findAll();
      return apiSuccess(200, result, 'Get all payments successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all payments failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.paymentService.findOne(_id);
      return apiSuccess(200, result, 'Get payment successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get payment failed');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      const result = this.paymentService.update(id, updatePaymentDto);
      if (result) {
        return apiSuccess(200, result, 'Updated payment successfully');
      } else {
        return apiFailed(400, null, 'Updated payment failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated payment failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
