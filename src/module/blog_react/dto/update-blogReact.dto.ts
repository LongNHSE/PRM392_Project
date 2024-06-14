import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogReactDto } from './create-blogReact.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBlogReactDto extends PartialType(CreateBlogReactDto) {
  @IsOptional()
  @IsString()
  userID: string;

  @IsOptional()
  @IsString()
  blogID: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment: string;
}
