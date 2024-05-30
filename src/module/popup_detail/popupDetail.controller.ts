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
import { PopupDetailService } from './popupDetail.service';
import { CreatePopupDetailDto } from './dto/create-popupDetail.dto';
import { UpdatePopupDetailDto } from './dto/update-popupDetail.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('popupDetail')
export class PopupDetailController {
  constructor(private readonly popupDetailService: PopupDetailService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPopupDetailDto: CreatePopupDetailDto) {
    try {
      const result = await this.popupDetailService.create(createPopupDetailDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created popup succesfully');
      } else {
        return apiFailed(400, null, 'Created popup failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created popup failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.popupDetailService.findAll();
      return apiSuccess(200, result, 'Get all popup successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all popup failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.popupDetailService.findOne(_id);
      return apiSuccess(200, result, 'Get popup successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get popup failed');
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePopupDetailDto: UpdatePopupDetailDto,
  ) {
    try {
      const result = this.popupDetailService.update(id, updatePopupDetailDto);
      if (result) {
        return apiSuccess(200, result, 'Updated popup successfully');
      } else {
        return apiFailed(400, null, 'Updated popup failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated popup failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popupDetailService.remove(+id);
  }
}
