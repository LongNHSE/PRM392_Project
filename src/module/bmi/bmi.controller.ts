import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BmiService } from './bmi.service';
import { CreateBmiDto } from './dto/create-bmi.dto';
import { UpdateBmiDto } from './dto/update-bmi.dto';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { User } from '../user/schema/user.schema';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('bmi')
export class BmiController {
  constructor(private readonly bmiService: BmiService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async create(@Body() createBmiDto: CreateBmiDto, @GetUser() user: any) {
    try {
      const bmi = await this.bmiService.create(createBmiDto, user.userId);
      if (bmi) {
        return apiSuccess(202, bmi, 'BMI created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create BMI');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to create BMI');
    }
  }

  @Get()
  async findAll() {
    try {
      const bmi = await this.bmiService.findAll();
      if (bmi) {
        return apiSuccess(200, bmi, 'BMI found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find BMI');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find BMI');
    }
  }

  @Get('/my')
  @UseGuards(AuthGuard('jwt'))
  async findMyBMI(@GetUser() user: any) {
    try {
      const bmi = await this.bmiService.findMyBMI(user.userId);
      if (bmi) {
        return apiSuccess(200, bmi, 'BMI found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find BMI');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find BMI');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const bmi = await this.bmiService.findOne(id);
      if (bmi) {
        return apiSuccess(200, bmi, 'BMI found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find BMI');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find BMI');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBmiDto: UpdateBmiDto) {
    try {
      const bmi = await this.bmiService.update(id, updateBmiDto);
      if (bmi) {
        return apiSuccess(202, bmi, 'BMI updated successfully');
      }
      return apiFailed(400, {}, 'Failed to update BMI');
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to update BMI');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const bmi = await this.bmiService.remove(id);
      if (bmi) {
        return apiSuccess(202, bmi, 'BMI deleted successfully');
      }
      return apiFailed(400, {}, 'Failed to delete BMI');
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to delete BMI');
    }
  }
}
