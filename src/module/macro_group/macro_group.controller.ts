import {
  Controller,
  Get,
  Post,
  Body,
  Param, ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { MacroGroupService } from './macro_group.service';
import { CreateMacroGroupDto } from './dto/create-macro_group.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('macro-group')
export class MacroGroupController {
  constructor(private readonly macroGroupService: MacroGroupService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: false }),
  )
  async create(@Body() createMacroGroupDto: CreateMacroGroupDto) {
    try {
      const result = await this.macroGroupService.create(createMacroGroupDto);
      if (!result) {
        return apiFailed(400, null, 'Failed to create macro group');
      }
      return apiSuccess(201, result, 'Macro group created successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.macroGroupService.findAll();
      return apiSuccess(200, result, 'Macro group found successfully');
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.macroGroupService.findOne(id);
      return apiSuccess(200, result, 'Macro group found successfully');
    } catch (e) {
      throw e;
    }
  }
}
