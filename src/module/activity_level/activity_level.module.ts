import { Module } from '@nestjs/common';
import { ActivityLevelService } from './activity_level.service';
import { ActivityLevelController } from './activity_level.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ActivityLevel,
  ActivityLevelSchema,
} from './schema/activity_level.schema';
import { IsActivityLevelExistsContstraint } from './validator/is-activity-existed';

@Module({
  controllers: [ActivityLevelController],
  imports: [
    MongooseModule.forFeature([
      { name: ActivityLevel.name, schema: ActivityLevelSchema },
    ]),
  ],
  exports: [],
  providers: [ActivityLevelService, IsActivityLevelExistsContstraint],
})
export class ActivityLevelModule {}
