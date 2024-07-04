import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class AuthDTO {
  @Exclude()
  _id: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Username', example: 'john_doe' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'password123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Gender', example: 'male' })
  gender: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Avatar URL',
    example: 'http://example.com/avatar.jpg',
  })
  avatar: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Phone number',
    example: '+1234567890',
  })
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Date of birth',
    example: '1990-01-01',
  })
  dob: Date;

  @Exclude()
  refreshToken: string;
}
