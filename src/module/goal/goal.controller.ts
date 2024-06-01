import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateGoalDto } from './dto/create_goal.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createGoalDto: CreateGoalDto) {
    try {
      const goal = await this.goalService.create(createGoalDto);
      if (goal) {
        return apiSuccess(202, goal, 'Goal created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create Goal');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to create Goal');
    }
  }

  @Get()
  async findAll() {
    try {
      const goal = await this.goalService.findAll();
      if (goal) {
        return apiSuccess(200, goal, 'Goal found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Goal');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Goal');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const goal = await this.goalService.findOne(id);
      if (goal) {
        return apiSuccess(200, goal, 'Goal found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Goal');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to find Goal');
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: string, @Body() updateGoalDto: CreateGoalDto) {
    try {
      const goal = await this.goalService.update(id, updateGoalDto);
      if (goal) {
        return apiSuccess(202, goal, 'Goal updated successfully');
      } else {
        return apiFailed(400, {}, 'Failed to update Goal');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to update Goal');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    try {
      const goal = await this.goalService.remove(id);
      if (goal) {
        return apiSuccess(202, goal, 'Goal removed successfully');
      } else {
        return apiFailed(400, {}, 'Failed to remove Goal');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to remove Goal');
    }
  }
}
