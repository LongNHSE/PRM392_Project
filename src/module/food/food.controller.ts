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
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createFoodDto: CreateFoodDto) {
    try {
      const result = await this.foodService.create(createFoodDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created food succesfully');
      } else {
        return apiFailed(400, null, 'Created food failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created food failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.foodService.findAll();
      return apiSuccess(200, result, 'Get all foods successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all foods failed');
    }
  }
  @Get('/substitute')
  async findSubstituteFood(@Query('macroId') macroId: string) {
    console.log(macroId);
    try {
      const result = await this.foodService.findSubstitudeFood(macroId);
      if (result) {
        return apiSuccess(200, result, 'Get Substitute Foods successfully');
      } else {
        return apiSuccess(200, null, 'No Substitute Foods exist');
      }
    } catch (e) {
      return apiFailed(400, e, 'Get Substitute Foods failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.foodService.findOne(_id);
      return apiSuccess(200, result, 'Get food successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get food failed');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    try {
      const result = this.foodService.update(id, updateFoodDto);
      if (result) {
        return apiSuccess(200, result, 'Updated food successfully');
      } else {
        return apiFailed(400, null, 'Updated food failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated food failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
