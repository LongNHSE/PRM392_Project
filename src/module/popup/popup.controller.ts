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
import { PopupService } from './popup.service';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('popup')
export class PopupController {
  constructor(private readonly popupService: PopupService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPopupDto: CreatePopupDto) {
    try {
      const result = await this.popupService.create(createPopupDto);
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
      const result = await this.popupService.findAll();
      return apiSuccess(200, result, 'Get all popup successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all popup failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.popupService.findOne(_id);
      return apiSuccess(200, result, 'Get popup successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get popup failed');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePopupDto: UpdatePopupDto) {
    try {
      const result = this.popupService.update(id, updatePopupDto);
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
    return this.popupService.remove(+id);
  }
}
