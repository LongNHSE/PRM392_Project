import { Controller } from '@nestjs/common';
import { ActivityLevelService } from './activity_level.service';

@Controller('activity-level')
export class ActivityLevelController {
  constructor(private readonly activityLevelService: ActivityLevelService) {}
}
