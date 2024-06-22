import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsNumber()
  averageRating: number;

  @IsOptional()
  @IsNumber()
  numRating: number;
}
