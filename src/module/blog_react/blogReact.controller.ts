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
import { BlogReactService } from './blogReact.service';
import { CreateBlogReactDto } from './dto/create-blogReact.dto';
import { UpdateBlogReactDto } from './dto/update-blogReact.dto';
import { apiFailed, apiSuccess } from 'src/common/api-response';

@Controller('blog_react')
export class BlogReactController {
  constructor(private readonly blogReactService: BlogReactService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createBlogReactDto: CreateBlogReactDto) {
    try {
      const result = await this.blogReactService.create(createBlogReactDto);
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
      const result = await this.blogReactService.findAll();
      return apiSuccess(200, result, 'Get all blog successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get all blog failed');
    }
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    try {
      const result = await this.blogReactService.findOne(_id);
      return apiSuccess(200, result, 'Get blog successfully');
    } catch (error) {
      return apiFailed(400, {}, 'Get blog failed');
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogReactDto: UpdateBlogReactDto,
  ) {
    try {
      const result = this.blogReactService.update(id, updateBlogReactDto);
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
    return this.blogReactService.remove(+id);
  }
}
