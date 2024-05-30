import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsDateString } from 'class-validator';

export class AuthDTO {
  @Exclude()
  _id: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  password: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  avatar: string;

  status: string;

  phone: string;

  role: string;

  @Exclude()
  refreshToken: string;
}
