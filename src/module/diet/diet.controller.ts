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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('diet')
@ApiTags('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: false }),
  )
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create diet' })
  @ApiResponse({ status: 202, description: 'Diet created successfully' })
  @ApiResponse({ status: 400, description: 'Failed to create Diet' })
  async create(@Body() createDietDto: CreateDietDto, @GetUser() user: any) {
    try {
      const diet = await this.dietService.create(createDietDto, user.userId);
      if (diet) {
        return apiSuccess(202, diet, 'Diet created successfully');
      } else {
        return apiFailed(400, {}, 'Failed to create Diet');
      }
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async findAll() {
    try {
      const diet = await this.dietService.findAll();
      if (diet) {
        return apiSuccess(200, diet, 'Diet found successfully');
      } else {
        return { message: 'Failed to find diet' };
      }
    } catch (err) {
      throw err;
    }
  }

  @Get('/my')
  @UseGuards(AuthGuard('jwt'))
  async findMyDiet(@GetUser() user: any) {
    try {
      const diet = await this.dietService.findMyDiet(user.userId);
      if (diet) {
        return apiSuccess(200, diet, 'Diet found successfully');
      } else {
        return { message: 'Failed to find diet' };
      }
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async findOne(@GetUser() user: any, @Param('id') id: string) {
    try {
      const diet = await this.dietService.findOne(id);
      if (diet) {
        return apiSuccess(200, diet[0], 'Diet found successfully');
      } else {
        return apiFailed(400, {}, 'Failed to find Diet');
      }
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: true }),
  )
  async update(@Body() body: CreateDietDto, @Param('id') id: string) {
    try {
      const diet = await this.dietService.update(id, body);
      if (diet) {
        return diet;
      } else {
        return { message: 'Failed to update diet' };
      }
    } catch (err) {
      throw err;
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
      throw err;
    }
  }
}
