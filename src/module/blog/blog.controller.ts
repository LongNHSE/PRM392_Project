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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      const result = await this.blogService.create(createBlogDto);
      console.log(result);
      if (result) {
        return apiSuccess(201, result, 'Created blog succesfully');
      } else {
        return apiFailed(400, null, 'Created blog failed');
      }
    } catch (error) {
      console.log(error);
      // return error;
      return apiFailed(
        400,
        null,
        error?.message ? error.message : 'Created blog failed',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.blogService.findAll();
      return apiSuccess(200, result, 'Get all blog successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all blog failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.blogService.findOne(_id);
      return apiSuccess(200, result, 'Get blog successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get blog failed');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      const result = this.blogService.update(id, updateBlogDto);
      if (result) {
        return apiSuccess(200, result, 'Updated blog successfully');
      } else {
        return apiFailed(400, null, 'Updated blog failed');
      }
    } catch (error) {
      return apiFailed(400, null, 'Updated blog failed');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
