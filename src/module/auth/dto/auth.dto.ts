import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class AuthDTO {
  @Exclude()
  _id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @Exclude()
  refreshToken: string;
}
