import { Module } from '@nestjs/common';
import { PopupService } from './popup.service';
import { PopupController } from './popup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Popup, PopupSchema } from './schema/popup.schema';

@Module({
  controllers: [PopupController],
  imports: [
    MongooseModule.forFeature([{ name: Popup.name, schema: PopupSchema }]),
  ],
  providers: [PopupService],
  exports: [PopupService],
})
export class PopupModule {}
