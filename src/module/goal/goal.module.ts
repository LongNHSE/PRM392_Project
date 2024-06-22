import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from './schema/goal.schema';
import { IsGoalExistsConstraint } from './validator/is-goal-exist';

@Module({
  controllers: [GoalController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Goal.name,
        schema: GoalSchema,
      },
    ]),
  ],
  providers: [GoalService, IsGoalExistsConstraint],
})
export class GoalModule {}
