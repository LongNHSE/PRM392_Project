import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsString()
  method: string;

  @IsOptional()
  @IsString()
  description: string;
}
