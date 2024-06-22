import { Module } from '@nestjs/common';
import { BmiService } from './bmi.service';
import { BmiController } from './bmi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bmi, BmiSchema } from './schema/bmi.schema';

@Module({
  controllers: [BmiController],
  imports: [MongooseModule.forFeature([{ name: Bmi.name, schema: BmiSchema }])],
  providers: [BmiService],
  exports: [BmiService],
})
export class BmiModule {}
