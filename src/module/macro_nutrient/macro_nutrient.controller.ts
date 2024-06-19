import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MacroNutrientService } from './macro_nutrient.service';
import { CreateMacroNutrientDto } from './dto/create-macro_nutrient.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('macro-nutrient')
export class MacroNutrientController {
  constructor(private readonly macroNutrientService: MacroNutrientService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: false }),
  )
  async create(@Body() createMacroNutrientDto: CreateMacroNutrientDto) {
    try {
      const result = await this.macroNutrientService.create(
        createMacroNutrientDto,
      );
      if (!result) {
        return apiFailed(400, null, 'Failed to create macro nutrient');
      }
      return apiSuccess(201, result, 'Macro nutrient created successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.macroNutrientService.findAll();
      return apiSuccess(200, result, 'Macro nutrient found successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.macroNutrientService.findOne(id);
      return apiSuccess(200, result, 'Macro nutrient found successfully');
    } catch (e) {
      throw e;
    }
  }
}
