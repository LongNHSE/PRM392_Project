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
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createBillDto: CreateBillDto) {
    try {
      const result = await this.billService.create(createBillDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created bill succesfully');
      } else {
        return apiFailed(400, null, 'Created bill failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created bill failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.billService.findAll();
      return apiSuccess(200, result, 'Get all bill successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all bill failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.billService.findOne(_id);
      return apiSuccess(200, result, 'Get bill successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get bill failed');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    try {
      const result = this.billService.update(id, updateBillDto);
      if (result) {
        return apiSuccess(200, result, 'Updated bill successfully');
      } else {
        return apiFailed(400, null, 'Updated bill failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated bill failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
