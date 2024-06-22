import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { ImageModule } from '../image/image.module';
import { JwtModule } from '@nestjs/jwt';
import { OTP, otpSchema } from '../otp/schema/otp.schema';
import { IsUserExistsConstraint } from './validator/is-user-exists.validator';
import { ImageService } from '../image/image.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [UserController],
  imports: [
    FirebaseModule,
    ImageModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: OTP.name, schema: otpSchema }]),
    JwtModule.register({}),
  ],
  providers: [UserService, IsUserExistsConstraint, ImageService],
  exports: [UserService],
})
export class UserModule {}
