import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dob: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  gender: string;

  @IsString()
  avatar: string;
}
