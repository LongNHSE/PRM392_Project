import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MealStandardService } from './meal_standard.service';
import { CreateMealStandardDto } from './dto/create-meal_standard.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('meal-standard')
export class MealStandardController {
  constructor(private readonly mealStandardService: MealStandardService) {}

  @Post()
  async create(@Body() createMealStandardDto: CreateMealStandardDto) {
    try {
      const result = await this.mealStandardService.create(
        createMealStandardDto,
      );
      if (!result) {
        return apiFailed(400, null, 'Failed to create meal standard');
      }
      return apiSuccess(201, result, 'Meal standard created successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.mealStandardService.findAll();
      return apiSuccess(200, result, 'Meal standard found successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.mealStandardService.findOne(id);
      return apiSuccess(200, result, 'Meal standard found successfully');
    } catch (e) {
      throw e;
    }
  }
}
