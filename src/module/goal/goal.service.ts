import { HttpException, Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create_goal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Goal } from './schema/goal.schema';
import { Model } from 'mongoose';

@Injectable()
export class GoalService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<Goal>) {}
  findOne(id: string) {
    throw new Error('Method not implemented.');
    return this.goalModel.findById(id);
  }
  findAll() {
    return this.goalModel.find();
  }
  create(createGoalDto: CreateGoalDto) {
    return this.goalModel.create(createGoalDto);
  }

  update(id: string, updateGoalDto: CreateGoalDto) {
    return this.goalModel.findByIdAndUpdate(id, updateGoalDto, { new: true });
  }

  remove(id: string) {
    return this.goalModel.findByIdAndUpdate(id, { isActive: false });
  }
}
