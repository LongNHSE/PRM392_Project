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
  Query,
} from '@nestjs/common';
import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';
@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createDayDto: CreateDayDto) {
    try {
      const day = await this.dayService.create(createDayDto);
      if (day) {
        return apiSuccess(202, day, 'Day created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create Day');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to create Day');
    }
  }

  @Get()
  async findAll() {
    try {
      const day = await this.dayService.findAll();
      if (day) {
        return apiSuccess(200, day, 'Day found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Day');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Day');
    }
  }
  @Get('/diet/:id')
  async findAllBasedonDietIdAndIndex(
    @Param('id') id: string,
    @Query('index') index: number,
  ) {
    try {
      const day = await this.dayService.findAllBasedonDietIdAndIndex(id, index);
      if (day) {
        return apiSuccess(200, day, 'Day found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Day');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Day');
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const day = await this.dayService.findOne(id);
      if (day) {
        return apiSuccess(200, day, 'Day found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Day');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Day');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    try {
      const day = await this.dayService.update(id, updateDayDto);
      if (day) {
        return apiSuccess(202, day, 'Day updated successfully');
      } else {
        return apiFailed(400, {}, 'Failed to update Day');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to update Day');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const day = await this.dayService.remove(id);
      if (day) {
        return apiSuccess(202, day, 'Day removed successfully');
      } else {
        return apiFailed(400, {}, 'Failed to remove Day');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to remove Day');
    }
  }
}
