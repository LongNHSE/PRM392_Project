import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    try {
      const result = await this.blogModel.create(createBlogDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.blogModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.blogModel.findById(id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    return await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id}`;
  }
}
