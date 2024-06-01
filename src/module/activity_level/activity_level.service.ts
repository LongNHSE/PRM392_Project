import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityLevel } from './schema/activity_level.schema';
import { Model } from 'mongoose';
import { CreateActivityLevelDto } from './dto/create-activity-level.dto';

@Injectable()
export class ActivityLevelService {
  findAll() {
    return this.activityModel.find();
  }
  constructor(
    @InjectModel(ActivityLevel.name)
    private readonly activityModel: Model<ActivityLevel>,
  ) {}
  create(createActivityLevelDto: CreateActivityLevelDto) {
    return this.activityModel.create(createActivityLevelDto);
  }

  findOne(id: string) {
    return this.activityModel.findById(id);
  }

  update(id: string, updateActivityLevelDto: CreateActivityLevelDto) {
    return this.activityModel.findByIdAndUpdate(id, updateActivityLevelDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.activityModel.findByIdAndUpdate(id, { isActive: false });
  }
}
