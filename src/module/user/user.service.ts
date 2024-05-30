import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { OTP } from '../otp/schema/otp.schema';
import { Model, ObjectId } from 'mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(OTP.name) private otpModel: Model<OTP>,
    private readonly jwtService: JwtService
  ) {}

  updateImage(id: string, urlResult: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { avatar: urlResult },
      {
        new: true,
      },
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  checkExistedEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }

  async findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async getProfileDetailByToken(jwt: string) {
    const token = jwt.replace('Bearer ', '');
    const decodedToken = await this.jwtService.decode(token);
    const account = await this.findById(decodedToken?.userId);

    return account;
  }

  async updateUserPassword(updatePasswordDto: UpdatePasswordDto, jwt: string) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const token = jwt.replace('Bearer ', '');
    const decodedToken = await this.jwtService.decode(token);
    const account = await this.findById(decodedToken?.userId);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const match = await bcrypt.compareSync(oldPassword, account.password);
    if (!match) {
      throw new HttpException('Password is not correct', 400);
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await this.userModel.findByIdAndUpdate(account._id, { password: hash });
  }

  async resetUserPassword(resetUserPassword: ResetPasswordDto) {
    const { email: mail, newPassword, otp: OTP } = resetUserPassword;
    const receivedOtp = await this.otpModel.findOne({ mail, OTP });

    if (!receivedOtp || receivedOtp.OTP !== OTP) {
      throw new HttpException('Invalid OTP', 400);
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await this.userModel.findOneAndUpdate({ email: mail }, { password: hash });
  }
}
