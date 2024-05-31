import { Controller } from '@nestjs/common';
import { GoalService } from './goal.service';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}
}
