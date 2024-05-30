import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePopupDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  theme: string;
}
