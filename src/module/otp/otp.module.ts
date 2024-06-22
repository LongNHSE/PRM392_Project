import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, otpSchema } from './schema/otp.schema';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [OtpController],
  providers: [OtpService],
  imports: [
    UserModule,
    MailModule,
    MongooseModule.forFeature([{ name: OTP.name, schema: otpSchema }]),
  ],
  exports: [OtpService],
})
export class OtpModule {}
