import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Blog } from 'src/module/blog/schema/blog.schema';
import { User } from 'src/module/user/schema/user.schema';

@Schema()
export class BlogReact {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Blog.name })
  blogId: Blog;

  @Prop({ min: 1, max: 5 })
  rating: number;

  @Prop()
  comment: string;
}

export const BlogReactSchema = SchemaFactory.createForClass(BlogReact);
