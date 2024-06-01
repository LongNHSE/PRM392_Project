import { Injectable } from '@nestjs/common';
import { CreateDietDto } from './dto/create-diet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Diet } from './schema/diet.schema';
import { Model } from 'mongoose';

@Injectable()
export class DietService {
  constructor(@InjectModel(Diet.name) private dietModel: Model<Diet>) {}
  findAll() {
    return this.dietModel.aggregate([
      {
        $lookup: {
          from: 'activitylevels',
          localField: 'activityLevelId',
          foreignField: '_id',
          as: 'activity_levels',
        },
      },
      {
        $lookup: {
          from: 'goals',
          localField: 'goalId',
          foreignField: '_id',
          as: 'goals',
        },
      },
    ]);
  }
  create(createDietDto: CreateDietDto, userId: string) {
    try {
      createDietDto.userId = userId;
      return this.dietModel.create(createDietDto);
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: string) {
    return this.dietModel.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'activitylevels',
          localField: 'activityLevelId',
          foreignField: '_id',
          as: 'activity_levels',
        },
      },
      {
        $lookup: {
          from: 'goals',
          localField: 'goalId',
          foreignField: '_id',
          as: 'goals',
        },
      },
    ]);
  }

  update(id: string, updateDietDto: CreateDietDto) {
    return this.dietModel.findByIdAndUpdate(id, updateDietDto, { new: true });
  }

  remove(id: string) {
    return this.dietModel.findByIdAndUpdate(id, { isActive: false });
  }

  findMyDiet(userId: string) {
    return this.dietModel.aggregate([
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: 'activitylevels',
          localField: 'activityLevelId',
          foreignField: '_id',
          as: 'activity_levels',
        },
      },
      {
        $lookup: {
          from: 'goals',
          localField: 'goalId',
          foreignField: '_id',
          as: 'goals',
        },
      },
    ]);
  }
}
