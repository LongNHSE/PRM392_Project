import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExSessionService } from './ex_session.service';
import { CreateExSessionDto } from './dto/create-ex_session.dto';
import { UpdateExSessionDto } from './dto/update-ex_session.dto';

@Controller('ex-session')
export class ExSessionController {
  constructor(private readonly exSessionService: ExSessionService) {}

  @Post()
  create(@Body() createExSessionDto: CreateExSessionDto) {
    return this.exSessionService.create(createExSessionDto);
  }

  @Get()
  findAll() {
    return this.exSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExSessionDto: UpdateExSessionDto) {
    return this.exSessionService.update(+id, updateExSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exSessionService.remove(+id);
  }
}
