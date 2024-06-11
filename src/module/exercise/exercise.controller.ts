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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';
import { ImageService } from '../image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('exercise')
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private imageService: ImageService,
  ) {}

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
      throw err;
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
      throw err;
    }
  }
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async postImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    try {
      const urlResult = await this.imageService.uploadImage(
        file,
        'excercises',
        file.originalname,
        id,
      );
      if (!urlResult) {
        throw apiFailed(400, null, 'Upload image failed');
      }
      const updatedIcon = await this.exerciseService.updateImage(id, urlResult);
      return apiSuccess(200, { updatedIcon }, 'Add icon successfully');
    } catch (error) {
      console.log(error);
      return apiFailed(error.statusCode, null, error.message);
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
      throw err;
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
      throw err;
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
      throw err;
    }
  }
}
