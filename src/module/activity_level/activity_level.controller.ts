import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ActivityLevelService } from './activity_level.service';
import { AuthGuard } from '@nestjs/passport';
import { apiSuccess, apiFailed } from 'src/common/api-response';
import { CreateActivityLevelDto } from './dto/create-activity-level.dto';
import { MongoExceptionFilter } from 'src/common/validation/mongooseValidation.validation';

@Controller('activity-level')
export class ActivityLevelController {
  constructor(private readonly activityLevelService: ActivityLevelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createActivityLevelDto: CreateActivityLevelDto) {
    try {
      const activityLevel = await this.activityLevelService.create(
        createActivityLevelDto,
      );
      if (activityLevel) {
        return apiSuccess(
          202,
          activityLevel,
          'Activity Level created successfully',
        );
      } else {
        return apiFailed(400, {}, 'Failed to create Activity Level');
      }
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async findAll() {
    try {
      const activityLevel = await this.activityLevelService.findAll();
      if (activityLevel) {
        return apiSuccess(
          200,
          activityLevel,
          'Activity Level found successfully',
        );
      } else {
        return apiFailed(400, {}, 'Failed to find Activity Level');
      }
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const activityLevel = await this.activityLevelService.findOne(id);
      if (activityLevel) {
        return apiSuccess(
          200,
          activityLevel,
          'Activity Level found successfully',
        );
      } else {
        return apiFailed(400, {}, 'Failed to find Activity Level');
      }
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateActivityLevelDto: any) {
    try {
      const activityLevel = await this.activityLevelService.update(
        id,
        updateActivityLevelDto,
      );
      if (activityLevel) {
        return apiSuccess(
          200,
          activityLevel,
          'Activity Level updated successfully',
        );
      } else {
        return apiFailed(400, {}, 'Failed to update Activity Level');
      }
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    try {
      const activityLevel = await this.activityLevelService.remove(id);
      if (activityLevel) {
        return apiSuccess(
          200,
          activityLevel,
          'Activity Level deleted successfully',
        );
      } else {
        return apiFailed(400, {}, 'Failed to delete Activity Level');
      }
    } catch (err) {
      throw err;
    }
  }
}
