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
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      const exercise = await this.exerciseService.create(createExerciseDto);
      if (exercise) {
        return apiSuccess(202, exercise, 'Exercise created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create Exercise');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to create Exercise');
    }
  }

  @Get()
  async findAll() {
    try {
      const exercise = await this.exerciseService.findAll();
      if (exercise) {
        return apiSuccess(200, exercise, 'Exercise found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Exercise');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Exercise');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const exercise = await this.exerciseService.findOne(id);
      if (exercise) {
        return apiSuccess(200, exercise, 'Exercise found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Exercise');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Exercise');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    try {
      const exercise = await this.exerciseService.update(id, updateExerciseDto);
      if (exercise) {
        return apiSuccess(200, exercise, 'Exercise updated successfully');
      } else {
        return apiFailed(400, {}, 'Failed to update Exercise');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to update Exercise');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const exercise = await this.exerciseService.remove(id);
      if (exercise) {
        return apiSuccess(200, exercise, 'Exercise removed successfully');
      } else {
        return apiFailed(400, {}, 'Failed to remove Exercise');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to remove Exercise');
    }
  }
}
