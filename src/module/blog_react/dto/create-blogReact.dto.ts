import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogReactDto {
  @IsNotEmpty()
  @IsString()
  userID: string;

  @IsNotEmpty()
  @IsString()
  blogID: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
