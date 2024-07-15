import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  date: string | Date;

  @IsNotEmpty()
  @IsString()
  status: string;
}
