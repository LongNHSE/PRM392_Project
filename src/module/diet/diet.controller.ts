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
import { DietService } from './diet.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createDietDto: CreateDietDto, @GetUser() user: any) {
    try {
      const diet = await this.dietService.create(createDietDto, user.userId);
      if (diet) {
        return apiSuccess(202, diet, 'Diet created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create Diet');
      }
    } catch (err) {
      console.log(err);
      return apiFailed(400, {}, 'Failed to create Diet');
    }
  }

  @Get()
  async findAll() {
    try {
      const diet = await this.dietService.findAll();
      if (diet) {
        return diet;
      } else {
        return { message: 'Failed to find diet' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Failed to find diet' };
    }
  }

  @Get('/my')
  @UseGuards(AuthGuard('jwt'))
  async findMyDiet(@GetUser() user: any) {
    try {
      const diet = await this.dietService.findMyDiet(user.userId);
      if (diet) {
        return diet;
      } else {
        return { message: 'Failed to find diet' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Failed to find diet' };
    }
  }

  @Get(':id')
  async findOne(@GetUser() user: any, @Body() body: any) {
    try {
      const diet = await this.dietService.findOne(body.id);
      if (diet) {
        return diet;
      } else {
        return { message: 'Failed to find diet' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Failed to find diet' };
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Body() body: CreateDietDto, @Param('id') id: string) {
    try {
      const diet = await this.dietService.update(id, body);
      if (diet) {
        return diet;
      } else {
        return { message: 'Failed to update diet' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Failed to update diet' };
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    try {
      const diet = await this.dietService.remove(id);
      if (diet) {
        return diet;
      } else {
        return { message: 'Failed to remove diet' };
      }
    } catch (err) {
      console.log(err);
      return { message: 'Failed to remove diet' };
    }
  }
}
