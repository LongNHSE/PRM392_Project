import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Diet, DietSchema } from './schema/diet.schema';
import { IsDietExistsConstraint } from './validator/is-diet-exist';

@Module({
  controllers: [DietController],
  imports: [
    MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
  ],
  providers: [DietService, IsDietExistsConstraint],
})
export class DietModule {}
