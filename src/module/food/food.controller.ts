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
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createFoodDto: CreateFoodDto) {
    try {
      const result = await this.foodService.create(createFoodDto);
      if (result) {
        return apiSuccess(201, result, 'Created food succesfully');
      } else {
        return apiFailed(400, null, 'Created food failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Created food failed');
    }
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
