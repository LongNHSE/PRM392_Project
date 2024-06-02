import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Day, DaySchema } from './schema/day.schema';
import { IsDayExistsConstraint } from './validator/is-day-exist';

@Module({
  controllers: [DayController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Day.name,
        schema: DaySchema,
      },
    ]),
  ],
  providers: [DayService, IsDayExistsConstraint],
})
export class DayModule {}
