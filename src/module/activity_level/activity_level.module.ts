import { Module } from '@nestjs/common';
import { ActivityLevelService } from './activity_level.service';
import { ActivityLevelController } from './activity_level.controller';

@Module({
  controllers: [ActivityLevelController],
  providers: [ActivityLevelService],
})
export class ActivityLevelModule {}
