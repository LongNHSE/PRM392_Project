import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from './schema/day.schema';
import { IsDayExistsConstraint } from './validator/is-day-exist';
import {
  Preference,
  PreferenceSchema,
} from '../preference/schema/preference.schema';

@Module({
  controllers: [DayController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Day.name,
        schema: DaySchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Preference.name,
        schema: PreferenceSchema,
      },
    ]),
  ],
  providers: [DayService, IsDayExistsConstraint],
  exports: [DayService],
})
export class DayModule {}
