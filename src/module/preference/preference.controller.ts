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
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: true }),
  )
  async create(@Body() createPreferenceDto: CreatePreferenceDto) {
    try {
      const data = await this.preferenceService.create(createPreferenceDto);
      if (data) {
        return apiSuccess(201, data, 'Preference created successfully');
      }
      return apiFailed(400, null, 'Preference not created');
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.preferenceService.findAll();
      if (data) {
        return apiSuccess(200, data, 'Preference retrieved successfully');
      }
      return apiFailed(404, null, 'Preference not found');
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.preferenceService.findOne(id);
      if (data) {
        return apiSuccess(200, data, 'Preference retrieved successfully');
      }
      return apiFailed(404, null, 'Preference not found');
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    try {
      const data = await this.preferenceService.update(id, updatePreferenceDto);
      if (data) {
        return apiSuccess(200, data, 'Preference updated successfully');
      }
      return apiFailed(400, null, 'Preference not updated');
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.preferenceService.remove(id);
      if (data) {
        return apiSuccess(200, data, 'Preference deleted successfully');
      }
      return apiFailed(400, null, 'Preference not deleted');
    } catch (error) {
      throw error;
    }
  }
}
