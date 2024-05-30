import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlackListToken } from './schema/black-list-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlackListTokenService {
  constructor(
    @InjectModel(BlackListToken.name)
    private blackListTokenModel: Model<BlackListToken>,
  ) {}

  createBlackListToken = (token: string) => {
    return this.blackListTokenModel.create({ token: token });
  };

  isTokenBlacklisted = async (token: string) => {
    const blackListToken = await this.blackListTokenModel.findOne({
      token: token,
    });
    return blackListToken ? true : false;
  };
}
