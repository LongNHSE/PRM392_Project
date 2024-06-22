import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MealItemService } from './meal_item.service';
import { CreateMealItemDto } from './dto/create-meal_item.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';
@Controller('meal-item')
export class MealItemController {
  constructor(private readonly mealItemService: MealItemService) {}

  @Post()
  async create(@Body() createMealItemDto: CreateMealItemDto) {
    try {
      const result = await this.mealItemService.create(createMealItemDto);
      if (!result) {
        return apiFailed(400, null, 'Failed to create meal item');
      }
      return apiSuccess(201, result, 'Meal item created successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.mealItemService.findAll();
      return apiSuccess(200, result, 'Meal item found successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.mealItemService.findOne(id);
      return apiSuccess(200, result, 'Meal item found successfully');
    } catch (e) {
      throw e;
    }
  }
}
