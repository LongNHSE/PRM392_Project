import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {
    try {
      const result = await this.mealService.create(createMealDto);
      if (result) return apiSuccess(201, result, 'Meal created successfully');
      else return apiFailed(400, {}, 'Failed to create Meal');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to create Meal');
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.mealService.findAll();
      if (result) return apiSuccess(200, result, 'Meal found successfully');
      else return apiFailed(400, {}, 'Failed to find Meal');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to find Meal');
    }
  }

  @Get('diet/:dietId')
  async findBasedOnDietIdAndDayIndex(
    @Param('dietId') dietId: string,
    @Query('dayIndex') dayIndex: string,
  ) {
    console.log(dietId, dayIndex);
    try {
      const result = await this.mealService.findBasedOnDietIdAndDayIndex(
        dietId,
        dayIndex,
      );
      if (result) return apiSuccess(200, result, 'Meal found successfully');
      else return apiFailed(400, {}, 'Failed to find Meal');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to find Meal');
    }
  }

  @Get('day/:id')
  async findBasedOnDayId(@Param('id') dayId: string) {
    try {
      const result = await this.mealService.findBasedOnDayId(dayId);
      if (result) return apiSuccess(200, result, 'Meal found successfully');
      else return apiFailed(400, {}, 'Failed to find Meal');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to find Meal');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.mealService.findOne(id);
      if (result) return apiSuccess(200, result, 'Meal found successfully');
      else return apiFailed(400, {}, 'Failed to find Meal');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to find Meal');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    try {
      const result = await this.mealService.update(id, updateMealDto);
      if (result) return apiSuccess(200, result, 'Meal updated successfully');
      else return apiFailed(400, {}, 'Failed to update Meal');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to update Meal');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }
}
