import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePopupDetailDto {
  @IsNotEmpty()
  @IsString()
  popupId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  theme: string;
}
