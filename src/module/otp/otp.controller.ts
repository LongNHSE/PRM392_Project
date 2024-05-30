import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }

  @Post()
  async sendOTP(@Body() body: { email: string }) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const createDTO: CreateOtpDto = {
      mail: body.email,
      OTP: otp,
      expireAt: new Date(Date.now() + 300000),
    };
    const checkUser = await this.userService.checkExistedEmail(body.email);
    if (checkUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const isSended = await this.mailService.sendUserOTP(createDTO.mail, otp);
    const isCreated = await this.otpService.create(createDTO);
    if (isSended && isCreated) {
      return {
        statusCode: 200,
        message: 'OTP sent successfully',
      };
    } else {
      throw new HttpException(
        'OTP sending failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
