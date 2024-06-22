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
import { FoodTypeService } from './food_type.service';
import { CreateFoodTypeDto } from './dto/create-food_type.dto';
import { UpdateFoodTypeDto } from './dto/update-food_type.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('food_types')
export class FoodTypeController {
  constructor(private readonly foodTypeService: FoodTypeService) {}

  @Post()
  //enable validation pipe
  @UsePipes(new ValidationPipe())
  async create(@Body() createFoodTypeDto: CreateFoodTypeDto) {
    try {
      const checkName = await this.foodTypeService.findByName(
        createFoodTypeDto.name,
      );
      if (checkName) {
        return apiFailed(400, 'Food type already existed');
      }
      const result = await this.foodTypeService.create(createFoodTypeDto);
      if (result) {
        return apiSuccess(201, result, 'Created food type successfully');
      } else {
        return apiFailed(400, 'Created food type failled');
      }
    } catch (error) {
      return apiFailed(400, 'Created food type failled');
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.foodTypeService.findAll();
      if (result) {
        return apiSuccess(200, result, 'Get all food types successfully');
      } else {
        return apiFailed(400, null, 'Get all food types failled');
      }
    } catch (error) {
      return apiFailed(400, null, 'Get all food types failled');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.foodTypeService.findOne(_id);
      return apiSuccess(200, result, 'Get food type successfully');
    } catch (error) {
      return apiFailed(400, null, 'Get food type failled');
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') _id: string,
    @Body() updateFoodTypeDto: UpdateFoodTypeDto,
  ) {
    try {
      const result = await this.foodTypeService.update(_id, updateFoodTypeDto);
      return apiSuccess(200, result, 'Updated food type successfully');
    } catch (error) {
      return apiFailed(error.status, null, error.message.toString());
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodTypeService.remove(+id);
  }
}
