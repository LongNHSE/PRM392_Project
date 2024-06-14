import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  @IsNumber()
  averageRating: number;

  @IsNotEmpty()
  @IsNumber()
  numRating: number;

  @IsString()
  @ArrayNotEmpty()
  ingredient: string[];

  @IsNotEmpty()
  @ArrayNotEmpty()
  direction: string[];

  @ArrayNotEmpty()
  @IsString()
  imageList: string[];
}
