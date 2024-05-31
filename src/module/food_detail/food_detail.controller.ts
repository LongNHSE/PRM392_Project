import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodDetailService } from './food_detail.service';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';

@Controller('food-detail')
export class FoodDetailController {
  constructor(private readonly foodDetailService: FoodDetailService) {}

  @Post()
  create(@Body() createFoodDetailDto: CreateFoodDetailDto) {
    return this.foodDetailService.create(createFoodDetailDto);
  }

  @Get()
  findAll() {
    return this.foodDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDetailDto: UpdateFoodDetailDto) {
    return this.foodDetailService.update(+id, updateFoodDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodDetailService.remove(+id);
  }
}
