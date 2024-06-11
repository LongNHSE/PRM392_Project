import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExSessionService } from './ex_session.service';
import { CreateExSessionDto } from './dto/create-ex_session.dto';
import { UpdateExSessionDto } from './dto/update-ex_session.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';
@Controller('ex-session')
export class ExSessionController {
  constructor(private readonly exSessionService: ExSessionService) {}

  @Post()
  async create(@Body() createExSessionDto: CreateExSessionDto) {
    try {
      const result = await this.exSessionService.create(createExSessionDto);
      if (result)
        return apiSuccess(201, result, 'Session created successfully');
      else return apiFailed(400, {}, 'Failed to create Exercise');
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.exSessionService.findAll();
      if (result) return apiSuccess(200, result, 'Session found successfully');
      else return apiFailed(400, {}, 'Failed to find Exercise');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to find Exercise');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.exSessionService.findOne(id);
      if (result) return apiSuccess(200, result, 'Session found successfully');
      else return apiFailed(400, {}, 'Failed to find Exercise');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to find Exercise');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExSessionDto: UpdateExSessionDto,
  ) {
    try {
      const result = await this.exSessionService.update(id, updateExSessionDto);
      if (result)
        return apiSuccess(200, result, 'Session updated successfully');
      else return apiFailed(400, {}, 'Failed to update Exercise');
    } catch (e) {
      return apiFailed(400, {}, 'Failed to update Exercise');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exSessionService.remove(id);
  }
}
