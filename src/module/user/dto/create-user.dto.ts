import { IsDateString, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  username: string;

  @IsString()
  gender: string;

  @IsString()
  phone: string;
}
