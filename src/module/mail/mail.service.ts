import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOTP(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'Kohi-Neko <kohineko@gmail.com>',
        subject: 'OTP for your account',
        template: './OTP',
        context: {
          otp,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
