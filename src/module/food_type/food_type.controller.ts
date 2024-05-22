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
  findAll() {
    return this.foodTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodTypeDto: UpdateFoodTypeDto,
  ) {
    return this.foodTypeService.update(+id, updateFoodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodTypeService.remove(+id);
  }
}
