import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  paymentId: string;
}
