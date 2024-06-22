import { Module } from '@nestjs/common';
import { BlogReactService } from './blogReact.service';
import { BlogReactController } from './blogReact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogReact, BlogReactSchema } from './schema/blogReact.schema';

@Module({
  controllers: [BlogReactController],
  imports: [
    MongooseModule.forFeature([
      { name: BlogReact.name, schema: BlogReactSchema },
    ]),
  ],
  providers: [BlogReactService],
  exports: [BlogReactService],
})
export class BlogReactModule {}
