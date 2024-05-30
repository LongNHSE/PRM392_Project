import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OTPDocument = OTP & Document;

@Schema({ timestamps: true })
export class OTP {
  @Prop()
  mail: string;

  @Prop()
  OTP: string;

  @Prop()
  expireAt: Date;
}

export const otpSchema = SchemaFactory.createForClass(OTP);
