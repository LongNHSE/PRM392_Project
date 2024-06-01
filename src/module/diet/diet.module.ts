import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diet, DietSchema } from './schema/diet.schema';

@Module({
  controllers: [DietController],
  imports: [
    MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
  ],
  providers: [DietService],
})
export class DietModule {}
