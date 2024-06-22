import { Injectable } from '@nestjs/common';
import { CreateBlogReactDto } from './dto/create-blogReact.dto';
import { UpdateBlogReactDto } from './dto/update-blogReact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogReact } from './schema/blogReact.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogReactService {
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(BlogReact.name)
    private readonly blogReactModel: Model<BlogReact>,
  ) {}
  async create(createBlogReactDto: CreateBlogReactDto) {
    try {
      const result = await this.blogReactModel.create(createBlogReactDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.blogReactModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.blogReactModel.findById(id);
  }

  async update(id: string, updateBlogReactDto: UpdateBlogReactDto) {
    return await this.blogReactModel.findByIdAndUpdate(id, updateBlogReactDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id}`;
  }
}
