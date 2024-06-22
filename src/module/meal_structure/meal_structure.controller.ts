import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MealStructureService } from './meal_structure.service';
import { CreateMealStructureDto } from './dto/create-meal_structure.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('meal-structure')
export class MealStructureController {
  constructor(private readonly mealStructureService: MealStructureService) {}

  @Post()
  async create(@Body() createMealStructureDto: CreateMealStructureDto) {
    try {
      const result = await this.mealStructureService.create(
        createMealStructureDto,
      );
      if (!result) {
        return apiFailed(400, null, 'Failed to create meal structure');
      }
      return apiSuccess(201, result, 'Meal structure created successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.mealStructureService.findAll();
      return apiSuccess(200, result, 'Meal structure found successfully');
    } catch (e) {
      throw e;
    }
  }
  @Get('/by-side-main')
  async findBySideAndMain(@Body() body: any) {
    try {
      const result = await this.mealStructureService.findBySideAndMain(
        body.side,
        body.main,
      );
      return apiSuccess(200, result, 'Meal structure found successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.mealStructureService.findOne(id);
      return apiSuccess(200, result, 'Meal structure found successfully');
    } catch (e) {
      throw e;
    }
  }
}
