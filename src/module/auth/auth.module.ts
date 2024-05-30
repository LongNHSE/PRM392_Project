import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../user/schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
// import { MailModule } from '../mail/mail.module';
import { OTP, otpSchema } from '../otp/schema/otp.schema';
import { UserModule } from '../user/user.module';
import { OtpModule } from '../otp/otp.module';
// import { BlackListTokenModule } from '../black-list-token/black-list-token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [
    ConfigModule,
    // MailModule,
    UserModule,
    // BlackListTokenModule,
    OtpModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: OTP.name, schema: otpSchema }]),
  ],
})
export class AuthModule {}
