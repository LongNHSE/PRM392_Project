import { Module } from '@nestjs/common';
import { BlackListTokenController } from './black-list-token.controller';
import { BlackListTokenService } from './black-list-token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { blackListTokenSchema } from './schema/black-list-token.schema';

@Module({
  controllers: [BlackListTokenController],
  imports: [
    MongooseModule.forFeature([
      { name: 'BlackListToken', schema: blackListTokenSchema },
    ]),
  ],
  providers: [BlackListTokenService],
  exports: [BlackListTokenService],
})
export class BlackListTokenModule {}
