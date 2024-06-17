import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MealFrameService } from './meal_frame.service';
import { CreateMealFrameDto } from './dto/create-meal_frame.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('meal-frame')
export class MealFrameController {
  constructor(private readonly mealFrameService: MealFrameService) {}

  @Post()
  async create(@Body() createMealFrameDto: CreateMealFrameDto) {
    try {
      const result = await this.mealFrameService.create(createMealFrameDto);
      if (!result) {
        return apiFailed(400, null, 'Failed to create meal frame');
      }
      return apiSuccess(201, result, 'Meal frame created successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.mealFrameService.findAll();
      return apiSuccess(200, result, 'Meal frame found successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.mealFrameService.findOne(id);
      return apiSuccess(200, result, 'Meal frame found successfully');
    } catch (e) {
      throw e;
    }
  }
}
