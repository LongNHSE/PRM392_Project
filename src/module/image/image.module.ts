import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/firebase.service';
import { ImageService } from './image.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [FirebaseModule],
  controllers: [],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
