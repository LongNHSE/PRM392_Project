import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBillDto extends PartialType(CreateBillDto) {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  paymentId: string;
}
