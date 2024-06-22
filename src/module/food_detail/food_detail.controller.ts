import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodDetailService } from './food_detail.service';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('food-detail')
export class FoodDetailController {
  constructor(private readonly foodDetailService: FoodDetailService) {}

  @Post()
  async create(@Body() createFoodDetailDto: CreateFoodDetailDto) {
    try {
      const foodDetail =
        await this.foodDetailService.create(createFoodDetailDto);
      if (foodDetail) {
        return apiSuccess(202, foodDetail, 'Food Detail created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create Food Detail');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to create Food Detail');
    }
  }

  @Get()
  async findAll() {
    try {
      const foodDetail = await this.foodDetailService.findAll();
      if (foodDetail) {
        return apiSuccess(200, foodDetail, 'Food Detail found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Food Detail');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Food Detail');
    }
  }

  @Get('meal/:id')
  async findAllFoodDetailBasedOnMealId(@Param('id') mealId: string) {
    try {
      const foodDetail =
        await this.foodDetailService.findAllFoodDetailsBasedOnMealId(mealId);
      if (foodDetail) {
        return apiSuccess(200, foodDetail, 'Food Detail found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Food Detail');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Food Detail');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const foodDetail = await this.foodDetailService.findOne(id);
      if (foodDetail) {
        return apiSuccess(200, foodDetail, 'Food Detail found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Food Detail');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Food Detail');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFoodDetailDto: UpdateFoodDetailDto,
  ) {
    try {
      const foodDetail = await this.foodDetailService.update(
        id,
        updateFoodDetailDto,
      );
      if (foodDetail) {
        return apiSuccess(200, foodDetail, 'Food Detail updated successfully');
      } else {
        return apiFailed(400, {}, 'Failed to update Food Detail');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to update Food Detail');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodDetailService.remove(id);
  }
}
