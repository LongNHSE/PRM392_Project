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
import { FoodFactorService } from './food_fact.service';
import { CreateFoodFactorDto } from './dto/create-food_fact.dto';
import { UpdateFoodFactorDto } from './dto/update-food_fact.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('food_factor')
export class FoodFactorController {
  constructor(private readonly foodFactorService: FoodFactorService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createFoodFactorDto: CreateFoodFactorDto) {
    try {
      const result = await this.foodFactorService.create(createFoodFactorDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created food factor succesfully');
      } else {
        return apiFailed(400, null, 'Created food factor failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created food factor failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.foodFactorService.findAll();
      return apiSuccess(200, result, 'Get all food factors successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all food factors failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.foodFactorService.findOne(_id);
      return apiSuccess(200, result, 'Get food factor successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get food factor failed');
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodFactorDto: UpdateFoodFactorDto,
  ) {
    try {
      const result = this.foodFactorService.update(id, updateFoodFactorDto);
      if (result) {
        return apiSuccess(200, result, 'Updated food factor successfully');
      } else {
        return apiFailed(400, null, 'Updated food factor failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated food factor failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodFactorService.remove(+id);
  }
}
